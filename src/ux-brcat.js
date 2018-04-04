function init()
{
  gData = {};
  gDataCount = 0;
  gGroups = [];
  gPlayers = [];
  removeTeamTabs();
  gTeams = [];
  addTeamTabs();
  var gSelectedGroup = [];
  gKillCount = 0;
  gTasks = 0;
  
  gSummaryIskLost = 0;
  gSummaryShips = 0;
  gSummaryPods = 0;
  gTotalDamage = 0;
  $( '#ktl' ).empty( );
  $( '#stl-div' ).empty( );
  $( '#addBtn' ).empty( );
  $( '#summaryTable' ).empty( );
  $( '#summaryText' ).text( '' );
  $( "#tabs" ).tabs( refresh );
}

async function load_data_click( )
{
  // reset the teams specified on the load URL
  gLoadTeams = [];
  await startParsing( );
}

async function startParsing( )
{
  waitCursor( true );
  init( );

  var opts = {
    lines: 16, // The number of lines to draw
    length: 32, // The length of each line
    width: 5, // The line thickness
    radius: 5, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#FFFFFF', // #rgb or #rrggbb or array of colors
    speed: 0.5, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9 // The z-index (defaults to 2000000000)
  };
  setTimeout( function( )
  {
    var target = document.getElementById( 'ux-helpInfo' );
    gSpinner = new Spinner( opts ).spin( target );
  }, 500 );

  $( '#status' ).text( 'Fetching Data...');
  $( '#status' ).addClass( 'ui-state-default ui-state-error' );
      
  updateShareLink( );
  gProcessingTime = new Date( );

  const killmails = [].concat(...await Promise.all(gEntryWindowData.map(entryWindow => loadEntryWindowData(entryWindow))));

  const { characterIDs, corporationIDs, allianceIDs } = [].concat(...killmails.map(({ victim, attackers }) => [victim].concat(attackers))).reduce((p, { character_id, corporation_id, alliance_id }) => {
    if (character_id)
      p.characterIDs.add(character_id);
    if (corporation_id)
      p.corporationIDs.add(corporation_id);
    if (alliance_id)
      p.allianceIDs.add(alliance_id);
    return p;
  }, { characterIDs: new Set(), corporationIDs: new Set(), allianceIDs: new Set() });

  const useragent = "user_agent=br.inyour.space+%28Lucia+Denniard%29"

  const idToName = new Map([
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/characters/names/?"+useragent+"&character_ids=", Array.from(characterIDs), 100), "character_id", "character_name"), 
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/corporations/names/?"+useragent+"&corporation_ids=", Array.from(corporationIDs), 100), "corporation_id", "corporation_name"), 
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/alliances/names/?"+useragent+"&alliance_ids=", Array.from(allianceIDs), 100), "alliance_id", "alliance_name")
  ]);

  // if length != 0, we got some results back, go ahead and push those results into our global set
  for (var element of killmails) {
    if ( gData[ '' + element.killmail_id ] == undefined )
    {
      ++gDataCount;
      gData[ '' + element.killmail_id ] = element;
      parseKillRecord( element, idToName );
    }
  }

  gData = Object.values(gData);

  // if our number of tasks is 0 ( really shouldn't ever be negative ), then all the ajax requests
  // we have posted have finished, therefore we should go ahead and process the data we have collected
  // and present the user the team selection UI
  if ( --gTasks <= 0 )
  {
    $('#status').text( 'Compiling pilot statistics...' );
    // generate our final summary line
    generateSummary( 0, 0, 0, false, idToName );
    //gData = _.sortBy( gData, function( killRecord ) { return killRecord.killmail_time; } );
    //gData = killmails;

    var elapsed = ( new Date( )).getTime( ) - gProcessingTime.getTime( );
    console.log( 'processing time: ' + elapsed + ' ms' );

    build_data( idToName );
    $('#status').text( 'Ready for team selection.' );
    if ( gSpinner != undefined )
    {
      gSpinner.stop( );
      gSpinner = undefined;
    }
    refresh( );
  }
  if(gOptGotoReplay){
    $( "#tabs" ).tabs( "option", "active", 4 );
  }
  waitCursor( false );

}

