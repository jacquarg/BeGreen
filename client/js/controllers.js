'use strict';

/* Controllers */

angular.module('begreen.controllers', []).
  controller('mes-emissions', ['$scope', 'Emission', function($scope, Emission) {
    // $scope.datas = $.ajax({
    //     url: "http://localhost:9250/receiptdetails/",
    //     type: 'get',
    //     dataType: "jsonp"
    // }).success(function(data) {
    //     console.log('heloo');
    // }).error(function (error) {
    //     console.log(error);
    // })

    // $scope.datas = Emission.query();
    $scope.datas = Emission.query();
    // console.log(da=tas);
    // $scope.datas = function (datas) {
    //   keys = [],
    //   data, i, len;

    //   for (data in datas)
    //   {
    //     if (datas.hasOwnProperty(data))
    //     {
    //       keys.push(data);
    //   }
    //   keys.sort();
    //   }

    //   keys.sort();
    //   console.log(keys);
    // }
  //   {
  //       'b': 'asdsadfd',
  //       'c': 'masdasaf',
  //       'a': 'dsfdsfsdf'
  //   },
  //   keys = [],
  //   data, i, len;

  // for (data in datas)
  // {
  //     if (datas.hasOwnProperty(data))
  //     {
          // keys.push(data);
      // }
  // }

  // keys.sort();
// len = keys.length;

// for (i = 0; i < len; i++)
// {
//     data = keys[i];
//     alert(data + ':' + myObj[data]);
// }
// console.log(keys);
  //   $scope.datas = [{
  //   "origin": "IntermarchÃ©",
  //   "order": 11,
  //   "barcode": "3410280010502",
  //   "label": "TOP BUDGET COULOMMIERS 350G",
  //   "family": "3002",
  //   "familyLabel": "FROMAGE LS",
  //   "section": "30",
  //   "sectionLabel": "CREMERIE LS",
  //   "amount": 1,
  //   "price": 1.4,
  //   "type": "0",
  //   "typeLabel": "Article",
  //   "intermarcheShopId": "4800",
  //   "timestamp": "2013-03-02T11:00:00.000Z",
  //   "isOnlineBuy": false,
  //   "id": "3aad8c3d26fdd2d0ba06355b5400431a"
  // },
  // {
  //   "origin": "IntermarchÃ©",
  //   "order": 7,
  //   "barcode": "3250390803768",
  //   "label": "DOMEDIA LOT 2 PROT.DOCS A4",
  //   "family": "6070",
  //   "familyLabel": "CLASSEMENT",
  //   "section": "60",
  //   "sectionLabel": "BAZAR LEGER",
  //   "amount": 1,
  //   "price": 4.8,
  //   "type": "0",
  //   "typeLabel": "Article",
  //   "intermarcheShopId": "10143",
  //   "timestamp": "2013-02-04T11:00:00.000Z",
  //   "isOnlineBuy": false,
  //   "id": "3aad8c3d26fdd2d0ba06355b54004bfa"
  // }]
  }])
  .controller('analyse', [function() {

  }]);