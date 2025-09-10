// mongoose
import mongoose from 'mongoose';

// dotenv 
import dotenv from 'dotenv';
dotenv.config()
const dbURI = process.env.dbURI

// connnecting 
export async function dbConnect(){
    await mongoose.connect(dbURI);
    console.log('connected to database');
}