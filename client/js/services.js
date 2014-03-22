'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
// angular.module('begreen.services', [])
//     .factory('Emission', ['$resource',
//       function($resource){
//         return $resource('http://localhost:9250/receiptdetails/', {}, {
//           query: {method:'GET', params:{}, isArray:true}
//         });
//   }]);


var begreenServices = angular.module('begreen.services', ['ngResource']);

begreenServices.factory('Emission', ['$resource',
  function($resource){
    return $resource('/receiptdetails', {}, {
      query: {method:'GET', params:{}, isArray:true}
    })
  }]);