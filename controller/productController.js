const log4js  = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("product controller");
const productModel = require('../models/productsModels').product;








/** create product */
// TODO:  pro id validate, check existing 
async function createProduct(req, res){
    try {
        const reqBody = req.body;
        const result = await productModel(reqBody).save(); 
        let response = {"message" : "propducts has been added", data: result, status:true}
        res.status(200).send(response);
      } catch (err) {
        logger.error('Http error', err);
        if (err.name == 'ValidationError') {
            res.status(422).json(err);
        } else {
            res.status(500).json(err);
        }
      }
     }
 
 
     
 
 /** Delete product */
 async function deleteProduct(req, res){
     if(!req.body.pro_id){
         res.status(400).send('Please Enter valid Product_id');
     }else{
        const pro_id = req.body.pro_id;
        logger.info('deleting product by id', pro_id);
        const products =await productModel.findOneAndDelete({p_id:pro_id});
        console.log('check if exist or not', products);   
         if(products){
            res.send(`product has been deleted successfullly!`); 
         }else{
            res.status(400).send('product id not exist');
         }   
     } 
 }
 
 
 /** update product by ID */

 async function updateProduct(req, res){
           logger.info('updatinf product id', pro)
           const pro_id = req.body.pro_id;

 }





module.exports.createProduct =createProduct;
module.exports.deleteProduct =deleteProduct;
module.exports.updateProduct =updateProduct;