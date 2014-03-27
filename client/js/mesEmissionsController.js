begreen.controller('mes-emissions', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {

      $scope.currentMonthDatas = Emission.query();

      function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
      }

      var maDate = addMonths(new Date(), -5); // six months before now
      var dateArray = [];
      var date;
      for (var i = 0; i < 6; i++) {
        var index = maDate.getMonth();
        dateArray.push(index);
        maDate.setMonth(maDate.getMonth() + 1);
      };
      var month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      var dateFormatedArray = [];
      for (var i = 0; i < dateArray.length; i++) {
        var index = dateArray[i];
        dateFormatedArray.push(month[index]);
      };
      $.ajax({
          url: "/lastMonths"
        }).success(function (data) {
        $('#graph-mes-emissions').highcharts({
            title: {
                text: '',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: dateFormatedArray
            },
            yAxis: {
                title: {
                    text: 'Émissions de CO2 (kg CO2)',
                    style: {
                        color: '#4ab56f',
                        fontWeight: 'bold'
                      }
                },

                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#4ab56f'
                }]
            },
            tooltip: {
                valueSuffix: 'kg CO2'
            },
            colors: [
              '#4ab56f'
            ],
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Émissions de CO2',
                data: data
            }]
        });
      });
  }]);