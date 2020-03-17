const mongoose =  require('mongoose');
const timestamps = require('mongoose-timestamp');
const joi = require('joi');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;


let product = new Schema({
  product_name : {type:String,
    minlength: [2, 'Username must be at least 2 characters.'],
    maxlength: [20, 'Username must be less than 20 characters.'],
    required: [true, 'Your username cannot be blank.'],


},
  p_id : {type:String},
  
  category : {type:String},
  price : {type :Number,required :true},
  quntity :{type :Number},
  attributes:{} 
});product.plugin(timestamps);






/**exporting modules */
module.exports.product = mongoose.model('product', product);
