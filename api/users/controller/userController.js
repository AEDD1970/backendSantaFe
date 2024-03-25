const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const jwt = require('jsonwebtoken')
const secretKey = require('../../../config').API_SECRET

const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
   

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid e-mail address" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(404).json({ message: "User exist" });
    } else {
      //bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      let userData = new User({
        email: email,
        password: hashPassword,
      });
     await userData.save()
      const jwtToken = await userData.generateJWT();
      console.log(jwtToken)
      res.header('Authorization', jwtToken)
      res.status(201).json({ message: "user Create" });
    }
  } catch (error) {
    res.status(404).json({ message: "Ups! anything went wrong " });
  }
};

const userAuth = async (req, res, next) => {
  try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select({ _id: 0, __v: 0, })
      if(!user){
        return res.status(401).json({ message: "invalid user or password" });
      }
      console.log(user, "user")
      const validatePassword = await bcrypt.compare(password, user.password)
      console.log(validatePassword, "validatePassword")

      if(!validatePassword){
        return res.status(401).json({ message: "invalid user or password" });
      }else{
        const jwtToken = await user.generateJWT();
        res.header('Authorization', jwtToken);
        res.status(200).json({ message: "User data", data: {email: user.email}, token: jwtToken });
      }


    
  } catch (error) {
    console.log(error)
      res.status(400).json({ message: error })
  }
}

module.exports = {
  userRegister,
  userAuth
};
