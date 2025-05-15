const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')

const port = 3000;
DBConnection();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello, Aman!');
  
});
app.post('/register',async(req,res)=>{
    // res.send("Register Page")
    // get all data from frontend
    try {
        const {firstname, lastname,email,password}=req.body;

    //check data entered correctly
    if(!(firstname && lastname && email && password)){
        return res.status(400).send("Please enter all fields")
    }
    // validations can be done here:.....

    //check if user already exist
    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).send("User already exist")
    }

    //hashing password:
    const hashPassword = await bcrypt.hash(password, 10);

    //save user in db:
    const user = await User.create({
        firstname,
        lastname,
        email,
        password:hashPassword
    });

    //generate token:
    const token = jwt.sign({id:user._id,email},process.env.JWT_SECRET_KEY,{
        expiresIn:"1h",
    });
    user.token = token;
    user.password = undefined ;
    res.status(200).json({message: "User registered successfully"})
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
