const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const User = require('./models/user');
const db = require('./db');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.post('/user' ,async (req , res)=>{
   try {
     let {name , email , phonenumber , feedback } = req.body;

      const user = await User.create({
                  name ,
                  email ,
                  phonenumber : Number(phonenumber),
                  feedback
             });
             await user.save();
             res.status(200);
             res.send(user);

   }catch(err){

   }
})

app.listen(4000 , (req , res )=>{
    console.log("app listening on port 4000 ");
    console.log("https://portfolio-1-9o90.onrender.com");
})