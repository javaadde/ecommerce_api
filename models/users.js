import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
     _id:String,
     password:String,
     role:{type:String , default:'user'},
     email:String
})

export const users = mongoose.model('users',userSchema)
