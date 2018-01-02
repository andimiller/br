var ODD_EVEN     = [ "Odd", "Even" ];
var TEAM_COLORS  = [ "Blue", "Red", "Green", "Purple", "Yellow", "Orange" ];
var TEAM_COLORS_LOWER_CASE  = [ "blue", "red", "green", "purple", "yellow", "orange" ];

var SHARELINK_TOKEN = ',';
var SOLAR_SYSTEM_INDEX_OFFSET = 30000000;

var TEAM_ENCODING = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$";

var gSpinner;

var TEAM_BLUE    = 0;
var TEAM_RED     = 1;
var TEAM_YELLOW  = 2;
var TEAM_GREEN   = 3;
var TEAM_ORANGE  = 4;
var TEAM_PURPLE  = 5;

var MAX_TEAMS = 4;
var STARTING_TEAM_TAB = 100;

var DEBUG_SHIP = "XXX";
var DEBUG_PLAYER = "XXX";

var COOKIE_THEME = 'newtheme';
var COOKIE_BLUETEAMS = 'blueTeams';
var COOKIE_BLUETEAMS_TOKEN = '|';
var DAYS_PER_YEAR = 365;
var MS_PER_MINUTE = 1000 * 60;
var MS_PER_SECOND = 1000;
var EVE_EPOCH = Date.UTC( 2003, 0, 1 );

var gValidateFlag = false;
//var gIgnoreInsig = true;
var gSolarSystems = [];
var gJumpData = [];
var gData = {};
var gDataCount = 0;
var gTabs = [];
var gShipTypes =  initShipTypes( );
var gCoalitionData = initCoalitions( );
var gCoalitionNames = _.sortBy( _.uniq( _.pluck( gCoalitionData, 'shortName' )), function( X ) { return X; } );
var gFactionData = initFactions( );
var gGroups = [];
var gPlayers = [];
var gTeams = [];
var gSelectedGroup = [];
var gKillCount = 0;
var gProcessingTime = new Date;
var gSummaryIskLost = 0;
var gSummaryShips = 0;
var gSummaryPods = 0;
var gTotalDamage = 0;
var gBlueTeams = [];
var gTheme;
var gActiveChart = 'kill';
var gActiveChartType = 'column';
var gCurrentTeams = [];
var gDataSets = [];

var gLoadUrl = false;
var gLoadTeams = [];
var gEntryWindowData = [];
var gTasks = 0;
var gWaitCursor = 0;

var gAnimationGroup = 'Class';
var gAnimationOffset = 0;
var gAnimationPlaying = false;
var gAnimationWidth = 10;
var gAnimationSpeed = 1;
var gShowKillsOnly = false;
var gAnimationLabel = true;
var flagInvolvedRefresh = true;
var gAnimationSort = false;
var gAnimationScale = true;
var gOptGotoReplay = false;
var gAnimationChartData = [];
var gAnimationChartLabel = [];
var gLastHighlight = [];
var gLastHighlightAggro = [];
var gLastHighlightShip = [];

var gMaxDateTime = 0;
var gMinDateTime = 0;



$(document).ready( on_page_ready );

function readCookies( )
{
  var blueTeams = $.cookie( COOKIE_BLUETEAMS );
  if ( blueTeams != undefined )
  {
    gBlueTeams = blueTeams.split( COOKIE_BLUETEAMS_TOKEN );
  }
  gTheme = $.cookie( COOKIE_THEME );
  console.log( 'readCookies: newtheme=' + gTheme );
}

function writeCookies( )
{
  console.log( gBlueTeams.join( COOKIE_BLUETEAMS_TOKEN ));
  if ( gLoadTeams.length == 0 )
    $.cookie( COOKIE_BLUETEAMS, gBlueTeams.join( COOKIE_BLUETEAMS_TOKEN ), { expires: DAYS_PER_YEAR, path: '/' } );
  if ( gTheme != undefined )
    $.cookie( COOKIE_THEME, gTheme, { expires: DAYS_PER_YEAR, path: '/' } );
}

