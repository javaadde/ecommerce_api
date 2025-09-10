import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    _id:String,
    items:Array,
    subtotal:Number,
})

export const cart = mongoose.model('cart', cartSchema);