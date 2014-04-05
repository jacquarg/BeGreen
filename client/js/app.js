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
  $routeProvider.when('/analyse/evolution-temps', {templateUrl: 'partials/evolution-temps.html', controller: 'evolution-temps'});
  $routeProvider.when('/analyse/mois-dernier', {templateUrl: 'partials/mois-dernier.html', controller: 'mois-dernier'});
  $routeProvider.when('/analyse/objectifs', {templateUrl: 'partials/objectifs.html', controller: 'objectifs'});
  $routeProvider.when('/a-propos', {templateUrl: 'partials/a-propos.html', controller: 'a-propos'});
  $routeProvider.otherwise({redirectTo: '/mes-emissions'});
}]);
