'use strict';

/* Filters */

// angular.module('begreen.filters', []).
//   filter('interpolate', ['version', function(version) {
//     return function(text) {
//       return String(text).replace(/\%VERSION\%/mg, version);
//     }
//   }]);

// angular.module('begreen.filters', []).
//     filter('changeMyDate', 'filterFilter', function(filterFilter) {
//         // return function(date, filterFilter) {
//             // return date;
//             return;
//     // };
// });

angular.module('begreen.filters', []).
  filter('changeMyDate', ['$filter',
    function($filter) {
            return function(date, $filter) {
            // return date = $filter('date')('1997-03-01T00:00:00+01:00', 'dd/MM/yyyy');;
            return date = date;
            // return date ? '\u2713' : '\u2718';
        };

  }]);