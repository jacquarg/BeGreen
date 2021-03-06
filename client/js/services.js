'use strict';

/* Services */

var begreenServices = angular.module('begreen.services', ['ngResource']);

begreenServices.factory('Emission', ['$resource',
  function($resource){
    return $resource('currentMonthDatas', {}, {
      query: {method:'GET', params:{}, isArray:true}
    })
  }]);

begreenServices.factory('TotalEmission', ['$resource',
  function($resource){
    return $resource('totalOfMounth', {}, {
      query: {method:'GET', params:{}, isArray:true}
    })
  }]);