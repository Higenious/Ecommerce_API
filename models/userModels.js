const mongoose =  require('mongoose');
const timestamps = require('mongoose-timestamp');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;


let users = new Schema({
  name : {type:String, maxlength:20},
  email : {type:String, required:true,  unique: true},
  city : {type:String, required:true},
  role : {type:String, enum : ['Admin','SuperAdmin', 'customer'], default: 'customer'},
  mobile : {type:Number, maxlength:10,  unique: true},
  password : {type: String, required:false},
  token : {type:String},
  authToken : {type:String},
  isVerified : {type: Boolean, default: false}
});users.plugin(timestamps);






/**exporting modules */
module.exports.users = mongoose.model('users', users);
