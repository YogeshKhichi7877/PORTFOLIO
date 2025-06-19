const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/Portfolio' ;

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