import express from "express"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router =express.Router()
import User from "../models/User.js"

//Create
router.post("/register",async(req,res)=>{
    try{
    const existUser = await User.findOne({ email:req.body.email });
      if (existUser) {
        return res.status(200).json({ status: 'User Exists' });
      }

    const pass=await bcrypt.hash(req.body.pass,10);

    const newUser = new User({
        email:req.body.email,
        pass
    }) 
   

    
      const savedUser=await newUser.save()
      res.status(200).json({status:"success",savedUser})
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Login
router.post("/login", async(req,res)=>{

    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
           return  res.status(200).json({status:"User Not Found"})
      }

        if(!bcrypt.compare(req.body.pass,user.pass)){
            return res.status(200).json({ status: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({token});  
    }
    catch(err){
        res.status(500).json(err)
    }

})


//GetAll
router.get("/",async(req,res)=>{
    try{
      const user=await User.find()
      res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})
export default router