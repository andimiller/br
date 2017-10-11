function convertToTime( timeText )
{
  var time = new Date;
  time.setUTCFullYear( timeText.substring( 0,4 ), Number( timeText.substring( 5, 7 )) - 1, timeText.substring( 8,10 ));
  time.setUTCHours( timeText.substring( 11,13 ),timeText.substring( 14,16 ),0);
  return time;
}

function draw_pie_charts_summary()
{
  var chartData = generate_pie_chart();
  var chartDataDmgRcv = chartData.pop();
  var chartDataDmg = chartData.pop();
  var chartDataIsk = chartData.pop();

  draw_pie_chart(chartDataIsk, 'Isk Lost', 'IskChart', 'Isk');
  draw_pie_chart(chartDataDmg, 'Damage Dealt', 'DmgChart', 'HP');
  draw_pie_chart(chartDataDmgRcv, 'Damage Received', 'DmgRcvChart', 'HP');
}

function createChartRadio( id, name, chart )
{
  var inp = '<input type="radio" id="radio' + id + '" name="radio" ' + ( gActiveChart == name ? 'checked="checked"' : '') + ' class="ui-helper-hidden-accessible">';
  var span  = MakeHtml( 'span', 'ui-button-text no_padding', chart );
  var label = '<label onclick="setActiveChart(\'' + name + '\' );" for="radio' + id + '" class="ui-button ui-widget ui-state-default ui-button-text-only" role="button">' + span + '</label>';
  return inp + label;
}

function createChartTypeRadio( id, name, chart )
{
  var inp = '<input type="radio" id="radioType' + id + '" name="radioType" ' + ( gActiveChartType == name ? 'checked="checked"' : '') + ' class="ui-helper-hidden-accessible">';
  var span  = MakeHtml( 'span', 'ui-button-text no_padding', chart );
  var label = '<label onclick="setActiveChartType(\'' + name + '\' );" for="radioType' + id + '" class="ui-button ui-widget ui-state-default ui-button-text-only" role="button">' + span + '</label>';
  return inp + label;
}

function draw_charts()
{
  Highcharts.setOptions(Highcharts.theme);
  $('#chartTab').empty();
  
  var ChartItemHtml = [];
  ChartItemHtml.push( '<div id="radioset1" class="ui-buttonset" style="margin-left:auto; margin-right:auto; text-align:center;">' );
  ChartItemHtml.push( createChartRadio( '1', 'kill',      'Kills' ));
  ChartItemHtml.push( createChartRadio( '2', 'killTotal', 'Total Kills' ));
  ChartItemHtml.push( createChartRadio( '3', 'isk',       'Isk Lost' ));
  ChartItemHtml.push( createChartRadio( '4', 'iskTotal',  'Total Isk Lost' ));
  ChartItemHtml.push( createChartRadio( '5', 'dps',       'DPS rcvd' ));
  ChartItemHtml.push( createChartRadio( '6', 'dpsDone',   'DPS done' ));
  ChartItemHtml.push( createChartRadio( '7', 'involved',  'Involved' ));
	ChartItemHtml.push( '</div>' );
  
  var ChartTypeHtml = [];
  ChartTypeHtml.push( '<div id="radioset2" class="ui-buttonset" style="margin-left:auto; margin-right:auto; text-align:center;">' );
  ChartTypeHtml.push( createChartTypeRadio( '1', 'column',      'Column Chart' ));
  ChartTypeHtml.push( createChartTypeRadio( '2', 'line', 'Line Chart' ));
	ChartTypeHtml.push( '</div>' );

  // TODO: move style to css
  var spacerHtml = '<div id="spacer" style="width:50%;height:20px;margin-left:auto; margin-right:auto;">';
  
  // ui-state-active
  $('#chartTab').append( spacerHtml );
  $('#chartTab').append( ChartItemHtml.join( '' ));
  $( "#radioset1" ).buttonset();
  
  $('#chartTab').append( spacerHtml );
  
  $('#chartTab').append( '<div id="mainChart" style="width:90%; height:400px; margin-left:auto; margin-right:auto;"></div>' );
  
  drawMainChart();
  
  $('#chartTab').append( ChartTypeHtml.join( '' ));
  $( "#radioset2" ).buttonset();

  
  $('#chartTab').append( spacerHtml );
  
  profile( 'draw_pie_charts_summary',   function( ) { draw_pie_charts_summary(); } );
}

