ReceiptDetail = require('../models/receiptdetail')
baseCarbone = require('./baseCarbone')

module.exports.index = function (req, res) {
  res.render('index.ejs', function(err, html) {
      res.send(200, html);
  });
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

// function render (data) {
//   return '<p>'+data+'</p>'
// };

function render(instances, totalEmissions) {

    receiptDetailsHtml = ''
    for (idx in instances) {
        receiptDetail = instances[idx];
        receiptDetailsHtml +=
'        <div class="col-md-6">\n' +
'          <div class="thumbnail row">\n' +
'            <div class="col-md-2 text-center">\n' +
'              <img class="img-responsive" src="' +
          'http://drive.intermarche.com/ressources/images/produit/vignette/0' + receiptDetail.barcode + '.jpg"/>\n' +
'              <h4>' + receiptDetail.price + ' €</h4>\n' +
'            </div>\n' +
'            <div class="col-md-10">\n' +
                '<h1>'+ receiptDetail.emission+' kg de CO2</h1>\n'+
'              <h4>' + receiptDetail.label + '</h4>\n' +
'              <p>' + receiptDetail.sectionLabel +
           ' &gt; ' + receiptDetail.familyLabel + ' &gt; ' +
          '<small>' + receiptDetail.barcode + '</small></p>\n' +
'              <p>' + receiptDetail.amount + ' X , Le ' + receiptDetail.timestamp.toDateString() + '</p>\n' +
'            </div>\n' +
'          </div>\n' +
'        </div>\n' ;

    }

    header =
'<!DOCTYPE html>\n' +
'<html>\n' +
'  <head>\n' +
'    <meta charset="utf-8">\n' +
'    <title>Mes caddies !</title>\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +

'    <!-- Bootstrap -->\n' +
'    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" media="screen">\n' +
'  </head>\n' +
'  <body>\n' +
'    <div class="container">\n' +
'      <h1>Mes caddies !</h1>\n' +
      '<h1> Total Émissions : '+totalEmissions+' kg de CO2</h1>\n'+
'      <div class="row">\n' ;


    footer =
'      </div>\n' +
'    </div>\n' +

'    <!-- jQuery (necessary for Bootstrap s JavaScript plugins) -->\n' +
'    <script src="http://code.jquery.com/jquery.js"></script>\n' +
'    <!-- Latest compiled and minified JavaScript -->\n' +
'    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n' +
'  </body>\n' +
'</html>\n'


    return header + receiptDetailsHtml + footer ;
}

