const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://yogeshkhinchi2005:Portfolio78@cluster0.fkgjowk.mongodb.net/'

mongoose.connect(mongoUrl);

const db = mongoose.connection ;

//define event listeners on the database connection .

db.on('connected' , ()=>{
    console.log("connected to the mongoose server ");
})

db.on('error' , (err)=>{
    console.log("an error accured " , err)
})

db.on('disconnected' , ()=>{
    console.log("server disconnected");
})

module.exports = db ;