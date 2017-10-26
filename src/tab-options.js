var gOptIgnoreInsig         = true;
var gOptIgnorePods          = false;
var gOptIgnoreRookieShips   = false;
var gOptIgnoreAllNonShips   = false;
var gOptIgnorePosMods       = false;
var gOptIgnoreDeployables   = false;
var gOptIgnoreUnknowns      = false;
var gOptIgnoreNPCs          = false;

var gOptHideAvatars         = false;
var gOptHideLogos           = false;

function createCheckboxCell( name, text, checked )
{
  return TableData( '', '<input type="checkbox" name="' + name + '" onchange="updateOptions( \''+ name +'\')"' + ( checked ? ' checked' : '' ) + '>' + text + '</input>' );
}

function generateOptionsTab( target )
{
  var html = [];
  html.push( '<b><i>Under development</i></b><br><form><table><tr>' );
  //html.push( createCheckboxCell( 'optAll', 'Ignore All Non-Ships', gOptIgnoreAllNonShips ));
  //html.push( createCheckboxCell( 'optDeployables', 'Ignore Deployables', gOptIgnoreDeployables ));
  //html.push( createCheckboxCell( 'optPosMods', 'Ignore POS mods', gOptIgnorePosMods ));
  //html.push( '</tr><tr>' );
  //html.push( createCheckboxCell( 'optUnknowns', 'Ignore Unknowns', gOptIgnoreUnknowns ));
  //html.push( createCheckboxCell( 'optPods', 'Ignore Pods', gOptIgnorePods ));
  //html.push( createCheckboxCell( 'optRookieShips', 'Ignore Rookie Ships', gOptIgnoreRookieShips ));
  html.push( '</tr><tr>' );
  //html.push( createCheckboxCell( 'optNPCs', 'Ignore NPCs', gOptIgnoreNPCs ));
  html.push( createCheckboxCell( 'optInsig', 'Ignore insignificant corps/alliances', gOptIgnoreInsig ));
  html.push( '</tr></table></form>' );
  $( target ).empty( );
  $( target ).append( html.join( '' ));
}

function updateOptions( option )
{
  if(option == 'optInsig'){
    if(gOptIgnoreInsig){
      gOptIgnoreInsig = false;
    }
    else
    {
      gOptIgnoreInsig = true;
    }
    updateShareLink( );
    console.log('gOptIgnoreInsig:'+ gOptIgnoreInsig);
  }
}



