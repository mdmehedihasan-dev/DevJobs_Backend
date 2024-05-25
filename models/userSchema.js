import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
      },
      email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
      },
      phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
      },
      password: {
        type: String,
        required: [true, "Please provide a Password!"],
        minLength: [6, "Password must contain at least 6 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
      },
      role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job Seeker", "Employer"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

// hasing password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

// comparing password 
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password)
}

// jwt authorization 
userSchema.methods.getJwtToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRE
  })
}

export const User = mongoose.model("User",userSchema)