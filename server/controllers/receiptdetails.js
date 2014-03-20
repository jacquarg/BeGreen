ReceiptDetail = require('../models/receiptdetail')
baseCarbone = require('./baseCarbone')

module.exports.index = function (req, res) {
  res.render('index.ejs', function(err, html) {
      res.send(200, html);
  });
  // res.view('index');
}

module.exports.list = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
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

