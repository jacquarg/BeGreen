'use strict';

/* Controllers */
var begreen = angular.module('begreen.controllers', []);


begreen.controller('global', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {
        $.ajax({
          url: "/receiptDetails"
        }).success(function (data) {
            $scope.datas = data;
            console.log($scope.datas);
            var datas = $scope.datas;


            // dateNow
            $scope.dateNow = new Date();

            // currentMonthDatas
            console.log($scope.datas);
            var datas = $scope.datas;
            var currentMonthDatas = [];
            var newDate = new Date()
            var currentMonth = newDate.getMonth();

            console.log('currentMonth : ', currentMonth);
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var dataTimestamp = new Date(data.timestamp);
                var dataMonth = dataTimestamp.getMonth();
                if (dataMonth == currentMonth) {
                    currentMonthDatas.push(data);
                };
            };
            console.log('currentMonthDatas : ', currentMonthDatas);
            $scope.currentMonthDatas = currentMonthDatas;

            // total emission
            $scope.totalEmission = 0;
            for (var i = 0; i < currentMonthDatas.length; i++) {
                var data = currentMonthDatas[i];
                $scope.totalEmission += Number(data.emission);
            };
            $scope.totalEmission = $scope.totalEmission.toFixed(2);
            console.log('$scope.totalEmission : ', $scope.totalEmission);
          });
    }]);