function drawMainChart()
{
  profile( 'draw_kill_chart', function( ) {
    switch( gActiveChart )
    {
      case 'kill':      draw_kill_chart( 'kill', 'Kill Graph', 'Kills per ', 'mainChart','kills'); break;
      case 'killTotal': draw_kill_chart( 'killTotal', 'Total Kills Graph','Total kills per ', 'mainChart','kills'); break;
      case 'isk':       draw_kill_chart( 'isk', 'Isk Graph','Isk lost per ', 'mainChart','isk'); break;                                                       
      case 'iskTotal':  draw_kill_chart( 'iskTotal','Total Isk Graph','Total Isk lost per ', 'mainChart','isk'); break;                                                       
      case 'dps':       draw_kill_chart( 'dps', 'Damage Per Second Graph','Damage Per Second ', 'mainChart','HP/s'); break;                                                       
      case 'dpsDone':   draw_kill_chart( 'dpsDone','Damage Done Per Second Graph','Damage Done Per Second ', 'mainChart','HP/s'); break;                                                       
      case 'involved':  draw_kill_chart( 'involved','Involved Graph','Involved in battle over time ', 'mainChart','players'); break;
    }
  } );
}

function setActiveChart( activeChart )
{
  gActiveChart = activeChart;
  drawMainChart();
}

function setActiveChartType( activeChartType )
{
  gActiveChartType = activeChartType;
  drawMainChart();
}

function draw_pie_chart(chartData, title, target, units){

  $('#chartTab').append('<div id="'+target+'" style="width:50%; height:200px; margin-left:auto; margin-right:auto;"></div>');
  $('#'+target).highcharts({
    colors: [
   '#333399', 
   '#993333', 
   '#339933', 
   '#993399', 
   '#999933', 
   '#339999',
   '#aaaaaa'
    ],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    },
    title: {
        text: title
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>{point.y} '+units+''
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        name: title,
        data: chartData 
    }]
  });
  var spacerHtml = '<div id="spacer" style="width:50%;height:35px;margin-left:auto; margin-right:auto;">';
  $('#chartTab').append(spacerHtml);
}

function draw_kill_chart( chartDataName, title, yAxisLabelText, target, unit)
{
  var chartData = generateKillChartData( chartDataName );
  var interval = chartData.pop();
  var seriesData = [];
  for( i = 1; i < chartData.length; ++i )
  {
    //seriesData.push(['Team'+i,chartData[i]]);
    seriesData.push({name: 'Team ' + i, data: chartData[ i ]});
  }
  
  var xAxisStepSize = Math.round(seriesData[0].data.length/10);
  
  //$('#chartTab').append('<div id="'+target+'" style="width:90%; height:400px; margin-left:auto; margin-right:auto;"></div>');
  $('#'+target).highcharts({
    colors: [
   '#333399', 
   '#993333', 
   '#339933', 
   '#993399', 
   '#999933', 
   '#339999',
   '#aaaaaa'
    ],
    chart: { type: gActiveChartType,
             zoomType: 'x'
           },
    title: { text: title    },
    xAxis: { categories: chartData[0], labels: {enabled: true, step: xAxisStepSize, maxStaggerLines: 1} },
    yAxis:
      {
        min: 0,
        title: { text: yAxisLabelText+ interval +' min' },
        stackLabels:
          {
            enabled: false,
            style:
              {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
              }
          }
      },
    tooltip: {
        formatter: function() {
            var formatString = '<b>'+ this.x +'</b><br/>' + this.series.name +': '+ (unit == 'isk' || unit == 'HP/s' ? Number(this.y).formatIsk() : this.y) + ' ' + unit;
            if(gActiveChartType == 'column'){
              formatString += '<br/>'+ 'Total: '+ (unit == 'isk' || unit == 'HP/s' ? Number(this.point.stackTotal).formatIsk() : this.point.stackTotal) + ' ' + unit;
            }
            return formatString;
        }
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        },
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    series: seriesData
  });
}

