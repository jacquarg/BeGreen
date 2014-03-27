/*
* Set the routes of your app here.
*/

ReceiptDetails = require('./receiptdetails');
Objectifs = require('./objectifs');

module.exports = {

    'receiptdetails': {
        get: ReceiptDetails.list
    },

    'receiptdetails/:receiptid': {
        get: ReceiptDetails.withReceiptId
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

