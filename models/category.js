import mongoose from 'mongoose';

const categorySchema = {
    _id:String,
    discription:String,
}

export const category = mongoose.model('categories', categorySchema);