function updateShareLink( )
{
  var base = window.location.href.split( '?' )[ 0 ] + '?';
  updateEntryDataFromUI( );

  var param = [];

  var systemParam = [];
  var startParam  = [];
  var endParam    = [];
  
  _.each( gEntryWindowData, function( entryWindow, index )
  {
    var systemData = _.find( gSolarSystems, function( XX ) { return XX.N == entryWindow.system; } );
    if ( systemData != undefined )
    {
      // the start date is calculated by converting the date to ms since 1/1/1970, then subtracting
      // the number of ms since 1970 for 1/1/2003 ( start of eve epoch ), then converted into
      // minutes instead of ms to reduce the size of the number
      var startDelta = ( entryWindow.startTime - EVE_EPOCH ) / MS_PER_MINUTE ;

      // the end date is the difference in the start date and end dates in minutes since that will
      // always be a smaller number than the absolute representation of the date
      var endDelta = ( entryWindow.endTime - entryWindow.startTime ) / MS_PER_MINUTE;

      systemParam.push( systemData.I - SOLAR_SYSTEM_INDEX_OFFSET );
      startParam.push( startDelta );
      endParam.push( endDelta );
    }
  } );

  if ( systemParam.length > 0 )
  {
    param.push( 's=' + systemParam.join( SHARELINK_TOKEN ));
    if ( _.uniq( startParam ).length == 1 )
    {
      param.push( 'b=' + startParam[ 0 ] );
    }
    else
    {
      param.push( 'b=' + startParam.join( SHARELINK_TOKEN ));
    }
    if ( _.uniq( endParam ).length == 1 )
    {
      param.push( 'e=' + endParam[ 0 ] );
    }
    else
    {
      param.push( 'e=' + endParam.join( SHARELINK_TOKEN ));
    }
  }

  // the team selection is saved by stacking the 2 bits ( team 0-3 ) for 3 team selections into
  // a single byte and using that to select an encoding character, very similar to base64 encoding
  // except for the character set used
  var teams = '';
  for( var i = 0; i < gGroups.length; i += 3 )
  {
    var digit = 0;
    if ( i + 2 < gGroups.length )
    {
      digit |= Math.max( 0, gGroups[ i + 2 ].team ) << 4;
    }
    if ( i + 1 < gGroups.length )
    {
      digit |= Math.max( 0, gGroups[ i + 1 ].team ) << 2;
    }
    digit |= Math.max( 0, gGroups[ i ].team );
    teams += TEAM_ENCODING[ digit ];
  }
  // if the ending chars for the string are all zeros because those teams are marked as insignficant,
  // then we can trim those zeros and make the string smaller
  while( teams.length > 1 && teams[ teams.length - 1 ] == 'a' )
  {
    teams = teams.substring( 0, teams.length - 1 );
  }
  param.push( 't=' + teams );
  if(!gOptIgnoreInsig){
    param.push( 'o=' + 1 );
  }
  if(!gOptEstimateFighterValues) {
    param.push( 'f=' + 1);
  }
  //param.push( 'r=' + 1 );
  if(!gAnimationScale){
    param.push( 'rs=' + 1 );
  }
  if(gAnimationOffset>0){
    param.push( 'ro=' + gAnimationOffset );
  }
  if(gAnimationSort){
    param.push( 'rt=' + 1 );
  }
  if(gAnimationSpeed>1){
    param.push( 'rd=' + gAnimationSpeed );
  }
  if(gShowKillsOnly){
    param.push( 'rk=' + 1 );
  }
  if(!gAnimationLabel){
    param.push( 'rl=' + 1 );
  }
  if(gAnimationGroup == 'Type'){
    param.push( 'rg=' + 1 );
  }
  if(gAnimationGroup == 'None'){
    param.push( 'rn=' + 1 );
  }
  
  console.log( param.length + ': ' + param );
  $( '#ux-shareLink' ).val( base + param.join( '&' ));
  if (((base + param.join('&')) != location.href) && !((base + param.join('&').endsWith("=")))) {
    var currentState = history.state;
    history.pushState(currentState, "EVE Kill Report Repair Tool", '?' + param.join('&'));
  }
}

