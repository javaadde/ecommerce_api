import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
     _id:String,
     password:String,
     role:{type:String , default:'user'},
     email:String,
     active:{type:Boolean, default:true}
},{ timestamp: true })

export const users = mongoose.model('users',userSchema)
