'use strict';

/* Controllers */
var begreen = angular.module('begreen.controllers', []);


begreen.controller('global', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {

    $scope.currentMonthDatas = Emission.query();

    // dateNow
    $scope.dateNow = new Date();

    // total emission
    $.ajax({
      url: "/totalOfMounth"
    }).success(function (data) {
        $scope.totalEmission = data[0];
        $scope.totalEmission = $scope.totalEmission.toFixed(2);
    })
}]);