function remove_team( )
{
  var oldTeam = gTeams.length - 1;
  var newTeam = oldTeam - 1;
  // do not allow us to delete the last 2 teams
  if ( oldTeam >= 2 )
  {
    _.each( gTeams[ oldTeam ], function( member, memberIdx )
    {
      gTeams[ newTeam ].push( member );
      gGroups[ member ].team = newTeam;
    } );
    // delete_team calls remove_tabs, add_tabs, and refresh for us
    delete_team( oldTeam );
  }
  flagInvolvedRefresh = true;
}

function refresh( )
{
  var now = Date.now();
  waitCursor( true );
  gTabs.forEach(tab => { tab.dirty = true; });
  draw_team_table( gTeams );
  var currentTab = $( '#tabs' ).tabs( 'option', 'active' );
  update_active_tab( gTabs[ currentTab ] );
  updateShareLink( );
  waitCursor( false );
  console.log("refresh took", Date.now() - now);
}

function update_active_tab( activeTab )
{
  if ( activeTab.dirty )
  {
    console.log( 'redrawing ' + activeTab.title );
    activeTab.populate( );
    activeTab.dirty = false;
    $( "#tabs" ).tabs( refresh );
  }
}

function find_active_tab( ui )
{
  update_active_tab( _.find( gTabs, function( t ) { return t.title == ui.newTab[ 0 ].textContent; } ));
}

function addTab( index, title, content, callback, defaultContent, cssclass )
{
  gTabs = _.filter( gTabs, function( TAB ) { return TAB.index != index; } );
  var tab = new Object;
  tab.index = index;
  tab.title = title;
  tab.content = content;
  tab.defaultContent = defaultContent;
  tab.cssclass = cssclass;
  tab.populate = callback;
  tab.dirty = true;
  gTabs.push( tab );
  gTabs = _.sortBy( gTabs, function( tab ){ return tab.index; } );
  $( "#tabs" ).tabs( "destroy" );
  drawTabs( );
  $( "#tabs" ).tabs( {
    heightStyle: "fill",
    // Detect tab activation
    show: function( event, ui )     { find_active_tab( ui ); },
    activate: function( event, ui ) { find_active_tab( ui ); }
  });
  
  // Fix for tab height issue
  _.each( gTabs, function( tab ) { $("#ui-tabs" + tab.index ).height( '' ); } );
}

function removeTabs()
{
  $( "#tabs" ).tabs( "destroy" );
  drawTabs( );
  $( "#tabs" ).tabs({ heightStyle: "fill" });
}

function drawTabs()
{
  var ulText = '';
  var divText = ''; 
  ulText += '<ul id="ui-tabslist">';
  _.each( gTabs, function( tab )
  {
    ulText  += '<li><a href="#ui-tabs' + tab.index + '">' + tab.title + '</a></li>';
    // TODO: move style to css
    divText += '<div id="ui-tabs' + tab.index + '" style="height: 100%">';
    divText += '<div id="' + tab.content + '" ';
    if( tab.cssclass != undefined )
    {
      divText += 'class="' + tab.cssclass + '"';
    }
    // TODO: move style to css
    divText += ' style="width: 100%;">';
    if( tab.defaultContent != undefined )
    {
      divText += tab.defaultContent;
    }
    divText += '</div>';
    divText += '</div>';
  } );
    // TODO: move style to css
  ulText += '<div id="addBtn" style="float: right;"></div>';
  ulText += '</ul>';
  $( "#tabs" ).empty();
  $( "#tabs" ).append( ulText + divText );
}

