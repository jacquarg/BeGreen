'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {
    $scope.datas = Emission.query();
  }])
  .controller('analyse', [function() {

  }]);