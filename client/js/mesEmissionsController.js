begreen.controller('mes-emissions', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {


// Use Morris.Area instead of Morris.Line
$(document).ready(function() {
  $(window).resize(function() {
    window.m.redraw();
  });
});

function barChart() {
  // var year_data = [
  //   {"period": "2012", "licensed": 3407, "sorned": 660},
  //   {"period": "2011", "licensed": 3351, "sorned": 629},
  //   {"period": "2010", "licensed": 3269, "sorned": 618},
  //   {"period": "2009", "licensed": 3246, "sorned": 661},
  //   {"period": "2008", "licensed": 3257, "sorned": 667},
  //   {"period": "2007", "licensed": 3248, "sorned": 627},
  //   {"period": "2006", "licensed": 3171, "sorned": 660},
  //   {"period": "2005", "licensed": 3171, "sorned": 676},
  //   {"period": "2004", "licensed": 3201, "sorned": 656},
  //   {"period": "2003", "licensed": 3215, "sorned": 622}
  // ];
  console.log('scoooope.datas', $scope.datas);
  window.m = Morris.Line({


  // Morris.Line({
    element: 'graph-mes-emissions',
    data: $scope.datas,
    xkey: 'timestamp',
    ykeys: ['emission'],
    labels: ['emission']
  });
}

  barChart();

// $(window).on('resize', function() { drawGraph();});

      // $('#graph-mes-emissions').highcharts({
      //       title: {
      //           text: 'Vos émissions de CO2',
      //           x: -20 //center
      //       },
      //       xAxis: {
      //           categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin',
      //               'Juil', 'A@', 'Sep', 'Oct', 'Nov', 'Dec']
      //       },
      //       yAxis: {
      //           title: {
      //               text: 'Émissions (kg CO2)'
      //           },
      //           plotLines: [{
      //               value: 0,
      //               width: 1,
      //               color: '#808080'
      //           }]
      //       },
      //       tooltip: {
      //           valueSuffix: 'kg CO2'
      //       },
      //       legend: {
      //           layout: 'vertical',
      //           align: 'right',
      //           verticalAlign: 'middle',
      //           borderWidth: 0
      //       },
      //       series: [{
      //           name: 'Tokyo',
      //           data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      //       }]
      //   });
    // });
  }]);