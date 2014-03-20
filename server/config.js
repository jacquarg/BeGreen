var americano = require('americano');

module.exports = {
    common: {
        use: [
          americano.bodyParser(),
          americano.methodOverride(),
          americano.errorHandler({
              dumpExceptions: true,
              showStack: true
          }),
          americano.static(__dirname + '/../client', {
              maxAge: 86400000
          }),
        ],
        set: {
          views:  __dirname + '/../client',
        },
        engine: {
          '.html': require('ejs').__express,
        },
    },
    development: [
        americano.logger('dev')
    ],
    production: [
        americano.logger('short')
    ],
    plugins: [
        'americano-cozy'
    ]
};