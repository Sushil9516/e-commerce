 const mongoose = require("mongoose");
const validator = require("validator"); //used for validate email( i.e. given data is mail or not)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");       //building module already exist

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cann't exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true, //Email should not repeat
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, //On get products password never will show
  },

  avatar: {
    //Here we use object because one user can upload only photo
      public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// we cann't use this keyword inside arrow function
userSchema.pre("save", async function(next){                        //pre means this function work before save user on the database 
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token (when user registered by filling all details then he can login)
userSchema.methods.getJWTToken = function (){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET, {                    //this._id id used for payload for the JWT.
    expiresIn:process.env.JWT_EXPIRE,
  })
}

// Compare Password 
 userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);      //this.password means stored hash password 
 }


// Generating token on reset password
userSchema.methods.getResetPasswordToken = function (){
   //Generating token 
   const resetToken = crypto.randomBytes(20).toString("hex");        //"hex are used to convert buffer value"

   //Hashing and add to userSchema
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");     //resetPasswordToken is not saved into the database yet

   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;      //15 days time

   return resetToken;
}

module.exports = mongoose.model("User", userSchema);
