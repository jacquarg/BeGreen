ReceiptDetail = require('../models/receiptdetail');

module.exports.list = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      // var totalEmissions = [];
      // for (var i = 0; i < instances.length; i++) {
      //   totalEmissions.push(instances[i].emission);
      // };
      // console.log('totalEmissions : ', totalEmissions);
      res.send(200, instances);
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

