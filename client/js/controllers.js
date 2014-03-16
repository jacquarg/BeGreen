'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {
    $scope.datas = Emission.query();
  }])
  .controller('evolution-temps', ['$scope', 'Emission', function($scope, Emission) {
    $scope.datas = Emission.query();
    $.ajax({
      url: "receiptDetails.json"
    }).success(function (data) {
      var datas = data;
      Morris.Line({
        element: 'graph-analyse',
        data: datas,
        xkey: 'timestamp',
        ykeys: ['family'],
        labels: ['Series A', 'Series B']
      });
    })


  }])
  .controller('mois-courant', ['$scope', 'Emission', function($scope) {

  }]);