function addTeamTabs(idToName)
{
  // TODO: investigate not calling remove first
  removeTeamTabs( );
  _.each( gTeams, function( team, index )
  {
    addTab(( index + STARTING_TEAM_TAB ),'Team ' + ( index + 1 ), 'teamSummary' + index, function( ) { draw_team_kill_table( index, idToName ); } );
  } );
  
}

function removeTeamTabs( )
{
  for( var teamIdx = 0; teamIdx < MAX_TEAMS; ++teamIdx )
  {
    gTabs = _.filter( gTabs, function( tab ) { return tab.index != ( teamIdx + STARTING_TEAM_TAB ); } );
  }
}

function save_data()
{
  // Put the object into storage
  $( '#status' ).text( 'Saving Battle Data...');
  save_battle();
  $( '#status' ).text( 'Battle Data Saved');
  draw_localStorageTable();
}

function load_data()
{
}

function sort_teams( )
{
  _.each(gTeams, function( team, teamIdx )
  {
    gTeams[ teamIdx ] = _.sortBy( team, function( groupIndex ) { return -gGroups[ groupIndex ].players } );
  });
  return gTeams;
}

function assign_team( newTeam, groupIdx, idToName )
{
  $( '#status' ).text( 'Moving ' + gGroups[ groupIdx ].name + ' to ' + TEAM_COLORS[ newTeam ] );
  waitCursor( true );
//  $( "#tabs table, #tabs tr, #tabs thead" ).removeClass( "tablesorter" );
  setTimeout( function( ) {
    if ( newTeam >= gTeams.length )
    {
      addTab(( newTeam + STARTING_TEAM_TAB ), 'Team '+( newTeam + 1 ),'teamSummary' + newTeam, function( ) { draw_team_kill_table( newTeam ); } );
    }
    assign_group_to_team( newTeam, groupIdx );
    refresh( );
    $( '#status' ).text( '' );
    waitCursor( false );
  }, 10 );
  flagInvolvedRefresh = true;
}

function generate_button_html( teamIdx, groupIdx, text )
{
  var colorText = TEAM_COLORS[ teamIdx ];
  return '<span class="ux-button ' + colorText + '" title="Move to ' + colorText + ' team" onclick="assign_team(' + teamIdx +','+groupIdx + ')">' + text + '</span>';
}

function generateCoalitionDropdown( teamIdx )
{
  var html = '<select class="ui-widget-content ui-state-default ux-coalitionDropdown" id="ux-coalitionDropdown' + teamIdx + '" onchange="setCoalition( ' + teamIdx + ' )">';
  html += '<option>---</option>';
  _.each( gCoalitionNames, function( coalition )
  {
    html += '<option>' + coalition + '</option>';
  } );
  _.each( gFactionData, function( faction )
  {
    html += '<option>' + faction.name + '</option>';
  } );
  html += '</select>';
  return html;
}

function setCoalition( teamIdx )
{
  var dirty = false;
  var dropdown = $( "#ux-coalitionDropdown" + teamIdx );
  _.each( gCoalitionData, function( coalition )
  {
    if ( coalition.shortName == dropdown.val( ))
    {
      _.each( gGroups, function( group, groupIdx )
      {
        // group.team == -1 means that the group has been marked as insignificant
        if ( group.team != teamIdx && group.name == coalition.member && group.team != -1 )
        {
          dirty = true;
          assign_group_to_team( teamIdx, groupIdx );
        }
      } );
    }
  } );
  _.each( gFactionData, function( faction )
  {
    if ( faction.name == dropdown.val( ))
    {
      _.each( gGroups, function( group, groupIdx )
      {
        // group.team == -1 means that the group has been marked as insignificant
        if ( group.team != teamIdx && group.factionID == faction.id && group.team != -1 )
        {
          dirty = true;
          assign_group_to_team( teamIdx, groupIdx );
        }
      } );
    }
  } );
  
  if ( dirty )
  {
    refresh( );
  }
  dropdown.val( "---" );
}

