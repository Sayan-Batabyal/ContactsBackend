import mongoose from 'mongoose';
const contactSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    }
})

export default mongoose.model("Contact",contactSchema)