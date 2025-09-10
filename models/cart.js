import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    _id: String,
    items: Array,
    subtotal: Number,
}, { timestamp: true })

export const cart = mongoose.model('cart', cartSchema);