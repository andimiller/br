async function loadEntryWindowData( entryWindow )
{
  const systemName = entryWindow.system.toUpperCase( );
  const systemID = gSolarSystems.find(solarsystem => solarsystem.N.toUpperCase() === systemName).I;

  const killmails = await loadKillmails({ type: { name: "solarSystemID", id: systemID }, start: createZkbDateStart( entryWindow.startTime ), end: createZkbDateEnd( entryWindow.endTime ) });

  const { characterIDs, corporationIDs, allianceIDs } = [].concat(...killmails.map(({ victim, attackers }) => [victim].concat(attackers))).reduce((p, { character_id, corporation_id, alliance_id }) => {
    if (character_id)
      p.characterIDs.add(character_id);
    if (corporation_id)
      p.corporationIDs.add(corporation_id);
    if (alliance_id)
      p.allianceIDs.add(alliance_id);
    return p;
  }, { characterIDs: new Set(), corporationIDs: new Set(), allianceIDs: new Set() });

  const idToName = new Map([
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/characters/names/?character_ids=", Array.from(characterIDs), 100), "character_id", "character_name"), 
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/corporations/names/?corporation_ids=", Array.from(corporationIDs), 100), "corporation_id", "corporation_name"), 
    ...toMap(await chunkedJson("https://esi.tech.ccp.is/v1/alliances/names/?alliance_ids=", Array.from(allianceIDs), 100), "alliance_id", "alliance_name")
  ]);

  // if length != 0, we got some results back, go ahead and push those results into our global set
  for (var element of killmails) {
    if ( gData[ '' + element.killmail_id ] == undefined )
    {
      ++gDataCount;
      gData[ '' + element.killmail_id ] = element;
      await parseKillRecord( element, idToName );
    }
  }

  // if our number of tasks is 0 ( really shouldn't ever be negative ), then all the ajax requests
  // we have posted have finished, therefore we should go ahead and process the data we have collected
  // and present the user the team selection UI
  if ( --gTasks <= 0 )
  {
    $('#status').text( 'Compiling pilot statistics...' );
    // generate our final summary line
    generateSummary( 0, 0, 0, false );
    //gData = _.sortBy( gData, function( killRecord ) { return killRecord.killmail_time; } );
    gData = killmails;

    var elapsed = ( new Date( )).getTime( ) - gProcessingTime.getTime( );
    console.log( 'processing time: ' + elapsed + ' ms' );

    build_data( );
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

// /////////////////////////////////////// ZKillboard parsing ///////////////////////////////////////////

//////////////

async function fetchPages (params, page = 1) {
  const data = await json(url(Object.assign(params, { page })));
  $('#status').text( 'Reading data for ' + (params.type.name == "solarSystemID" ? solarSystemIDtoName(params.type.id) : params.type.name + ":" + params.type.id) + ' from ' + params.startTime + ' to ' + params.endTime + ', page #' + (params.totalPages + page) );
  if (page !== 10 && data.length === 200)
    return data.concat(await fetchPages(params, ++page));
  else
    return data;
};

const json = (...args) => fetch(...args).then(res => res.json());

const chunkedJson = (url, ids, size) => Promise.all(ids.chunk(size).map(chunk => json(url + chunk.join()))).then(chunks => [].concat(...chunks));

async function loadKillmails (params, start = params.start, totalPages = 0) {
  const data = await fetchPages(Object.assign(params, { start, totalPages }));
  if (data.length !== 0 && data.length === 200 * 10) {
    const lastKillmail = data[data.length - 1];
    const killmails = await loadKillmails(params, lastKillmail.killmail_time.replace(/:|-| |T/g,'').substring(0, 10) + "00", totalPages + 10);
    const lastKillIndex = killmails.findIndex(({ killmail_id }) => killmail_id === lastKillmail.killmail_id);
    return data.concat(killmails.slice(lastKillIndex + 1));
  } else {
    return data;
  }
}

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    let R = [];
    for (let i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

const url = ({ type: { name, id }, start, end, page }) => `https://zkillboard.com/api/kills/${name}/${id}/startTime/${start}/endTime/${end}/page/${page}/`;

const toMap = (arr, key, value) => new Map(arr.map(el => [el[key], el[value]]));

//////////////

// /////////////////////////////////////// eve-kill parsing ///////////////////////////////////////////

async function readEveKillUrl( index, url, callback )
{
  // gTasks: now incrementing a global variable named gTasks whenever we issue any ajax request. AFTER
  //         our success or error handler method is called and complete, we then decrement the gTasks
  //         global to keep track of how many outstanding requests are pending so that we know when we
  //         are done receiving data and should start processing the data
  ++gTasks;
  waitCursor( true );
  await fetch(url).then(res => res.text()).then(async (res) => {
    await callback({ responseText: res }, index);
    --gTasks; waitCursor( false );
  }).catch(e => {
    --gTasks; waitCursor( false );
  });
}

async function parseEveKillIndividualMail( result, index )
{
  console.log("parseEveKillIndividualMail");
  var $baseHtml = $( result.responseText );
  if ( $baseHtml == undefined || $baseHtml.length == 0 )
  {
    $('#status').text( 'Reading individual killmail failed' );
    return;
  }

  var $box = $baseHtml.find( '#kl-detail-vicship' );
  var system = $box.find( '.kb-table-row-even:eq(0)' ).find( 'td:eq(1)' ).find( 'strong' ).text( );

  var killTime = Date.parse( $box.find( '.kb-table-row-odd:eq(1)' ).find( 'td:eq(1)' ).find( 'p' ).text( ));
  // base time from eve-kill individual mail is -2 hours to +1 hour from the timestamp in the mail
  var baseTime  = new Date( killTime );
  var startTime = new Date( baseTime.getTime( ) - ( baseTime.getTimezoneOffset( ) + 120 ) * MS_PER_MINUTE );
  var endTime   = new Date( baseTime.getTime( ) - ( baseTime.getTimezoneOffset( ) - 60 ) * MS_PER_MINUTE );

  gEntryWindowData[ index ].startTime = startTime;
  gEntryWindowData[ index ].endTime   = endTime;
  gEntryWindowData[ index ].system    = system;
  uiSetDateTime( startTime, '#start', index );
  uiSetDateTime( endTime,   '#end', index );
  await loadEntryWindowData( gEntryWindowData[ index ] );
  updateEntryUIFromData( );
}

async function parseEveKillRelatedKills( result, index )
{
  console.log("parseEveKillRelatedKills");
  var $baseHtml = $( result.responseText );
  var entryWindow = gEntryWindowData[ index ];

  if ( $baseHtml == undefined || $baseHtml.length == 0 )
  {
    var url = entryWindow.system.replace( 'related', 'detail' );
    url = url.replace( '&adjacent', '' );
    $( '#status' ).text( 'Reading killmail from ' + url );
    await readEveKillUrl( index, url, parseEveKillIndividualMail );
    return;
  }
  else
  {
    $('#status').text( 'Reading ' + entryWindow.system + ' successful.' );
  }
  // Get Battle Summary info
  var summary = $baseHtml.find('.kb-kills-header').first().text().replace(/^\s+|\s+$/g, '');
  var comma = summary.lastIndexOf( ',' );
  var systems = summary.substring( 19, comma ).split( ',' );
  var year  = summary.substring( comma + 2, comma + 6 );
  var month = summary.substring( comma + 7, comma + 9 ) - 1;
  var day   = summary.substring( comma + 10, comma + 12 );
  var startHour = summary.substring( comma + 13, comma + 15 );
  var startMin  = summary.substring( comma + 16, comma + 18 );
  var endHour   = summary.substring( comma + 21, comma + 23 );
  var endMin    = summary.substring( comma + 24, comma + 26 );

  var start = Date.UTC( year, month, day, startHour, startMin );
  var end   = Date.UTC( year, month, day, endHour, endMin );
  if ( end < start ) end += ( 24 * 60 * MS_PER_MINUTE );

  entryWindow.startTime = start;
  entryWindow.endTime   = end;
  entryWindow.system    = systems[ 0 ].trim( );
  await loadEntryWindowData( entryWindow );

  for( var idx = 1; idx < systems.length; ++idx )
  {
    var newEntryWindow = new Object;
    newEntryWindow.startTime = start;
    newEntryWindow.endTime   = end;
    newEntryWindow.system    = systems[ idx ].trim( );
    gEntryWindowData.push( newEntryWindow );
    await loadEntryWindowData( newEntryWindow );
  }
  generateEntryUIFromData( );
}

// /////////////////////////////////////// data parsing ///////////////////////////////////////////
function cleaniskData(){
  _.each( gData, function( killmail )
  {
    if(killmail.zkb != undefined){
      if(!isNaN(parseInt(killmail.zkb.totalValue)) ){
        killmail.zkb.totalValue = parseInt(killmail.zkb.totalValue);
      }
      else{
        killmail.zkb.totalValue = 0;
      }
    }
    else{
      killmail.zkb = {};
      killmail.zkb.totalValue = 0;
    }
  } );
}

function build_data( )
{
  
  cleaniskData();
  
  handleUnknownShips();
  // Ship fielded/lost calcs
  _.each( gPlayers, function( player )
  {
    var totalLost = 0;
    var totalFielded = 0;
    _.each( player.ships, function( ship )
    {
      var fielded = 1;
      var lost = 0;
      var prevWasVictim = false;
      var lastVictimTime = 0;
      // sort kills by chronological order
      ship.kills.sort( function( lhs, rhs )
      {
        // sort predicate:  if the killtimes are equal then put the pod after the
        //                  ship in the kill list
        if ( lhs.time == rhs.time )
        {
          return isCapsule( lhs.ship_type_id ) - isCapsule( rhs.ship_type_id );
        }
        return lhs.time > rhs.time ? 1 : -1;
      } );
      // note: ship.kills MUST be sorted by time for the logic below to work
      _.each( ship.kills, function( kill )
      {
        // pf:  i don't think this is a good idea, this will end up discarding relevant kills at some point
        // ignore if same timestamp as last victim
        if( prevWasVictim && lastVictimTime != kill.time && kill.ship_type_id != 0 )
        {
          ++fielded;
        }
        prevWasVictim = kill.victim;
        if( kill.victim )
        {
          ++lost;
          lastVictimTime = kill.time;
        }
      });
      ship.lost     = lost;
      ship.fielded  = fielded;
      totalLost    += lost;
      totalFielded += fielded;
    });
    player.fielded = totalFielded;
    player.lost = totalLost;
  });
  
  parseGroupData( gData );
  
  build_teams( gGroups );
  
  // Isk calcs

  
  _.each( gData, function( killmail )
  {
    if( killmail.zkb != undefined )
    {
      _.each( gGroups, function( group )
      {
        if( group.ID == killmail.victim.alliance_id )
        {
          if(!isNaN(parseInt(killmail.zkb.totalValue,10))){
            group.iskLost += parseInt(killmail.zkb.totalValue,10);
          }
        }
      } );
    }
  } );
}

function createGroupedArray(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

async function parseKillRecord( kill, idToName )
{
  // Check each kill
  assert( kill != undefined );
  assert( kill.victim != undefined );

  if( kill.zkb != undefined )
  {
    if( !isNaN(parseInt(kill.zkb.totalValue,10)) )
    {
      gSummaryIskLost += parseInt(kill.zkb.totalValue,10);
    }
  }

  // Process victim
  if ( kill.victim.ship_type_id == 32250 )
  {
    var foo = 0;
  }
  await updateShip( kill.victim, kill, kill.victim, idToName );

  // Check each attacker
  for (var attacker of kill.attackers)
    await updateShip(attacker, kill, kill.victim, idToName);
}

function handleUnknownShips()
{
  _.each( gPlayers, function( player )
  {
    // TODO: It seems that this algorithm simply attaches all the kills for an unknown entry to
    //       the next shipType, which is technically incorrect.
    //       It does not affect anything now since we do not use this information at this time,
    //       however should we start to do damage calculations for each ship in the fight this
    //       will mistakenly assign damage to the wrong ship type.
    //       The correct mechanism would be to process things in a chronological fashion and
    //       ignore the unknown entries as they appear.
    player.ships = _.sortBy( player.ships, function( ship ) { return ship.ship_type_id; } );
    var unknownShip = _.find( player.ships, function( ship ) { return ship.ship_type_id == 0; } );
    if( unknownShip != undefined && player.ships.length > 1 )
    {
      _.each( player.ships[ 0 ].kills, function( kill )
      {
        // push this data into the next ship in the ships array
        player.ships[ 1 ].kills.push( kill );
      });
      // remove the unknown ship
      player.ships.shift();
    }
    // Fix indexes
    _.each( player.ships, function( ship, shipIDX )
    {
      ship.index = shipIDX;
    });
  });
}

function parseGroupData( killdata )
{
  var NowTime = new Date();
  // Check each player
  _.each( gPlayers ,function( player )
  {
    updateGroup( checkGroupExists( player ), player );
  } );
  gGroups = _.sortBy( gGroups, function ( group ) { return 1 / group.players } );
  var NowTimeEnd = new Date();
}

async function updateShip( player, kill, victim, idToName )
{
  var playerIndex = await checkPlayerExists( player, idToName );
  var shipIndex = checkShipExists( player, playerIndex );
  var newKill = new Object;
  newKill.killmail_id = kill.killmail_id;
  newKill.time = kill.killmail_time;
  assert( victim != undefined );
  newKill.player = gPlayers[ await checkPlayerExists( victim, idToName ) ];
  newKill.victim = ( player.character_id == victim.character_id );
  newKill.iskLost = 0;
  newKill.ship_type_id = player.ship_type_id;
  if ( newKill.victim )
  {
    assert( gTotalDamage != undefined );
    assert( gTotalDamage != NaN );
    assert( player.damage_taken != undefined );
    assert( player.damage_taken != NaN );
    gTotalDamage += Number(player.damage_taken);
    newKill.damage = Number(player.damage_taken);
    newKill.final_blow = 0;
    newKill.weaponTypeID = 0;
    if ( kill.zkb != undefined && kill.zkb.totalValue != undefined )
    {
      newKill.iskLost = parseInt(kill.zkb.totalValue,10);
    }
  }
  else
  {
    newKill.damage = Number(player.damage_done);
    newKill.final_blow = player.final_blow;
    newKill.weaponTypeID = player.weaponID;
  }
  assert( gPlayers[ playerIndex ].ships[ shipIndex ] != undefined );
  gPlayers[ playerIndex ].ships[ shipIndex ].kills.push( newKill );
}

// Player Functions
  
async function checkPlayerExists( player, idToName )
{
  // this method is more complex than it needs to be due to bugs in the eve killmails themselves.
  // since these mails sometimes just decide to omit the corporation and corporation_id from the data,
  // we use some logic to determine if player record being checked is actually already in the global
  // list or not
  var foundPlayer = gPlayers.find(( testPlayer, index ) => {
    // if the player names are equal, either the corp ID or the alliance ID needs to match
    // as well, since for structures the player name is an empty string
    if ( player.character_id == testPlayer.character_id )
    {
      // player names are equal, compare the alliance IDs
      var equal = ( player.alliance_id == testPlayer.alliance_id );
      // since the corp ID can get left out, check to see if the player we are checking
      // has a corpID
      if ( player.corporation_id != 0 )
      {
        if ( testPlayer.corporation_id != 0 )
        {
          // both the player being checked and the player in the list have a corpID,
          // return the results of the corpID comparison
          return player.corporation_id == testPlayer.corporation_id;
        }
        // since the corpID of the entry in the list is not set we check to see if the alliance IDs
        // are equal and if so, we overwrite the empty corp information in the list's player entry
        // with those of the player being checked and fall through to returning that they are equal
        if ( equal )
        {
          testPlayer.corporation_id   = player.corporation_id;
          testPlayer.corporationName = idToName.get(player.corporation_id);
        }
      }
      // player being checked does not have a corp ID, return the result of the alliance
      // comparision
      return equal;
    }
    // player names are not equal, definitely not the same player entity
    return false;
  } );
  return foundPlayer != undefined ? foundPlayer.index : await addplayer( player, idToName );
}

async function addplayer( player, idToName )
{
  var newplayer = new Object;
  newplayer.alliance_id       = player.alliance_id;
  newplayer.allianceName  = idToName.get(player.alliance_id);
  newplayer.corporation_id    = player.corporation_id;
  newplayer.corporationName  = idToName.get(player.corporation_id);
  newplayer.factionID        = player.faction_id;
  newplayer.factionName      = player.faction_id;
  newplayer.id               = player.character_id;
  newplayer.character_id     = player.character_id;
  newplayer.name             = idToName.get(player.character_id); //gCharacterNameCache(player.character_id); //player.character_id; // Name;
  newplayer.ships            = [];
  newplayer.index            = gPlayers.length;
  newplayer.damageDealt      = 0;
  newplayer.damage_taken      = 0;
  gPlayers.push( newplayer );
  return newplayer.index;
}

function checkShipExists( player, playerIndex )
{
  var foundShip = _.find( gPlayers[ playerIndex ].ships, function( testShip ){ return player.ship_type_id == testShip.ship_type_id });
  return foundShip != undefined ? foundShip.index : addship( player, playerIndex );
}

function addship( player, playerIndex )
{
  if( isCapsule( player.ship_type_id ))
  {
    ++gSummaryPods;
  }
  else
  {
    ++gSummaryShips;
  }
  var newship = new Object;
  newship.kills = [];
  newship.iskLost = 0;
  newship.damage_taken = 0;
  newship.damageDealt = 0;
  newship.ship_type_id = player.ship_type_id;
  newship.index = gPlayers[ playerIndex ].ships.length
  gPlayers[ playerIndex ].ships.push( newship );
  return newship.index;
}

// Group Functions

function checkGroupExists( player )
{
  if( player.alliance_id != 0 )
  {
    groupID = player.alliance_id;
  }
  else
  {
    groupID = player.corporation_id;
  }
  var foundGroup = _.find( gGroups, function( testGroup ) { return groupID == testGroup.ID } );
  if( foundGroup != undefined )
  {
    player.group = foundGroup;
    return foundGroup.index;
  }
  return addGroup( player );
}

function addGroup( player )
{
  var newGroup = new Object;
  if(player.alliance_id != 0)
  {
    newGroup.ID = player.alliance_id;
    newGroup.name = player.allianceName;
  }
  else
  {
    newGroup.ID = player.corporation_id;
    newGroup.name = player.corporationName;
  }
  newGroup.factionID   = player.factionID;
  newGroup.factionName = player.factionName;
  newGroup.damageDealt = 0;
  newGroup.damage_taken = 0;
  newGroup.killed = 0;
  newGroup.players = 0;
  newGroup.iskLost = 0;
  newGroup.ships = [];
  newGroup.index = gGroups.length;
  newGroup.coalitionShortName = '';
  player.group = newGroup;
  gGroups.push( newGroup );
  return newGroup.index;
}

function updateGroup( groupIndex, player )
{
  var group = gGroups[ groupIndex ];
  ++group.players;
  // Check each ship for this player
  _.each( player.ships, function( playerShip )
  {
    var groupShip = checkGroupShipExists( group, playerShip );
    // Check each kill for this ship
    _.each( playerShip.kills ,function( kill )
    {
      if( kill.victim )
      {
        assert( group.damage_taken != undefined );
        assert( group.damage_taken != NaN );
        assert( groupShip.damage_taken != undefined );
        assert( groupShip.damage_taken != NaN );
        group.damage_taken      += kill.damage;
        groupShip.damage_taken  += kill.damage;
        groupShip.iskLost      += kill.iskLost;
      }
      else
      {
        assert( group.damageDealt != undefined );
        assert( group.damageDealt != NaN );
        assert( groupShip.damageDealt != undefined );
        assert( groupShip.damageDealt != NaN );

        group.damageDealt      += kill.damage;
        groupShip.damageDealt  += kill.damage;
      }
    } );
    groupShip.fielded += playerShip.fielded;
    groupShip.lost    += playerShip.lost;
    group.killed      += playerShip.lost;
  } );
}

function checkGroupShipExists( group, ship )
{
  var foundShip = _.find( group.ships, function( testShip ) { return ship.ship_type_id == testShip.shipID } );
  return foundShip != undefined ? foundShip : addGroupShip( ship, group );
}

function addGroupShip( ship, group )
{
  var newship = new Object;
  newship.shipID = ship.ship_type_id;
  newship.lost = 0;
  newship.fielded = 0;
  newship.iskLost = 0;
  newship.damage_taken = 0;
  newship.damageDealt = 0;
  newship.index = group.ships.length;
  group.ships.push( newship );
  return newship;
}

function build_teams( groups )
{
  gTeams = [ [],[] ];
  _.each( groups, function( group, index )
  {
    var dmgTakenFactor = Math.round( group.damage_taken / gTotalDamage * 1000 ) / 10;
    var dmgDealtFactor = Math.round( group.damageDealt / gTotalDamage * 1000 ) / 10;
    var playerFactor   = Math.round( group.players / Math.min( gPlayers.length, 1000 ) * 1000 ) / 10;
//    console.log( group.name + ' damage taken: ' + group.damage_taken + ' (' + dmgTakenFactor + '%)' );
//    console.log( group.name + ' damage done : ' + group.damageDealt + ' (' + dmgDealtFactor + '%)' );
//    console.log( group.name + ' involved    : ' + group.players + ' (' + playerFactor + '%)' );
    
    // Decide if group is insignificant
    // test
    // http://evf-eve.com/services/brcat/?s=3726&b=6044760&e=1740&t=dQQfLdGGcaQaGaaaaaaai
    if ( dmgTakenFactor < 1 && dmgDealtFactor < 1 && playerFactor < 1 && gOptIgnoreInsig)
    {
//      group.name += ' (*)';
      group.team = -1;
    }
    else
    {
      var team;
      if ( gLoadTeams.length > 0 )
      {
        team = gLoadTeams[ index ] == undefined ? 0 : gLoadTeams[ index ];
      }
      else
      {
        // if we are loading extra data, use the existing team assignment we saved
        if(gCurrentTeams.length > 0)
        {
          // Default Team is red
          team = 1;
          _.each(gCurrentTeams, function(currentTeam, currentTeamIdx){
            team = ( _.find( currentTeam, function( X ) { return X == group.ID+ ''; } ) == undefined ) ? team : currentTeamIdx;
          });
        }
        else
        {
          team = ( _.find( gBlueTeams, function( X ) { return X == group.ID; } ) == undefined ) ? 1 : 0;
        }
      }
      while( team >= gTeams.length )
      {
        gTeams.push( [] );
      }
      gTeams[ team ].push( index );
      group.team = team;
    }
  } );
  addTeamTabs( );
}


function assign_group_to_team( targetTeam, groupIndex )
{
  var currentTeam = getTeam( gGroups[ groupIndex ].ID );
  if ( currentTeam == 0 )
  {
    // note:  the adding of the empty string forces the ID into a string, which is
    //        necessary since all the cookies are strings
    gBlueTeams = _.without( gBlueTeams, gGroups[ groupIndex ].ID + '' );
    writeCookies( );
  }
  gGroups[ groupIndex ].team = targetTeam;
  var oldTeam = _.without( gTeams[ currentTeam ], groupIndex );
  gTeams[ currentTeam ] = oldTeam;
  if( gTeams.length > targetTeam )
  {
    gTeams[ targetTeam ].push( groupIndex );
  }
  else
  {
    var newTeam = [];
    gTeams.push( newTeam );
    gTeams[ targetTeam ].push( groupIndex );
  }
  if ( targetTeam == 0 )
  {
    gBlueTeams.push( gGroups[ groupIndex ].ID + '' );
    writeCookies( );
  }
}

function delete_team( teamIdx )
{
  profile( 'removeTeamTabs',       function( ) { removeTeamTabs( ); } );
  gTeams.splice( teamIdx, 1 );
  profile( 'addTeamTabs',          function( ) { addTeamTabs( ); } );
  profile( 'refresh',              function( ) { refresh( ); } );
}

function MakeSpan( val )
{
  return '<span class="ui-state-default ui-state-error ui-corner-all ux-summaryBox">' + val + '</span>';
}

function generateSummary( startTime, endTime, lastKillTime, workingFlag )
{
  summaryIskLost = roundIsk( gSummaryIskLost );

  var outputText = 'Total lost';
  if ( workingFlag )
    outputText += ' so far';
  else
  {
    addTab( 10,  'Involved',       'involvedTable',     function( ) { generateInvolved(); } );
    addTab( 20,  'Class Summary',  'classSummaryTable', function( ) { draw_class_summary_table( '#classSummaryTable' ); } );
    addTab( 30,  'Ship Summary',   'summaryTable',      function( ) { draw_summary_table( '#summaryTable',gTeams ); } );
    addTab( 40,  'Timeline',       'timeLine',          function( ) { generateBattleTimeline( '#timeLine' ); } );
    addTab( 50,  'Replay',       'animTab',          function( ) { generateAnimation( '#animTab' ); } );
    addTab( 400, 'Chart',          'chartTab',          function( ) { draw_charts(); } );
    addTab( 500, 'Kill List',      'ktl',               function( ) { draw_kill_table(); } );
  }
  outputText    += ': '          + MakeSpan( summaryIskLost );
  outputText    += ' Players: '  + MakeSpan( gPlayers.length );
  outputText    += ' Ships: '    + MakeSpan( gSummaryShips );
  outputText    += ' Pods: '     + MakeSpan( gSummaryPods );
  $('#summaryText').empty( );
  $('#summaryText').append( outputText );
}