function generateKillChartData(typeOfChart)
{
  var chartData = [];

  var teamData0 = [];
  var teamData1 = [];
  var teamData2 = [];
  var teamData3 = [];
  var teamData4 = [];
  var teamData5 = [];
  var teamData6 = [];
  // Get first and last kill time
  if ( gData == undefined || gData.length <= 0 )
  {
    return chartData;
  }
  var lastKill = convertToTime( gData[gData.length-1].killTime );
  var firstKill = convertToTime( gData[0].killTime);
  // Get timespan of data
  var killTimespan = Math.round((lastKill.getTime()-firstKill.getTime()) / MS_PER_MINUTE )+1;
  var xAxis = [];
  var interval = 1;

  // Set resolution of graph
  if(killTimespan>180){interval = 5;}
  if(killTimespan>600){interval = 10;}
  if(killTimespan>1440){interval = 60;}

  for (var i=0; i<killTimespan; i+=interval)
  {
    var timeStamp = new Date(firstKill.getTime()+( i * MS_PER_MINUTE ));
    xAxis.push(format_time_for_chart_label(timeStamp));
    teamData0.push(0);
    teamData1.push(0);
    teamData2.push(0);
    teamData3.push(0);
    teamData4.push(0);
    teamData5.push(0);
    teamData6.push(0);
  }

  chartData.push(xAxis);

  chartData.push(teamData0);
  if(gTeams.length>1){chartData.push(teamData1);}
  if(gTeams.length>2){chartData.push(teamData2);}
  if(gTeams.length>3){chartData.push(teamData3);}
  if(gTeams.length>4){chartData.push(teamData4);}
  if(gTeams.length>5){chartData.push(teamData5);}
  if(gTeams.length>6){chartData.push(teamData6);}

  // Populate chartData
  if(typeOfChart == 'involved'){
    _.each(gPlayers, function(player){

      var firstTimeIndex = -1;
      _.each(player.ships, function(ship){
        // Get the players first kill or loss time
        var kill = ship.kills[ship.kills.length-1];
        var fullKill = _.find(gData, function(killmail){ return kill.killmail_id == killmail.killmail_id });
        var killTime = convertToTime(fullKill.killTime);
        var timeIndex = Math.floor((killTime.getTime()-firstKill.getTime())/ MS_PER_MINUTE / interval);
        if(firstTimeIndex == -1){
          firstTimeIndex = timeIndex;
        }
        if(firstTimeIndex>timeIndex){
          firstTimeIndex = timeIndex;
        }

      });
      var teamIndex = getTeam(player.alliance_id ? player.alliance_id : player.corporation_id );
      if(teamIndex > -1){
        chartData[teamIndex+1][firstTimeIndex]++;
      }
    });
    _.each(chartData, function(team, idx){
      if(idx != 0){
        var prev = 0;
        _.each(team, function(isk, tdx){
          chartData[idx][tdx] += prev;
          prev = chartData[idx][tdx];
        });
      }
    })
  }
  else
  {
    var kills = _.groupBy( gData, 'killTime' );
    _.each(kills, function(timeslice)
    {
      _.each(timeslice,function(kill)
      {
        var killTime = convertToTime(kill.killTime);
        var timeIndex = Math.floor((killTime.getTime()-firstKill.getTime())/ MS_PER_MINUTE / interval);
        var teamIndex = getTeam(kill.victim.alliance_id ? kill.victim.alliance_id : kill.victim.corporation_id );
        if(teamIndex > -1){
          if(typeOfChart == 'kill' || typeOfChart == 'killTotal'){
            chartData[teamIndex+1][timeIndex]++;
          }
          else if(typeOfChart == 'dps'){
            chartData[teamIndex+1][timeIndex]+= kill.victim.damage_taken/interval/60;
          }
          else if (typeOfChart == 'isk' || typeOfChart == 'iskTotal'){
            if(typeof  kill.zkb != 'undefined'){
              chartData[teamIndex+1][timeIndex]+= Number(kill.zkb.totalValue);
            }
          }
          else if(typeOfChart == 'dpsDone'){
            _.each(kill.attackers, function(attacker){
              var attackerTeamIndex = getTeam(attacker.alliance_id ? attacker.alliance_id : attacker.corporation_id );
              if(attackerTeamIndex > -1){
                chartData[attackerTeamIndex+1][timeIndex]+= Number(attacker.damage_done/interval/60);
              }
            });
          }
        }
      });
    });

    if(typeOfChart == 'iskTotal' || typeOfChart == 'killTotal'){
      _.each(chartData, function(team, idx){
        if(idx != 0){
          var prev = 0;
          _.each(team, function(isk, tdx){
            chartData[idx][tdx] += prev;
            prev = chartData[idx][tdx];
          });
        }
      });
    }
  }

  chartData.push(interval);

  return chartData;
}

function generate_pie_chart()
{
  var chartDataIsk = [];
  var chartDataDmg = [];
  var chartDataDmgRcv = [];

  _.each( gTeams, function( team, teamIdx)
  {
    var totaldamageDealt = 0;
    var totaldamage_taken = 0;
    var totalisklost = 0;
    _.each( team, function( teamMember, teamMemberIdx)
    {
      totaldamageDealt += gGroups[teamMember].damageDealt;
      totaldamage_taken += gGroups[teamMember].damage_taken;
      totalisklost += gGroups[teamMember].iskLost;
    } );
    chartDataIsk.push(['Team '+(teamIdx+1),totalisklost]);
    chartDataDmg.push(['Team '+(teamIdx+1),totaldamageDealt]);
    chartDataDmgRcv.push(['Team '+(teamIdx+1),totaldamage_taken]);
  } );

  //chartDataIsk = convertChartDataToPercent(chartDataIsk);
  //chartDataDmg = convertChartDataToPercent(chartDataDmg);
  //chartDataDmgRcv = convertChartDataToPercent(chartDataDmgRcv);

  var chartData = [];
  chartData.push(chartDataIsk);
  chartData.push(chartDataDmg);
  chartData.push(chartDataDmgRcv);

  return chartData;
}
