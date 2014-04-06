begreen.controller('mes-emissions', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {

      var msecPerMinute = 1000 * 60;
      var msecPerHour = msecPerMinute * 60;
      var msecPerDay = msecPerHour * 24;
      var startDate = new Date(2013, 00, 15);
      var currentDate = new Date();
      currentDate.setDate(15);
      var diff = currentDate.getTime() - startDate.getTime();
      var monthsDiff = (Math.floor(diff / msecPerDay)) / 30;
      var dateArray = [];
      var lastMonthsDatas = [];
      for (var i = 0; i < monthsDiff; i++) {
        dateArray.push(startDate.getMonth());
        lastMonthsDatas.push(0);
        startDate.setMonth(startDate.getMonth() + 1);
      };
      var month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      var dateFormatedArray = [];
      for (var i = 0; i < dateArray.length; i++) {
        var index = dateArray[i];
        dateFormatedArray.push(month[index]);
      };
      $.ajax({
          url: "lastMonths"
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
                }],
                min: 0
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