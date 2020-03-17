const log4js  = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
logger.debug("user controller");
const userModel = require('../models/userModels').users;
const nodemailer = require('nodemailer');
const config = require('../config/config.json');
const fs = require('fs');
const uniqid =  require('uniqid');
const handlebars = require('handlebars');
let templateData = fs.readFileSync('./views/email_template/send_email.hbs', 'utf8')
let template = handlebars.compile(templateData);
const async = require('async');
const passwordHash = require('password-hash');


const transporter = nodemailer.createTransport({ service: 'gmail',
  auth: {
      user: config.EMAIL_ID,
      pass: config.EMAIL_PASSWORD
  }
});







/** singUp function */
function singUp(req, res) {
  logger.info('singup data', req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).send('Please Enter Valid Credentials');
  }else if(!req.body.email && req.body.password){
      res.status(400).send('Please provide valid creadentials!');
  } else {
      const userData = req.body;
      const email = req.body.email;
      async.waterfall([
          function searchUserbyEmailId(callback) {
              const query = { email: email };
              userModel.find(query, function (err, result) {
                  if (result.length <= 0) {
                      return callback(null);
                  } else {
                      let response = { message: "A User with this email id already exists.", success: true }
                      res.status(200).send(response);
                  }
              });
          },
          function createUser(callback) {
              const hashedPassword = passwordHash.generate(userData.password);
              const password = hashedPassword;
              const name = userData.full_name;
              token = uniqid();
              userData.token = token;
              userData.password = password;
              userModel(userData).save().
                  then(function (result) {
                      const reqemail = userData.email;
                      host = req.get('host');
                      const link = "http://" + req.get('host') + "/api/v1/verify/uniquecode" + token;
                      const html = template({
                          data: {
                              url: link,
                              name: name
                          }
                      });
                      const mailOptions = {
                          to: reqemail,
                          subject: 'Please verify your email address',
                          text: 'Verification Email !',
                          html: html
                          /// html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                      }
                      transporter.sendMail(mailOptions, function (error, info) {
                          if (error) {
                              logger.error('error', error);
                          }
                          logger.info('email sent successfully!');
                      })
                      return callback(null, result);
                  }).catch(function (error) {
                      return callback(null, error);
                  });
          }
      ], function (err, result) {
          if (err) {
              return res.status(400).jsonp({ error: err, message: "Error at user creation", status: 'error' });
          } else {
              return res.status(200).jsonp({ data: result, message: "Admin successfully created", status: 'ok' });
          }
      })
  }

}






/** singIN */
async function singIn(req, res) {
  console.log('body', req.body);
  validate(req, res);
  try {
      const { email, password } = req.body;
      let response = await userModel.find({ email: email }, (err, result) => {
          if (result.length == 0) {
              let response = {message:'Entered Email ID is not exists', statusCode :400}
              res.status(400).send(response);
          } else if (result[0].isVerified == false) {
              res.send('acccount is not verified');
          } else {
              const old = result[0].password;
              const enteredPassword = req.body.password;
              let deprecatedpass = passwordHash.verify(enteredPassword, old);
              if (deprecatedpass == true) {
                  const token = jwt.sign({ email: email },
                      configg.secret,
                      {
                          expiresIn: '24h'
                      }
                  );
                  result.authToken = token;
                  adminModel.updateOne({ email: email }, { $set: { 'authToken': token } }, { returnNewDocument: true }, function (err, updatedRes) { });
                  let response = { data: result, message: 'Admin Loggged in Successfully' }
                  res.status(200).send(response);
              } else {
                  res.status(400).send('Please Enter Valid credentials');
              }
          }
      })
  } catch (err) {
      logger.error(err)
  }
}





/** verify function */
function verify(req, res) {
  let uniquecode = req.params.uniquecode;
  const token = uniquecode.substr(10);
  userModel.find({ "token": token }, function (err, success) {
      if (success.length == 0) {
          res.status(400).send('Invalid verification token');
      }
      else if (success[0].isVerified == true) {
          res.status(201).send('Account is already verified');
      }
      else {
          userModel.updateOne({ "token": token }, { $set: { "isVerified": true } }, function (err, result) {
              if (result) {
                  res.status(200).send('Email verification successful');
              }
              else {
                  res.status(400).send('Error while verification')
              }
          })
      }
  })
}







/** 
* validation for input fields 
* */
function validate(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body.email).length === 0 && req.body.email && req.body.password === '') {
      res.status(400).send('Please Enter email and password');
  }

}




/** exports controller */
module.exports.singUp = singUp;
module.exports.singIn = singIn;
module.exports.verify = verify;
