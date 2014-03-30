begreen.controller('evolution-temps', ['$scope', '$location', 'Emission', function($scope, $location, Emission) {

function addMonths(date, months) {
date.setMonth(date.getMonth() + months);
return date;
}

var maDate = addMonths(new Date(), -5); // six months before now
maDate.setDate(15);
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
    url: 'lastMonthsCategories'
}).success(function (data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i].data;
        for (var j = 0; j < item.length; j++) {
            item[j] = parseFloat(item[j]);
        };
    };
      $('#graph-analyse').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: dateFormatedArray,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Kg'
            },
            labels: []
        },
        tooltip: {
            shared: true,
            valueSuffix: ' grammes'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: data
        });
    })
}]);
