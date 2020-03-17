const Router   = require('router')
const router = Router();
const productController = require("../controller/productController");
const userController = require('../controller/userController');





/** initiating routes */
router.post('/singup',  userController.singUp);
router.post('/singin',  userController.singIn);
router.get('/verify/:uniquecode', userController.verify);


/** products */
router.post('/product/create', productController.createProduct);
router.post('/product/delete', productController.deleteProduct);




/**exports routes*/
module.exports = router;
