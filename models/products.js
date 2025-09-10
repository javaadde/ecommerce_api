import mongoose from 'mongoose';

const proSchema = mongoose.Schema({
    _id:String,
    name:String,
    price:Number,
    category:String,
    url:String,
})

export const products = mongoose.model('products',proSchema)
