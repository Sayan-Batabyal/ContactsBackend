import express from "express"
const router =express.Router()
import Contact from "../models/Contacts.js"
import jwt from "jsonwebtoken"

//Create

const authoriseUser=(req,res,next)=>{
  const itm = req.headers.authorization;
    if (!itm) {
      return res.status(401).json({ error: 'Not Logged In' });
    }
    const token=itm.split(" ")[1];
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(200).json({ status: 'Invalid Token' });
      }
  
      req.body.owner = user.userId;
      next();
    });
}


router.post("/",authoriseUser,async(req,res)=>{
    
    const newContact = new Contact(req.body) 
    try{
      const savedContact=await newContact.save()
      res.status(200).json(savedContact)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Update
router.put("/:id",async(req,res)=>{
    try{
      const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
      )
      res.status(200).json(updatedContact)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//delete
router.delete("/:id",async(req,res)=>{
    try{
      await Contact.findByIdAndDelete(req.params.id)
      res.status(200).json("Item Deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get

router.get("/:id",async(req,res)=>{
    try{
      const contact=await Contact.findById(
        req.params.id
      )
      res.status(200).json(contact)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//GetAll
router.get("/",authoriseUser,async(req,res)=>{
    try{
      const contacts=await Contact.find({owner:req.body.owner})
      res.status(200).json(contacts)
    }
    catch(err){
        res.status(500).json(err)
    }
})
export default router