const express = require('express');
const path = require('path');
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

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create download route
app.get('/download-cv', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'cv', 'yogeshCV.pdf');
  res.download(filePath, 'YOGESH_CV.pdf'); // Custom filename for download
});


app.listen(4000 , (req , res )=>{
    console.log("app listening on port 4000 ");
    console.log("https://portfolio-1-9o90.onrender.com");
})