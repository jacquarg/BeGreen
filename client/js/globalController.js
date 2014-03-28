'use strict';

/* Controllers */
var begreen = angular.module('begreen.controllers', []);


begreen.controller('global', ['$scope', '$location', 'Emission', 'TotalEmission', function($scope, $location, Emission, TotalEmission) {

    $scope.currentMonthDatas = Emission.query();

    // dateNow
    $scope.dateNow = new Date();

    // total emission
    $.ajax({
      url: "totalOfMounth"
    }).success(function (data) {
        $scope.totalEmission = Number(data[0]) / 1000;
        $scope.totalEmission = $scope.totalEmission.toFixed(2);
    })

    $('#achats-link').on('click', function (e) {
        e.preventDefault();
    })
}]);