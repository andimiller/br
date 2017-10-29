Number.prototype.formatIsk = function( decPlaces, thouSeparator, decSeparator )
{
    var n = this;
    var decPlaces = isNaN( decPlaces = Math.abs( decPlaces )) ? 2 : decPlaces;
    var decSeparator  = decSeparator == undefined ? "." : decSeparator;
    var thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
    var sign = n < 0 ? "-" : "";
    var i = parseInt( n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function getTeam( groupID )
{
  // pf: optimized to not continue iteration if the requested item was found
  var foundIndex = -1;
  _.each( gTeams, function( team, teamIdx )
  {
    _.each( team, function( teamMember )
    {
      if( groupID == gGroups[ teamMember ].ID )
      {
        foundIndex = teamIdx;
        return;
      }
    });
  });
  return foundIndex;
}

function convertChartDataToPercent(chartData)
{
  var total = 0;
  _.each(chartData, function(data)
  {
    total += data[1];
  });
  if(total != 0)
  {
    _.each(chartData, function(data)
    {
      data[1]= Number((data[1]/total*100).toFixed(1));
    });
  }
  else
  {
    return false;
  }
  return chartData;
}

function uiSetDateTime( ms, base, index )
{
  var data = new Date( ms );
  // todo: add localization
  var date =  pad(( data.getUTCMonth( ) + 1 )) + '/' + pad( data.getUTCDate( )) + '/' + data.getUTCFullYear( );
  var timeH = data.getUTCHours( );
  var timeM = data.getUTCMinutes( );
  $( base + 'date' + index ).val( date );
  $( base + 'timeH' + index ).val( pad( timeH ));
  $( base + 'timeM' +index ).val( pad( timeM ));
}

function uiGetDateTime( base, index )
{
  var baseDate = new Date( Date.parse( $( base + 'date' + index ).val( )));
  return Date.UTC( baseDate.getFullYear( ), baseDate.getMonth( ), baseDate.getDate( ), $( base + 'timeH' + index ).val( ), $( base + 'timeM' + index ).val( ));
}

function createZkbDate( ms )
{
  var date = new Date( ms );
  return '' + date.getUTCFullYear( ) + pad( date.getUTCMonth( ) + 1 ) + pad( date.getUTCDate( )) + pad( date.getUTCHours( )) + pad( date.getUTCMinutes( ));
}

function createZkbDateStart( ms )
{
  // Datetime must be full hour now
  var date = new Date( ms );
  return '' + date.getUTCFullYear( ) + pad( date.getUTCMonth( ) + 1 ) + pad( date.getUTCDate( )) + pad( date.getUTCHours( )) + pad( 0);
}

function createZkbDateEnd( ms )
{
  // Datetime must be full hour now
  var date = new Date( ms );
  var roundDownDate = new Date(Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate( ),date.getUTCHours( )));
  var roundUpDate = new Date(roundDownDate.valueOf() + 3600000);
  if(date.getUTCMinutes()==0){
    return '' + roundDownDate.getUTCFullYear( ) + pad( roundDownDate.getUTCMonth( ) + 1 ) + pad( roundDownDate.getUTCDate( )) + pad( roundDownDate.getUTCHours( )) + pad( roundDownDate.getUTCMinutes( ));
  }
  else{
    return '' + roundUpDate.getUTCFullYear( ) + pad( roundUpDate.getUTCMonth( ) + 1 ) + pad( roundUpDate.getUTCDate( )) + pad( roundUpDate.getUTCHours( )) + pad( roundUpDate.getUTCMinutes( ));
  }

}

function parseZkbDate( zkbDate )
{
  var date = new Date( );
  date.setUTCFullYear( zkbDate.substring( 0, 4 ));
  date.setUTCMonth( parseInt( zkbDate.substring( 4, 6 )) - 1 );
  date.setUTCDate( zkbDate.substring( 6, 8 ));
  date.setUTCHours( zkbDate.substring( 8, 10 ));
  date.setUTCMinutes( zkbDate.substring( 10, 12 ));
  return date;
}

function parse_url_params( url )
{
  // parse the parameters from the url passed and return them as array elements
  var hash;
  var vars = [];
  var hashes = url.slice( url.indexOf( '?' ) + 1 ).split( '&' );
  for( var i = 0; i < hashes.length; ++i )
  {
    hash = hashes[ i ].split( '=' );
    vars.push( hash[ 0 ] );
    vars[ hash[ 0 ] ] = hash[ 1 ];
  }
  return vars;
}

function ship_type_idtoName( ship_type_id )
{
  var name = _.find( gShipTypes, function( shiptype ) { return shiptype.I == ship_type_id; } );
  return name == undefined ? 'unknown' : name.N;
}

function getShipClass(shipID)
{
  var shipClass = _.find(gShipTypes,function(ship){return ship.I == shipID});
  return shipClass == undefined ? 'unknown' : shipClass.G;
}

function getShipClassOrder(shipID)
{
  var shipClass = _.find(gShipTypes,function(ship){return ship.I == shipID});
  return shipClass == undefined ? 999999 : shipClass.O;
}

function ship_type_idtoType( ship_type_id )
{
  var name = _.find( gShipTypes, function( shiptype ) { return shiptype.I == ship_type_id; } );
  var returnvalue = name == undefined ? 'unknown' : name.G;
  if(typeof returnvalue != 'undefined'){return returnvalue;}
  return 'unknown';
}

function solarSystemIDtoName( solarSystemID )
{
  var foundSystem = _.find(gSolarSystems, function(system){return system.I==solarSystemID});
  return foundSystem.N;
}

// ---------------------------------------------------------------------------------------------------------------------
// utility methods
// ---------------------------------------------------------------------------------------------------------------------
function pad( num )
{
  var s = num.toString( );
  return num < 10 ? "0" + s : s;
}

function pad_field( field, count, padding )
{
  var value = $( field ).val( );

  while( value.length < count )
  {
    value = '0' + value;
  }
  $(field).val( value );
}

function format_time_for_chart_label( time )
{
  var s = '';
  if ( time != undefined )
  {
    s += pad( time.getHours( ));
    s += ':';
    s += pad( time.getMinutes( ));
  }
  return s;
}

function logTimer( msgText, startTime )
{
  var now = new Date( );
  if( startTime != undefined )
  {
    console.log( msgText + ': ' + ( now.getTime( ) - startTime.getTime( )) + 'ms' );
  }
  return now;
}

function profile( text, func )
{
  var timer = new Date( );
  func( );
  logTimer( text, timer );
}

function Bold( content )
{
  return '<b>' + content + '</b>';
}

function Italics( content )
{
  return '<i>' + content + '</i>';
}

function zKillLink( service, value, text )
{
  return service && value && text ? '<a href="https://zkillboard.com/' + service + '/' + value + '/">' + text + '</a>' : '';
}

function eveImageLink( service, id )
{
  var suffix = ( service == 'Character' ? '_32.jpg' : '_32.png' );
  return '<img src="https://image.eveonline.com/' + service + '/' + id + suffix + '">';
}

function MakeHtml( keyword, cls, content )
{
  return '<' + keyword + ' class="' + cls + '">' + content + '</' + keyword + '>';
}

function TableData( cls, content )
{
  return MakeHtml( 'td', cls, content );
}

function TableRow( cls, content )
{
  return MakeHtml( 'tr', cls, content );
}

function createEmptyArray( count )
{
  var array = [];
  for( var i = 0; i < count; ++i )
  {
    array.push( 0 );
  }
  return array;
}

function roundIsk( isk )
{
  if ( isk > ONE_BILLION )
  {
    return Math.round( isk * 100 / ONE_BILLION ) / 100 + 'b';
  }
  if ( isk < ONE_MILLION )
  {
    return Math.round( isk * 100 / 1000 ) / 100 + 'k';
  }
  return Math.round( isk * 100 / ONE_MILLION ) / 100 + 'm';
}

function assert( condition )
{
  if ( !condition )
  {
    var foo = 0;
    console.log( 'assertion failed, set breakpoint in util.js to debug assertion' );
  }
}

function isCapsule( ship_type_id )
{
  return ship_type_id == 670 || ship_type_id == 33328;
}

function waitCursor( onOff )
{
//  console.log( 'waitCursor( ' + onOff + ' ) - entry count = ' + gWaitCursor );
  if ( onOff )
  {
    if ( gWaitCursor++ == 0 )
    {
      $( 'html' ).addClass( 'waiting' );
//      $( 'body' ).css( 'cursor', 'wait' );
    }
  }
  else
  {
    if ( --gWaitCursor == 0 )
    {
      $( 'html' ).removeClass( 'waiting' );
//      $( 'body' ).css( 'cursor', 'default' );
    }
  }
//  console.log( 'waitCursor( ' + onOff + ' ) - exit count = ' + gWaitCursor );
}

// Closure
(function(){

	/**
	 * Decimal adjustment of a number.
	 *
	 * @param	{String}	type	The type of adjustment.
	 * @param	{Number}	value	The number.
	 * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
	 * @returns	{Number}			The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}

})();
