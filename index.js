import express from "express";
import dotenv from "dotenv"
import mongoose from 'mongoose';
import cors from 'cors'
import contactRoute from "./routes/contacts.js"
import authRoute from "./routes/auth.js"
const app=express()
dotenv.config()


const connect=async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to Mongo")
  }
   catch (error) {
   throw error;
  }
};

app.use(express.json())
app.use(cors())
app.use("/api/contact",contactRoute)
app.use("/api/auth",authRoute)



app.get("/",(req,res)=>{
    res.send("Welcome to Contact Api")
})


app.listen(8800,()=>{
    connect()
    console.log("Connected to Backend");
})