function on_page_ready( )
{
  readCookies( );

  if ( gTheme != undefined )
  {
    console.log( 'on_page_ready: setting theme to ' + gTheme );
    $( '#ux-themeDropdown' ).val( gTheme );
    changeTheme( );
  }
  else
  {
    $( '#ux-themeDropdown' ).val( 'custom' );
  }
  get_solarsystemIDs();
  
  //$( document ).tooltip( { track: true } );

  processUrlParameters( );

  if ( gEntryWindowData.length == 0 )
  {
    var now = new Date( );
    var entryWindow = new Object;
    entryWindow.endTime   = now.getTime( );
    entryWindow.startTime = entryWindow.endTime - 90 * MS_PER_MINUTE;
    gEntryWindowData.push( entryWindow );
  }

  generateEntryUIFromData( );
  
  $( '#tabs' ).tabs( { heightStyle: 'fill' } );
  var helpTxt =  '<div id="ux-helpInfo" class="ux-helpContent">';
  helpTxt +='<b>Battle Report Generator</b>';
  helpTxt +='<br>version {{VERSION}}';
  helpTxt +='<br>This version was updated to use ESI by Lucia Denniard, with performance fixes from robbilie.';
  helpTxt +='<br><br>Please file bugs here <a href="https://github.com/andimiller/br/issues">https://github.com/andimiller/br/issues</a>, or bother me on discord/slack, see original release notes below.';
  helpTxt +='<br>';
  helpTxt +='<br>version 0.1.306 - 17th December 2016';
  helpTxt +='<br>';
  helpTxt +='<br>If you are having issues with this tool not loading, please clear cookies or use incognito mode';
  helpTxt +='<br>';
  helpTxt +='<br>This tool is for generating battle reports from killmails held on zKillboard.com.';
  helpTxt +='<br>';
  helpTxt +='<br><b>How to use:</b>';
  helpTxt +='<br>';
  helpTxt +='<br><b>Step 1</b>';
  helpTxt +='<br>First, get some data to analyze.';
  helpTxt +='<br>If you clicked a link to an already created battle report, you can skip to step 3';
  helpTxt +='<br>';
  helpTxt +='<br>Method A';
  helpTxt +='<br>Type a system name into the System/Link box, it can autocomplete, showing the Region names for info. ';
  helpTxt +='<br>Specify a start and end to the battle. All times are Eve time (GMT).';
  helpTxt +=' If additional systems or timespans are needed, click the plus button to add another System/Link box';
  helpTxt +='<br>Click the analyze button to begin the data transfer from zKill to your battle report.';
  helpTxt +='<br>';
  helpTxt +='<br>Method B';
  helpTxt +='<br>Copy a battle report url from evekill.net, and paste it into the System/Link box.';
  helpTxt +=' This is ideally a related kill link, but individual killmail links will work too.';
  helpTxt +='<br>Click the analyze button to begin the data transfer from zKill to your battle report.';
  helpTxt +=' The battle location and time will be read from the evekill link and used to fill in the system and time values.';
  helpTxt +=' Data transfer from zKill will begin automatically.';
  helpTxt +='<br>';
  helpTxt +='<br><b>Step 2</b>';
  helpTxt +='<br>Once the data is loaded, you can assign the teams.';
  helpTxt +='<br>Click the colored buttons to assign a corp or alliance to a team. Up to 4 teams can be created.';
  helpTxt +=' Alternatively you can add groups of players according to coalition or faction warfare affiliation.';
  helpTxt +=' Note: the coalition list is manually updated. Errors/Additions can be fixed/added by contacting me.';
  helpTxt +=' Use the assign coalition dropdown on the team you want those members assigned, and they will all move to that team';
  helpTxt +='<br>At any point you can use the various views to help you figure out who was shooting who.';
  helpTxt +='<br>';
  helpTxt +='<br><b>Step 3</b> ';
  helpTxt +='<br>Check out the battle, there are a number of different ways to check out the data.';
  helpTxt +='<br><b>Involved:</b> Shows a list of the involved ships, destroyed ships are highlighted';
  helpTxt +='<br><b>Class Summary:</b> Shows a summary of the classes of ship used, lost and the isk losses';
  helpTxt +='<br><b>Ship Summary:</b> Shows a summary of the types of ship used, lost and the isk losses';
  helpTxt +='<br><b>Timeline:</b> Shows a list of the kills for each team, in matched time increments';
  helpTxt +='<br><b>Replay:</b> (New) Use the time slider, or play controls and click on the ship icons for kill info and highlighting';
  helpTxt +='<br><b>Team Kill Lists:</b> A standard list of kills for each team.';
  helpTxt +='<br><b>Chart:</b> Various charts including isk losses over time.';
  helpTxt +='<br><b>Kill List:</b> A standard list of every kill.';
  helpTxt +='<br><b>Options:</b> Set options here. Currently you can disable the anti clutter ignore insignifigant groups option. NPSI requested.';
  helpTxt +='<br><b>Help & Info:</b> This page';
  helpTxt +='<br>';
  helpTxt +='<br><b>Step 4</b> ';
  helpTxt +='<br>Share the battle you have fixed, copy the contents of the Share Link box.';
  helpTxt +='<br>The url generated will automatically rebuild the BR with the teams you set.';
  helpTxt +=' It will also store the replay state, so you can share a specific time in the battle, or a replay layout';
  helpTxt +='<br>';
  helpTxt +='<br>';
  helpTxt +='<br>';
  helpTxt +='<br>For info and suggestions evemail SmallFatCat or join "BRcat support" in game';
  helpTxt +='<br>Developed using the zKillboard API, Eve API and the help and code of Pink Fuzz';
  helpTxt +='<br>Coalition data from <a href="http://rischwa.net/coalitions/">http://rischwa.net/coalitions/</a> (21st August 2015)';
  helpTxt +='<br>All CCP assets and Eve assets remain property of CCP Games.';
  helpTxt +='<br>Donate isk to SmallFatCat to support continued development';
  helpTxt +='<br>';
  helpTxt +='<br>';
  helpTxt +='<br>Powered by: <a href="https://zkillboard.com/">zKillboard</a>, <a href="http://eve-kill.net/?a=home">eve-kill.net</a>, <a href="https://www.eveonline.com">CCP\'s Eve  Online API</a>. Hosted by Ever Flow [EVF], a no drama eve corporation, check us out in game';
  helpTxt += '</div>';
  
  addTab( 990, 'Options',        'options',           function( ) { generateOptionsTab( '#options' ); } );
  addTab( 999, 'Help & Info',    'infoTable',         function( ) { $('#infoTable').html( helpTxt ); } );
  $( '#tabs' ).tabs( { active: 1 } );
  // load if we had enough arguments in the URL to cause loading
  if (gLoadUrl)
  {
    setTimeout( function( ) { startParsing( ); }, 200 );
  }
  $( window ).resize(function() {
    refresh();
  });
  window.onpopstate = function(e) {
    processUrlParameters();
    if (gLoadUrl)
    {
      setTimeout( function( ) { startParsing( ); refresh(); }, 200 );
    }
  };
}

