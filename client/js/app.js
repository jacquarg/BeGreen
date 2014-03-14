'use strict';


// Declare app level module which depends on filters, and services
angular.module('begreenApp', [
  'ngRoute',
  'begreen.filters',
  'begreen.services',
  'begreen.directives',
  'begreen.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mes-emissions', {templateUrl: 'partials/mes-emissions.html', controller: 'mes-emissions'});
  $routeProvider.when('/analyse', {templateUrl: 'partials/analyse.html', controller: 'analyse'});
  $routeProvider.otherwise({redirectTo: '/mes-emissions'});
}]);
