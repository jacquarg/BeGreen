/*
* Set the routes of your app here.
*/

ReceiptDetails = require('./receiptdetails');

module.exports = {

    'receiptdetails': {
        get: ReceiptDetails.list
    },

   // 'groupByMonth': {
   //      get: ReceiptDetails.groupByMonth
   //  },

   'lastMonths': {
        get: ReceiptDetails.lastMonths
    },

   'currentMonthDatas': {
        get: ReceiptDetails.currentMonthDatas
    },

   'categoriesThisMonth': {
        get: ReceiptDetails.categoriesThisMonth
    },

    'receiptdetails/:receiptid': {
        get: ReceiptDetails.withReceiptId
      },
};
