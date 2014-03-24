'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('global', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {
        $.ajax({
          url: "/receiptDetails"
        }).success(function (data) {
            $scope.datas = data;
            console.log($scope.datas);
            var datas = $scope.datas;

            // total emission
            $scope.totalEmission = 0;
            for (var i = 0; i < $scope.datas.length; i++) {
                var data = $scope.datas[i];
                $scope.totalEmission += Number(data.emission);
            };
            $scope.totalEmission = $scope.totalEmission.toFixed(2);

            // currentMonth
            $scope.dateNow = new Date();
        });
    }]).
  controller('menu', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {
    $scope.navLinks = [{
        Title: 'mes-emissions',
        LinkText: 'Mes émissions',
    }, {
        Title: 'analyse/evolution-temps',
        LinkText: 'Analyse'
    }, {
        Title: 'objectifs',
        LinkText: 'Objectifs'
    }, {
        Title: 'conseils',
        LinkText: 'Conseils'
    }];
    console.log($location.path().substring(1));
    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };

  }]).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {

    console.log($scope.datas);
    var datas = $scope.datas;
    var currentMonthDatas = [];
    var newDate = new Date()
    var currentMonth = newDate.getMonth();

    console.log('currentMonth : ', currentMonth);
    for (var i = 0; i < datas.length; i++) {
        var data = datas[i];
        var dataTimestamp = new Date(data.timestamp);
        var dataMonth = dataTimestamp.getMonth();
        if (dataMonth == currentMonth) {
            currentMonthDatas.push(data);
        };
    };
    $scope.currentMonthDatas = currentMonthDatas;
// Use Morris.Area instead of Morris.Line
$(document).ready(function() {
  $(window).resize(function() {
    window.m.redraw();
  });
});

function barChart() {

  window.m = Morris.Bar({

    element: 'graph-mes-emissions',
    data: [
      { y: '0.10', a: 93, b: 50, c: 23, d: 42, e: 10, f: 23 },
      { y: '0.20', a: 75,  b: 65 },
      { y: '0.30', a: 50,  b: 40 },
      { y: '0.40', a: 75,  b: 65 },
      { y: '0.50', a: 50,  b: 40 },
      { y: '0.60', a: 75,  b: 65 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b', 'c', 'd', 'e', 'f'],
    labels: ['C', 'C#', 'C++', 'Java', 'Python 2', 'Python 3'],
    gridTextColor: '#898992',
    barColors: ['#4F89DB', '#333A92', '#5D57BA', '#2F1360', '#620F8B', '#872FB0'],
    stacked: true,
    hideHover: 'auto',
    resize: true,
    redraw: true

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
  }])
  .controller('evolution-temps', ['$scope', 'Emission', function($scope, Emission) {
  $('#graph-analyse').highcharts({
        title: {
            text: 'Vos émissions de CO2',
            x: -20 //center
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Émissions (kg CO2)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'kg CO2'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }]
    });

  }])
  .controller('mois-courant', ['$scope', 'Emission', function($scope) {

  }]);