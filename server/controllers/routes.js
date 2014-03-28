/*
* Set the routes of your app here.
*/

ReceiptDetails = require('./receiptdetails');
Objectifs = require('./objectifs');

module.exports = {

    'receiptdetails': {
        get: ReceiptDetails.list
    },

   // 'groupByMonth': {
   //      get: ReceiptDetails.groupByMonth
   //  },

   'totalForThisMonth/:date': {
        get: ReceiptDetails.totalForThisMonth
    },

   'lastMonths': {
        get: ReceiptDetails.lastMonths
    },

   'lastMonthsCategories': {
        get: ReceiptDetails.lastMonthsCategories
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

    'totalOfMounth': {
        get: ReceiptDetails.totalOfMounth
    },

    'objectifs': {
    	get: Objectifs.list
    },

    'objectifs/add': {
    	get: Objectifs.add
    },

    'objectifs/deleteAll': {
    	get: Objectifs.deleteAll
    },

    'objectifs/update': {
    	get: Objectifs.updateObj
    },

    'objectifs/findOne': {
    	get: Objectifs.findOneObjectif
    },

    'objectifs/findLatest': {
    	get: Objectifs.findLatest
    }

};
