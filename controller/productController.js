const log4js  = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("product controller");
const productModel = require('../models/productsModels').product;








/** create product */
async function createProduct(req, res){
    try {
        const reqBody = req.body;
        const response = await productModel(reqBody).save(); 
        console.log('result', result);
        return response;
      } catch (err) {
        logger.error('Http error', err);
        if (err.name == 'ValidationError') {
            console.error('Error Validating!', err);
            res.status(422).json(err);
        } else {
            console.error(err);
            res.status(500).json(err);
        }
      }
     }
 
 
     
 
 /** Delete product */
 function deleteProduct(req, res){
     logger.info('deleting product');
     res.send('deleting products by id');
 
 }
 
 




module.exports.createProduct =createProduct;
module.exports.deleteProduct =deleteProduct;
