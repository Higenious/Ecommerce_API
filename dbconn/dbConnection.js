const log4js  = require ('log4js');
const mongoose = require('mongoose')
const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("datbase Connection");
const url = 'mongodb://127.0.0.1:27017/Ecommerce';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function (err, result) {
    if (!err) {
        logger.info('successfully conneted to database!');
    } else {
        logger.error('Could not connect to the database. Exiting now...', err);

    }
});