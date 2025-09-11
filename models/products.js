import mongoose from 'mongoose';

const proSchema = mongoose.Schema({
    _id:String,
    name:String,
    price:Number,
    category:String,
    url:String,
},{ timestamp: true })

export const products = mongoose.model('products',proSchema)
