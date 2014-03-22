'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
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
    $scope.datas = Emission.query();
    // var datas = $scope.datas;
    // console.log(datas)
    $.ajax({
      url: "/receiptDetails"
    }).success(function (data) {
      console.log(data);
      $('#graph-mes-emissions').highcharts({
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
            series: ['1,2,3,4']
        });
    });
  }])
  .controller('evolution-temps', ['$scope', 'Emission', function($scope, Emission) {
    // $scope.page = 'analyse';
    $scope.datas = Emission.query();
    $.ajax({
      url: "/receiptDetails"
    }).success(function (data) {
      var datas = data;
      Morris.Line({
        element: 'graph-analyse',
        data: datas,
        xkey: 'timestamp',
        ykeys: ['family'],
        labels: ['Series A', 'Series B']
      });
    });



  }])
  .controller('mois-courant', ['$scope', 'Emission', function($scope) {

  }]);