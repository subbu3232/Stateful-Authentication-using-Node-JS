const mongoose=require("mongoose");

const LoginSchema=new mongoose.Schema({
email:String,
password:String

})

const LoginModel=mongoose.model("details",LoginSchema);

module.exports = LoginModel;
