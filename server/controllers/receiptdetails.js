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

// module.exports.groupByMonth = function(req, res) {
//   ReceiptDetail.all(function(err, instances) {
//     if(err != null) {
//       res.send(500, "An error has occurred -- " + err);
//     }
//     else {
//       var dataByMonth = {};
//       var entries = [];
//       for (var i = 0; i < instances.length; i++) {
//         var data = instances[i];
//         var date = new Date (data.timestamp);
//         var key = date.getFullYear() + '-' + date.getMonth();
//         if (dataByMonth[key] === undefined) {
//           dataByMonth[key] = [];
//           dataByMonth[key].push(data);
//           entries.push(key);
//         } else {
//         dataByMonth[key].push(data);
//         }
//       };

//       function groupDatas (datasOfMounth) {
//         for (var i = 0; i < datasOfMounth.length; i++) {
//           var data = datasOfMounth[i];
//           if (classifiedByMonth[key] === undefined) {
//             classifiedByMonth[key] = {};
//             classifiedByMonth[key].total = new Number(data.emission);
//           };
//           // console.log(data.emission);
//           classifiedByMonth[key].total += new Number(data.emission);
//         };
//       }

//       var classifiedByMonth = {};
//       // console.log(entries.length);
//       for (var i = 0; i < entries.length; i++) {
//         var key = entries[i];
//         var datasOfMounth = dataByMonth[key];
//         groupDatas(datasOfMounth)
//       };
//       // classifiedByMonth
//       // console.log(classifiedByMonth);
//       res.send(200, classifiedByMonth);
//     }
//   });
// };

module.exports.categoriesThisMonth = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      var date = new Date();
      var currentMonth = date.getMonth();
      var dataMonth = [];
      for (var i = 0; i < instances.length; i++) {
        data = instances[i];
        if (data.month = currentMonth) {
          dataMonth.push(data);
        };
      };

      // groupByCategorie
      function addData (categoriesThisMonth) {
         for (var i = 0; i < categoriesThisMonth.length; i++) {
              if (categoriesThisMonth[i][0] == family) {
                if (categoriesThisMonth[i][1] === undefined) {
                  console.log('yes', categoriesThisMonth[i][1]);
                  categoriesThisMonth[i][1] = Number(data.emission);
                } else {
                  console.log('no', categoriesThisMonth[i][1]);
                categoriesThisMonth[i][1] += Number(data.emission);
              }
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
      for (var i = 0; i < dataMonth.length; i++) {
        var data = dataMonth[i];
        var family = data.sectionLabel;
        if (findExisitingField() === false) {
          categoriesThisMonth.push([family]);
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

      var maDate = addMonths(new Date(), -5);
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

    ReceiptDetail.all(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
          var date = new Date();
          var month = date.getMonth();
          var year = date.getFullYear();
          var period = year+'-'+month;
          var datas = [];
          for (var i = 0; i < instances.length; i++) {
            var data = instances[i];
            var timestamp = data.timestamp;
            var month = timestamp.getMonth();
            var year = timestamp.getFullYear();
            var dataPeriod = year+'-'+month;
            if (period == dataPeriod) {
              datas.push(data);
            };
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
        console.log(totalEmission);
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
      console.log(currentPeriod);

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


