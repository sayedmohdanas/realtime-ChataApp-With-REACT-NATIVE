const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
  .connect("mongodb+srv://sayedmohdanas0:anas@cluster0.zqxe0zn.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error to Connect DataBase", err);
  });
app.listen(port, () => {
  console.log("Server is Running on port 8000");
});

const User = require("./models/user");
const Message = require("./models/message");
////register api
app.post("/register", async (req, res) => {

  const { name, password, image, email } = req.body;
  if (!name || !password || !email) {
    return res.send({ msg: "please fil all required field  " });
  }
  const chseckUseralreadyExists= await User.findOne({email})
  if(chseckUseralreadyExists){
    return res.status(403).send({msg:"Account Already Exists"})
  }

  const user = await User.create({
    name: name,
    password: password,
    email: email,
    image: image,
  });
  res.send({ msg: "Account  created", data: user });
});

//function create token based on user id 
  const createToken = async (userId) => {
    console.log("calllllll")
      ///set the token PayLoad
    try {
      const payload = {
        userId: userId
      };
       ///genrate the token with secret ki and time limit
      const token = jwt.sign(payload, "Q$r2k6Wedwb!jj", { expiresIn: "1hr" });
      return token;
    } catch (error) {
      throw new Error("Token generation error");
    }
    
  };
  


///////login api
  app.post("/loginUser", async (req, res) => {
    console.log("entr")
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(403).send({ msg: "Please fill in all required fields" });
    }
  
    const checkUserExist = await User.findOne({ email });
  
    if (!checkUserExist) {
      return res.status(403).send({ msg: "User does not exist" });
    }
  
    if (password !== checkUserExist.password) {
      return res.status(403).send({ msg: "Invalid password" });
    }
  
    try {
      const token = await createToken(checkUserExist._id);
      return res.status(200).json({ token, msg: "Login successful"}); // Send response here
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  });

  ///endpoint to accesss all the user except  the who is currently login 
  app.get("/users/:userId", async(req,res)=>{
    console.log("entred")
    const loginUserData=req.params.userId
    try {
      const allUser=await User.find({_id:{$ne:loginUserData}})
    res.status(200).json({allUser,msg:"All user here"})
      
    } catch (error) {
      res.status(500).json({msg:"Error retriving users"})
      
    }
  })
  ///end point send a request to a user
  app.post("/friend-request",async(req,res)=>{
    const {currentUserId,selectedUserId}=req.body;
    console.log('sender',currentUserId,'recever', selectedUserId)
    try {
      /////update the recever friendRequestArray

      await User.findByIdAndUpdate(selectedUserId,{
        $push:{
          friendRequest:currentUserId
        }
      })
      ////update sender sendFriendRequest Array
      await User.findByIdAndUpdate(currentUserId,{
        $push:{
          sentFriendRequests:selectedUserId
        }
      })
      res.status(200).send({msg:"Request Sent Successfully"})
      
    } catch (error) {
      res.status(500).send({msg:"Internal Server Error"})
    }
  })

  
