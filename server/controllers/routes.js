/*
* Set the routes of your app here.
*/

ReceiptDetails = require('./receiptdetails');

module.exports = {

    '': {
        get: ReceiptDetails.index
    },

    'receiptdetails': {
        get: ReceiptDetails.list
    },

    'receiptdetails/:receiptid': {
        get: ReceiptDetails.withReceiptId
      },
};