function generateEntryUIFromData( )
{
  var html = [];
  html.push( '<table class="ux-entry">' );
  for( var index = 0; index < gEntryWindowData.length; ++index )
  {
    html.push( createEntryTableRow( index ));
  }
  html.push( '</table>' );
  $( '#ux-entryWindow' ).empty( );
  $( '#ux-entryWindow' ).append( html.join( '' ));
  updateEntryUIFromData( );
}

function updateEntryUIFromData( )
{
  _.each( gEntryWindowData, function( entryWindow, index )
  {
    uiSetDateTime( entryWindow.startTime, '#start', index );
    uiSetDateTime( entryWindow.endTime,   '#end', index );

    $( "#system" + index ).autocomplete( { source: function( request, response )
      {
        if ( request.term.length > 1 )
        {
          response( _.filter( gSolarSystemNames, function( element ) { return element.value.toUpperCase( ).indexOf( request.term.toUpperCase( )) == 0; } ));
        }
        else
        {
          response( [] );
        }
      }
    } );
    $( '#system' + index ).val( entryWindow.system );
    $( '#startdate' + index ).datepicker( );
    $( '#enddate' + index ).datepicker( );
//    $( 'input.ux-entryDate' ).change( function( event ) { validateEntryDates( event, index ); } );
    $( '#startdate' + index ).change( function( event )  { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
    $( '#starttimeH' + index ).change( function( event ) { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
    $( '#starttimeM' + index ).change( function( event ) { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
    $( '#enddate' + index ).change( function( event )    { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
    $( '#endtimeH' + index ).change( function( event )   { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
    $( '#endtimeM' + index ).change( function( event )   { updateEntryDataFromUI( ); validateEntryDates( event, index ); } );
  } );
}

function updateEntryDataFromUI( )
{
  console.log( 'updateEntryDataFromUI' );
  _.each( gEntryWindowData, function( entryWindow, index )
  {
    pad_field( '#endtimeH'   + index, 2, '0' );
    pad_field( '#endtimeM'   + index, 2, '0' );
    pad_field( '#starttimeH' + index, 2, '0' );
    pad_field( '#starttimeM' + index, 2, '0' );
    
    entryWindow.system    = $( '#system' + index ).val( );
    entryWindow.startTime = uiGetDateTime( '#start', index );
    entryWindow.endTime   = uiGetDateTime( '#end', index );
  } );
}

function processUrlParameters( )
{
  var gUrlParams = parse_url_params( window.location.href );
  gEntryWindowData = [];

  gLoadUrl = ('s' in gUrlParams) && ('b' in gUrlParams) && ('e' in gUrlParams);

  if ( gUrlParams[ 's' ] != undefined )
  {
    console.log("s wasn't undefined");
    var params = 0;

    var systemParams = gUrlParams[ 's' ].split( SHARELINK_TOKEN );
    var startParams  = gUrlParams[ 'b' ].split( SHARELINK_TOKEN );
    var endParams    = gUrlParams[ 'e' ].split( SHARELINK_TOKEN );


    _.each( systemParams, function( system, index )
    {
      // we know we've got stuff to load
      // convert real systemids down to this format
      if (system > 10000000) {
        system = system - 30000000;
      }
      var entryWindow = new Object;
      var end   = endParams[ Math.min( endParams.length - 1, index ) ];
      var start = startParams[ Math.min( startParams.length - 1, index ) ];

      // load weird EVE epochs, or normal unixtimes
      if (start < 10000000) {
        entryWindow.startTime = parseInt(start) * MS_PER_MINUTE + EVE_EPOCH;
      } else {
        entryWindow.startTime = parseInt(start) * MS_PER_SECOND;
      }
      entryWindow.endTime = parseInt( end ) * MS_PER_MINUTE + entryWindow.startTime;
      entryWindow.system = solarSystemIDtoName( parseInt( system ) + SOLAR_SYSTEM_INDEX_OFFSET );
      gEntryWindowData.push( entryWindow );
    } );
  }
  else
  {
    // old style of parameter ( s0, b0, e0, s1, ... )
    for( var index = 0; ; ++index )
    {
      var params = 0;
      var entryWindow = new Object;

      var systemParam = gUrlParams[ 's' + index ];
      var startParam  = gUrlParams[ 'b' + index ];
      var endParam    = gUrlParams[ 'e' + index ];

      if ( systemParam != undefined )
      {
        entryWindow.system = systemParam;
        ++params;
      }

      // set default times for our entry window
      var now = new Date( );
      entryWindow.endTime   = now.getTime( ) * MS_PER_MINUTE;
      entryWindow.startTime = entryWindow.endTime - 90 * MS_PER_MINUTE;

      if ( startParam != undefined )
      {
        entryWindow.startTime = parseInt( startParam ) * MS_PER_MINUTE + EVE_EPOCH;
        ++params;
        if ( endParam != undefined)
        {
          entryWindow.endTime = parseInt( endParam ) * MS_PER_MINUTE + entryWindow.startTime;
          ++params;
        }
      }

      if ( params == 0 )
      {
        break;
      }
      gEntryWindowData.push( entryWindow );
    }
  }
  var teamParam   = gUrlParams[ 't' ];
  if ( teamParam != undefined )
  {
    for( var i = 0; i < teamParam.length; ++i )
    {
      var value = TEAM_ENCODING.indexOf( teamParam[ i ] );
      gLoadTeams.push( value & 3 );
      gLoadTeams.push(( value >> 2 ) & 3 );
      gLoadTeams.push( value >> 4 );
    }
  }
  var optionParam = gUrlParams[ 'o' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gOptIgnoreInsig = false;
    }
  }
  var optionParam = gUrlParams[ 'r' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gOptGotoReplay = true;
    }
  }
  var optionParam = gUrlParams[ 'rs' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gAnimationScale = false;
    }
  }
  var optionParam = gUrlParams[ 'ro' ];
  if ( optionParam != undefined )
  {
    if(optionParam > 0){
      gAnimationOffset = Number(optionParam);
    }
  }
  
  var optionParam = gUrlParams[ 'rt' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gAnimationSort = true;
    }
  }
  
  var optionParam = gUrlParams[ 'rd' ];
  if ( optionParam != undefined )
  {
    if(optionParam > 0){
      gAnimationSpeed = Number(optionParam);
    }
  }
  
  var optionParam = gUrlParams[ 'rk' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gShowKillsOnly = true;
    }
  }
  
  var optionParam = gUrlParams[ 'rl' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gAnimationLabel = false;
    }
  }
  
  var optionParam = gUrlParams[ 'rg' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gAnimationGroup = 'Type';
    }
  }
  
  var optionParam = gUrlParams[ 'rn' ];
  if ( optionParam != undefined )
  {
    if(optionParam == 1){
      gAnimationGroup = 'None';
    }
  }
}

function createEntryTableButton( text, callback, tooltip )
{
  return '<span class="ux-button Gray" title="' + tooltip + '" onclick="' + callback + '">' + text + '</span>';
}

function createDateInput( id )
{
  return '<input type="text" maxlength="12" class="ui-state-default ux-entryDate" onkeypress="keyPressed( event );" id="' + id + '"/>';
}

function createTimeInput( id, max, text )
{
  return '<input type="number" size="2" maxlength="2" min="0" max="' + max + '" class="ui-state-default ux-entryTime" onkeypress="keyPressed( event );" id="' + id + '">' + text + '</input>';
}

function createEntryTableRow( index )
{
  var html = [];
  html.push( TableData( 'ux-shrink', '<label for="system' + index + '">System/Link: </label>' ));
  html.push( TableData( 'ux-expand', '<input id="system'  + index + '" class="ui-state-default ux-entrySystem" placeholder="Enter a solar system or paste an Eve-Kill link" onkeypress="keyPressed( event );"/>' ));
  html.push( TableData( 'ux-shrink', 'StartDate:' ));
  html.push( TableData( 'ux-shrink', createDateInput( 'startdate' + index )));
  html.push( TableData( 'ux-shrink', createTimeInput( 'starttimeH' + index, 23, 'H' )));
  html.push( TableData( 'ux-shrink', createTimeInput( 'starttimeM' + index, 59, 'M' )));
  html.push( TableData( 'ux-shrink', 'EndDate:' ));
  html.push( TableData( 'ux-shrink', createDateInput( 'enddate' + index )));
  html.push( TableData( 'ux-shrink', createTimeInput( 'endtimeH' + index, 23, 'H' )));
  html.push( TableData( 'ux-shrink', createTimeInput( 'endtimeM' + index, 59, 'M' )));
  html.push( TableData( 'ux-shrink', ( gEntryWindowData.length != 1 ? createEntryTableButton( '-', 'removeEntry( ' + index + ' )', 'Remove this entry' ) : '' )));
  html.push( TableData( 'ux-shrink', index == gEntryWindowData.length - 1 ? createEntryTableButton( '+', 'addEntry( )', 'Add system/timespan entry line' ) : '' ));
  html.push( TableData( 'ux-shrink', index == 0 ? createEntryTableButton( 'Analyze', 'load_data_click( )', 'Start processing' ) : '' ));
  return TableRow( '', html.join( '' ));
}

function keyPressed( event )
{
  if ( event == undefined && window.event ) event = window.event;
  if ( event.which == 13 || event.keyCode == 13 )
    load_data_click( );
}

function addEntry( )
{
  updateEntryDataFromUI( );
  var lastEntry = gEntryWindowData[ gEntryWindowData.length - 1 ];
  var entryWindow = new Object;
  entryWindow.system = '';
  entryWindow.startTime = lastEntry.startTime;
  entryWindow.endTime   = lastEntry.endTime;
  gEntryWindowData.push( entryWindow );
  generateEntryUIFromData( );
}

function removeEntry( index )
{
  updateEntryDataFromUI( );
  gEntryWindowData.splice( index, 1 );
  generateEntryUIFromData( );
  init( );
  refresh( );
}

function validateEntryDates( event, index )
{
  if ( !gValidateFlag )
  {
    gValidateFlag = true;
    
    var startTime = uiGetDateTime( '#start', index );
    var endTime   = uiGetDateTime( '#end', index );

    if ( endTime - startTime < 0 || endTime - startTime > 48 * 60 * MS_PER_MINUTE )
    {
      if ( event.target.id.indexOf( 'tart' ) > 0 )
      {
        endTime = startTime + ( 90 * MS_PER_MINUTE );
        uiSetDateTime( endTime, '#end', index );
      }
      else
      {
        startTime = endTime - 90 * MS_PER_MINUTE;
        uiSetDateTime( startTime, '#start', index );
      }
    }
    
    gValidateFlag = false;
  }
}
