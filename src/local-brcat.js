function save_battle()
{
  var savedBattle = new Object;
  var savedBattleData = new Object;
  savedBattle.formvalues = "test";
  savedBattleData.gPlayers = gPlayers;
  savedBattleData.gTeams = gTeams;
  savedBattleData = LZString.compress( JSON.stringify( savedBattleData ));
  savedBattle.date = new Date();
  savedBattle.size = savedBattle.formvalues.length + savedBattleData.length;

  localStorageTable = load_LS_table();
  savedBattle.index = nextIndex( localStorageTable );

  localStorageTable.push( savedBattle );
  save_LS_table( localStorageTable );
  save_BattleData( savedBattleData,savedBattle.index );
}

function load_LS_table()
{
  var localStorageTable = JSON.parse( localStorage.getItem( 'localStorageTable' ));
  if( localStorageTable == null )
  {
    localStorageTable = [];
  }
  return localStorageTable;
}

function save_LS_table(localStorageTable)
{
  localStorage.setItem('localStorageTable', JSON.stringify(localStorageTable));
}

function nextIndex(localStorageTable)
{
  if(localStorageTable.length == 0)
  { 
    return 1;
  }
  else
  {
    highestIndexItem = _.max( localStorageTable, function(lsItem){ return lsItem.index; });
    return highestIndexItem.index +1;
  }
}

function save_BattleData(savedBattleData,index)
{
  localStorage.setItem(('savedBattleData'+index), savedBattleData);
}

function clear_LS_table()
{
  localStorage.clear();
}