function draw_team_table( newData )
{
  $( '#stl-div' ).empty( );

  var width = Math.floor( 100 / newData.length );
  var tableData = '<table class="ux-selTbl ux-selMain ui-widget-content ui-corner-all">';

  newData.forEach(( team, teamIdx ) => {
    var oddOrEven = 0;
    var memberCount = 0;
    var tableContent = '';
    team.forEach(( teamMember, teamMemberIdx ) => {
      var buttonPrev = '';
      var buttonNext = '';

      var groupEntry = '<div class="ux-listitem teamText" title="' + gGroups[ teamMember ].name + '">('+ gGroups[ teamMember ].players + ') ' + gGroups[ teamMember ].name + '</div>';
                      
      if ( teamIdx != 0 )
      {
        buttonPrev = generate_button_html( teamIdx - 1, teamMember, '&lt;&lt;' );
      }
      if ( teamIdx <= newData.length && teamIdx < ( MAX_TEAMS -1 ))
      {
        buttonNext = generate_button_html( teamIdx + 1, teamMember, '&gt;&gt;' );
      }
      var tableData = TableData( 'ux-navPrev',   buttonPrev );
      tableData    += TableData( 'ux-groupData', groupEntry );
      tableData    += TableData( 'ux-navNext',   buttonNext );

      tableContent += TableRow( 'ux-selTbl-Row ui-widget-content ' + TEAM_COLORS[ teamIdx ] + ODD_EVEN[ oddOrEven ], tableData );
      memberCount += gGroups[ teamMember ].players;
      oddOrEven = 1 - oddOrEven;
    } );
    tableData += '  <td class="ux-selTbl" width=' + width + '%>';
    tableData += '    <table class="ux-selTblInner">';
    tableData += '      <col class="ux-navPrev">';
    tableData += '      <col class="ux-groupData">';
    tableData += '      <col class="ux-navNext">';
    tableData += '      <tr class="ux-selTblHeaderRow">';
    tableData += '        <td colspan=2><table width="100%" class="ux-selTblHeader"><tr><td>' + TEAM_COLORS[ teamIdx ] + ' (' + memberCount + ')</td>';
    tableData += '        <td align="right">Assign coalition ' + generateCoalitionDropdown( teamIdx ) + '</td></tr></table>';
    tableData += '        <td>';
    if ( teamIdx > 1 && teamIdx == gTeams.length - 1 )
    {
      tableData += '        <span class="ux-button Gray" title="Remove this team" onclick="remove_team( )">x</span>';
    }
    tableData += '        </td>';
    tableData += '      </tr>';
    
    // Isk Summary For Team table
    var iskSummary = getIskSummary();
    var teamIskValues = iskSummary[0];
    var teamShipsLost = iskSummary[1];
    var shipsLost = teamShipsLost[teamIdx]
    var iskLost = teamIskValues[teamIdx];
    var iskTotal = 0;
    teamIskValues.forEach((isk) => {
      iskTotal += isk;
    });
    if(iskTotal == 0){
      efficiency = 100;
    }else{
      var efficiency = Math.round10(100-((iskLost/iskTotal)*100), -1);
    }
    tableData += '<tr><td colspan="3">'+roundIsk(iskLost)+' Isk lost, Efficiency: '+efficiency+'%, '+shipsLost+' Ships lost</td></tr>'
    tableData += tableContent;
    tableData += '    </table>';
    tableData += '  </td>';
  } );
  tableData += '</tr>';
  $( '#stl-div' ).append( tableData );
  $( ".ux-coalitionDropdown option" ).hover( function( e )
  {
    console.log( e.target );
  } );
}

function changeTheme( )
{
  gTheme = $( '#ux-themeDropdown' ).val( );
  if(gTheme == 'custom'){
    var newTheme = './jquery-ui-1.11.2.custom/jquery-ui.css'
  }
  else{
    var newTheme = '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/' + gTheme + '/jquery-ui.min.css';
  }
  $('#theme_css').attr( 'href', newTheme );
  console.log( 'changeTheme: setting theme to ' + gTheme );
  writeCookies( );
}
