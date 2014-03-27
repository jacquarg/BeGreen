americano = require('americano');
baseCarbone = require('./baseCarbone');


module.exports = ReceiptDetail = americano.getModel('receiptdetail', {
 'origin': String,
 'order': Number,
 'barcode': String,
 'label': String,
 'family': String,
 'familyLabel': String,
 'section': String,
 'sectionLabel': String,
 'amount': Number,
 'price': Number,
 'type': String,
 'typeLabel': String,
 'ticketId': String,
 'intermarcheShopId': String,
 'timestamp': Date,
 'isOnlineBuy': Boolean,

 // custom
 'emission': String,
 'month': Number
 });

ReceiptDetail.all = function(callback) {
    ReceiptDetail.request(
        "all",
        {},
        function(err, instances) {
            callback(null, instances);
        }
    );
};

ReceiptDetail.withReceiptId = function(receiptIdValue, callback) {
    ReceiptDetail.request(
        "byReceiptId",
        {
            key: receiptIdValue

            },
        function(err, instances) {
            callback(null, instances);
        }
    );
};

ReceiptDetail.afterInitialize = function () {
    var family = 'a'+this.family;
    this.emission = baseCarbone[family].empreinteCarbone;

    var date = new Date (this.timestamp);
    this.month = date.getMonth();
}









