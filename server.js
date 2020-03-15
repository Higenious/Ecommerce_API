const express = require('express');
const app = express();
const port  = 5000;
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("server");
const router = require("./router/router")
const db = require('./dbconn/dbConnection')


/** index  */
app.get('/', (req, res)=>{
    logger.info('Ecommerce api');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/** import all routes */
logger.info("routes  initializing");
app.use('/api/v1', router); 


/** listen server */
app.listen(port,()=>{
    logger.info(`server successfully started running on ${port}`);
})