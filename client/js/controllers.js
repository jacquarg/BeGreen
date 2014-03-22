'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {
    $scope.datas = Emission.query();
    // $scope.index = 1;

    // $scope.itemClicked = function () {
    //   alert('itemClicked');
    //   // $scope.index = index;
    //   console.log('index modifié', index);
    // };
    // $scope.alert = function(text) {
    //   alert(text);
    // };
    // console.log($scope.index);
  }])
  .controller('evolution-temps', ['$scope', 'Emission', function($scope, Emission) {
    // $scope.page = 'analyse';
    // $scope.datas = Emission.query();
    $.ajax({
      url: "/receiptDetails"
    }).success(function (data) {
      var datas = data;
      console.log(datas);
      Morris.Line({
        element: 'graph-analyse',
        data: datas,
        xkey: 'timestamp',
        ykeys: ['emission'],
        labels: ['Series A', 'Series B']
      });
    })


  }])
  .controller('mois-courant', ['$scope', 'Emission', function($scope) {

  }]);