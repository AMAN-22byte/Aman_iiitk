const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js')
const Problem=require('./models/Problems.js')
const ContestProblem =require('./models/Contestset.js')
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const port = 3000;
DBConnection();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',async (req, res) => {
  try {
    const problems=await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).send("Cannot fetch problems.. Try again later!")
  }  
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
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!(email && password)) {
      return res.status(400).send("All fields are required");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    user.token = token;
    user.password = undefined;

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.post('/set', async (req, res) => {
    try {
        const {Title,Description,Difficulty,Tags,Testcase}=req.body;
        if(!(Title && Description && Difficulty && Tags && Testcase)){
            return res.status(400).send("Please enter all fields")
        }
        const problem = await Problem.create({
            Title,
            Description,
            Difficulty,
            Tags,
            Testcase
        });
        res.status(201).json({ message: "Problem created successfully", problem });

    } catch (error) {
        res.status(500).send("Problem not created");
    }
});
app.post('/contestset', async (req, res) => {
    try {
        const {Title,Description,Contest,Testcase}=req.body;
        if(!(Title && Description && Contest && Testcase)){
            return res.status(400).send("Please enter all fields")
        }
        const contestproblem = await ContestProblem.create({
            Title,
            Description,
            Contest,
            Testcase
        });
        res.status(201).json({ message: "Contest Problem created successfully", contestproblem });

    } catch (error) {
        res.status(500).send("Contest Problem not created");
    }
});


app.get('/api/problems/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const problem = await Problem.findOne({ Title: title });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ message: "Server error" });
  }
});




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
