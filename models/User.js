import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }

})

export default mongoose.model("User",UserSchema)