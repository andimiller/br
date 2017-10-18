function loadEntryWindowData (entryWindow) {
  const name = entryWindow.system.toUpperCase();
  const id = gSolarSystems.find(solarsystem => solarsystem.N.toUpperCase() === name).I;
  return loadKillmails({ type: { name: "solarSystemID", id }, start: createZkbDateStart( entryWindow.startTime ), end: createZkbDateEnd( entryWindow.endTime ) });
}

// /////////////////////////////////////// ZKillboard parsing ///////////////////////////////////////////

//////////////

async function fetchPages (params, page = 1) {
  const data = await json(url(Object.assign(params, { page })));
  $('#status').text( 'Reading data for ' + (params.type.name == "solarSystemID" ? solarSystemIDtoName(params.type.id) : params.type.name + ":" + params.type.id) + ' from ' + params.start + ' to ' + params.end + ', page #' + (params.totalPages + page) );
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

function parseKillRecord(kill, idToName) {
  // Check each kill
  assert( kill != undefined );
  assert( kill.victim != undefined );

  if(kill.zkb) {
    if(!isNaN(parseInt(kill.zkb.totalValue,10))) {
      gSummaryIskLost += parseInt(kill.zkb.totalValue, 10);
    }
  }

  // Check victim & each attacker
  [kill.victim, ...kill.attackers].forEach(attacker => updateShip(attacker, kill, kill.victim, idToName));
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

function updateShip( player, kill, victim, idToName )
{
  var playerIndex = checkPlayerExists( player, idToName );
  var shipIndex = checkShipExists( player, playerIndex );
  var newKill = new Object;
  newKill.killmail_id = kill.killmail_id;
  newKill.time = kill.killmail_time;
  assert( victim != undefined );
  newKill.player = gPlayers[ checkPlayerExists( victim, idToName ) ];
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
  
function checkPlayerExists( player, idToName )
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
      if (player.corporation_id)
      {
        if (testPlayer.corporation_id)
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
          testPlayer.corporation_name = idToName.get(player.corporation_id);
        }
      }
      // player being checked does not have a corp ID, return the result of the alliance
      // comparision
      return equal;
    }
    // player names are not equal, definitely not the same player entity
    return false;
  } );
  return foundPlayer != undefined ? foundPlayer.index : addplayer( player, idToName );
}

function addplayer ({ character_id, corporation_id, alliance_id, faction_id }, idToName) {
  return gPlayers.push({
    id: character_id,
    character_id, // ?
    name: idToName.get(character_id),
    corporation_id,
    corporation_name: idToName.get(corporation_id),
    alliance_id,
    alliance_name: idToName.get(alliance_id),
    faction_id,
    faction_name: faction_id,
    ships: [],
    damage_dealt: 0,
    damage_taken: 0,
    index: gPlayers.length
  }) - 1;
}

function checkShipExists(player, playerIndex) {
  const foundShip = gPlayers[playerIndex].ships.find(testShip => player.ship_type_id == testShip.ship_type_id);
  return foundShip != undefined ? foundShip.index : addship(player, playerIndex);
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
  newship.damage_dealt = 0;
  newship.ship_type_id = player.ship_type_id;
  newship.index = gPlayers[ playerIndex ].ships.length
  gPlayers[ playerIndex ].ships.push( newship );
  return newship.index;
}

// Group Functions

function checkGroupExists( player )
{
  if(!!player.alliance_id)
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
  if(!!player.alliance_id)
  {
    newGroup.ID = player.alliance_id;
    newGroup.name = player.alliance_name;
  }
  else
  {
    newGroup.ID = player.corporation_id;
    newGroup.name = player.corporation_name;
  }
  newGroup.factionID   = player.factionID;
  newGroup.faction_name = player.faction_name;
  newGroup.damage_dealt = 0;
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
        assert( group.damage_dealt != undefined );
        assert( group.damage_dealt != NaN );
        assert( groupShip.damage_dealt != undefined );
        assert( groupShip.damage_dealt != NaN );

        group.damage_dealt      += kill.damage;
        groupShip.damage_dealt  += kill.damage;
      }
    } );
    groupShip.fielded += playerShip.fielded;
    groupShip.lost    += playerShip.lost;
    group.killed      += playerShip.lost;
  } );
}

function checkGroupShipExists (group, ship) {
  const foundShip = group.ships.find(testShip => ship.ship_type_id == testShip.shipID);
  return foundShip != undefined ? foundShip : addGroupShip(ship, group);
}

function addGroupShip ({ ship_type_id }, group) {
  return group.ships[group.ships.push({
    shipID: ship_type_id,
    lost: 0,
    fielded: 0,
    iskLost: 0,
    damage_taken: 0,
    damage_dealt: 0,
    index: group.ships.length
  }) - 1];
}

function build_teams( groups )
{
  gTeams = [ [],[] ];
  _.each( groups, function( group, index )
  {
    var dmgTakenFactor = Math.round( group.damage_taken / gTotalDamage * 1000 ) / 10;
    var dmgDealtFactor = Math.round( group.damage_dealt / gTotalDamage * 1000 ) / 10;
    var playerFactor   = Math.round( group.players / Math.min( gPlayers.length, 1000 ) * 1000 ) / 10;
//    console.log( group.name + ' damage taken: ' + group.damage_taken + ' (' + dmgTakenFactor + '%)' );
//    console.log( group.name + ' damage done : ' + group.damage_dealt + ' (' + dmgDealtFactor + '%)' );
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

function generateSummary( startTime, endTime, lastKillTime, workingFlag, idToName )
{
  summaryIskLost = roundIsk( gSummaryIskLost );

  var outputText = 'Total lost';
  if ( workingFlag )
    outputText += ' so far';
  else
  {
    addTab( 10,  'Involved',       'involvedTable',     function( ) { generateInvolved(idToName); } );
    addTab( 20,  'Class Summary',  'classSummaryTable', function( ) { draw_class_summary_table( '#classSummaryTable' ); } );
    addTab( 30,  'Ship Summary',   'summaryTable',      function( ) { draw_summary_table( '#summaryTable',gTeams ); } );
    addTab( 40,  'Timeline',       'timeLine',          function( ) { generateBattleTimeline( '#timeLine', idToName ); } );
    addTab( 50,  'Replay',       'animTab',          function( ) { generateAnimation( '#animTab' ); } );
    addTab( 400, 'Chart',          'chartTab',          function( ) { draw_charts(); } );
    addTab( 500, 'Kill List',      'ktl',               function( ) { draw_kill_table(idToName); } );
  }
  outputText    += ': '          + MakeSpan( summaryIskLost );
  outputText    += ' Players: '  + MakeSpan( gPlayers.length );
  outputText    += ' Ships: '    + MakeSpan( gSummaryShips );
  outputText    += ' Pods: '     + MakeSpan( gSummaryPods );
  $('#summaryText').empty( );
  $('#summaryText').append( outputText );
}

