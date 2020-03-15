const userModel = require('../models/userModels').users;



async function checkUser(data, successData, errorData) {
    const emailId = data.email;
    const role = data.role;
    const Userdata = await userModel.find({ email: emailId, role:role});
    if (!Userdata.length == 0) {
        const password = Userdata[0].password;
        if (password == data.password) {
            successData(Userdata);
        } else {
           successData();
        }
    } else {
           successData();
    }
}





module.exports.checkUser = checkUser;