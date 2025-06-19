const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name :{
      type : String ,
      unique : true ,
      required : true 
   },
   email : {
    type : String,
      required : true ,
      unique : true 
   } ,
   phonenumber : {
    type : Number ,
      required : true ,
      unique : true ,
   },
   feedback :{
    type : String ,
   }
});

module.exports = mongoose.model('user' , userSchema);