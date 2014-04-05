ReceiptDetail = require('../models/receiptdetail');

module.exports.list = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      res.send(200, instances);
    }
  });
};

module.exports.categoriesThisMonth = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {

      var maDate = new Date();
      maDate.setDate(15);
      var maDate = addMonths(maDate, -1);
      var currentMonth = maDate.getFullYear()+'-'+maDate.getMonth();

      var dataArray = [];
      // var date;
      for (var i = 0; i < instances.length; i++) {
        var data = instances[i];
        var dataTimestamp = data.timestamp;
        var dataMonth = dataTimestamp.getFullYear()+'-'+dataTimestamp.getMonth();
        if (dataMonth == currentMonth) {
          dataArray.push(data);
        };
      };

      // groupByCategorie
      function addData (categoriesThisMonth) {
         for (var i = 0; i < categoriesThisMonth.length; i++) {
              if (categoriesThisMonth[i][0] == family) {
                categoriesThisMonth[i][1] += Number(data.emission);
              }
          };
      }

      function findExisitingField (argument) {
        var result = false;
        for (var i = 0; i < categoriesThisMonth.length; i++) {
          if (categoriesThisMonth[i][0] == family) {
            result = i;
          }
        };
        return result;
      }

      var categoriesThisMonth = [];
      for (var i = 0; i < dataArray.length; i++) {
        var data = dataArray[i];
        var family = data.sectionLabel;
        if (findExisitingField() === false) {
          categoriesThisMonth.push([family, 0]);
        };
        addData(categoriesThisMonth);
      };
      res.send(200, categoriesThisMonth);
    }
  });
};


module.exports.lastMonths = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      // addMonths
      function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
      }

      var maDate = new Date();
      maDate.setDate(15);
      var maDate = addMonths(maDate, -5);
      var currentYear = maDate.getFullYear();
      var dateArray = [];
      var date;
      for (var i = 0; i < 6; i++) {
        var month = maDate.getMonth();
        var year = maDate.getFullYear();
        var fullDate = year + '-' + month;
        dateArray.push(fullDate);
        maDate.setMonth(maDate.getMonth() + 1);
      };

      function findDate (fullDate) {
        var index = dateArray.indexOf(fullDate);
        return index
      }

      var lastMonthsDatas = [];
      for (var i = 0; i < instances.length; i++) {
        var data = instances[i];
        var month = data.month;
        var year = data.timestamp.getFullYear();
        var fullDate = year + '-' + month;
        var index = findDate(fullDate);
        if (index != -1) {
          if (lastMonthsDatas[index]) {
            lastMonthsDatas[index] += Number(data.emission) / 1000;
          } else {
            lastMonthsDatas[index] = Number(data.emission) / 1000;
          }
        }
      };
      for (var i = 0; i < lastMonthsDatas.length; i++) {
        var data = lastMonthsDatas[i];
        var value = data.toFixed(2);
        lastMonthsDatas[i] = Number(value);
      };
      res.send(200, lastMonthsDatas);
    }
  });
};

module.exports.currentMonthDatas = function(req, res) {

    ReceiptDetail.request('all', {order: 'timestamp'}, function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {

          function compare(a,b) {
            if (a.timestamp < b.timestamp)
               return -1;
            if (a.timestamp > b.timestamp)
              return 1;
            return 0;
          }

          instances.sort(compare);

          var datas = [];
          var instancesLength = instances.length;
          var limit = instances.length - 30;
          for (var i = instancesLength - 1; i >= limit; i--) {
            datas.push(instances[i])
          };

          res.send(200, datas);
        }
    });
};


module.exports.withReceiptId = function(req, res) {

    ReceiptDetail.withReceiptId(req.params.receiptid, function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
          for (var i = 0; i < instances.length; i++) {
            var family = 'a'+instances[i].family;
            instances[i].emission = baseCarbone[family].empreinteCarbone;
          };

          var totalEmissions = 0;
          for (var i = 0; i < instances.length; i++) {
            totalEmissions += instances[i].emission;
          };
          html = render(instances, totalEmissions);
          res.send(200, html);
        }
    });
};

module.exports.totalOfMounth = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
     var date = new Date();
      var currentMonth = date.getMonth();
      var currentYear = date.getFullYear();
      var currentPeriod = currentYear+'-'+currentMonth;

      totalEmission = 0;
      for (var i = 0; i < instances.length; i++) {
        var data = instances[i];
        var month = data.month;
        var year = data.timestamp.getFullYear();
        var dataPeriod = year+'-'+month;
        if (currentPeriod == dataPeriod) {
          totalEmission += Number(data.emission);
        };
      };
      var totalArray = [];
      totalArray.push(totalEmission)
      res.send(200, totalArray);
    }
  });
};

module.exports.totalForThisMonth = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      var currentPeriod = req.params.date;

      totalEmission = 0;
      for (var i = 0; i < instances.length; i++) {
        var data = instances[i];
        var month = data.month;
        var year = data.timestamp.getFullYear();
        var dataPeriod = year+'-'+month;
        if (currentPeriod == dataPeriod) {
          var value = Number(data.emission) / 1000;
          var roundedValue = value.toFixed(2);
          totalEmission +=  Number(roundedValue);
        };
      };
      var totalArray = [];
      totalArray.push(totalEmission)
      res.send(200, totalArray);
    }
  });
};

module.exports.lastMonthsCategories = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      var indexForLastMonthsCategories;
      var maDate = new Date();
      maDate.setDate(15);
      var maDate = addMonths(maDate, -5);
      var lastMonthsCategories = [];
      var dateArray = [];
      var toPut;
      var fullDate;
      var data;
      var toAdd;
      var index;

      for(var i=0; i<6; i++) {
        fullDate = maDate.getFullYear() + '-' + maDate.getMonth();
        dateArray.push(fullDate);
        maDate.setMonth(maDate.getMonth() + 1);
      };

      for(var i=0; i<instances.length; i++) {
        data = instances[i];
        indexForLastMonthsCategories = findSameCategory(lastMonthsCategories, data.sectionLabel);
        if(indexForLastMonthsCategories === false) {
          toAdd = {
            name: data.sectionLabel,
            data: [0,0,0,0,0,0]
          }
          lastMonthsCategories.push(toAdd);
        }
        index = dateArray.indexOf(data.timestamp.getFullYear()+'-'+data.month);
        if(index != -1) {
          toPut = parseFloat(lastMonthsCategories[indexForLastMonthsCategories].data[index]);
          toPut += parseFloat(data.emission);
          lastMonthsCategories[indexForLastMonthsCategories].data[index] = toPut.toFixed(2);
        };
      };
      res.send(200, lastMonthsCategories);
    }
  });
};

//Add the wanted number of months to the date parameter
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

//Finds the index of the category according to its label,
//otherwise returns false
function findSameCategory(lastMonthsCategories, section) {
  var result = false;
  for (var i=0; i<lastMonthsCategories.length; i++) {
    if (lastMonthsCategories[i].name == section) {
      result = i;
    }
  }
  return result;
}
