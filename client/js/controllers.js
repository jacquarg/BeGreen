'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {
    $scope.datas = Emission.query();
  }])
  .controller('evolution-temps', [function($scope) {

  }])
  .controller('mois-courant', [function($scope) {

  }]);