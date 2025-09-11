import express from 'express'
const app = express()

// mongo-connect
import MongoStore from 'connect-mongo'

// env configure
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT;
const dbURI = process.env.dbURI;

// session
import session from 'express-session'
app.use(session({
     
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }),
    
}))


// routers
import {signUpRouter} from './routes/signUp.js';
import {signInRouter} from './routes/signIn.js';
import { productsRouter } from './routes/products.js';
import { adminRouter } from './routes/admin.js';
import { cartRouter } from './routes/cart.js';
import { ordersRouter } from './routes/orders.js';
import { detailsRouter } from './routes/details.js';


app.use('/details',detailsRouter)
app.use('/order',ordersRouter);
app.use('/cart',cartRouter);
app.use('/admin',adminRouter);
app.use('/products',productsRouter);
app.use('/signin',signInRouter);
app.use('/signup',signUpRouter);


app.use((req,res) => {
    res.status(404)
    res.json({
        message:'page not fount'
    })
})

//  connect to database
import { dbConnect } from './db/db.js'
dbConnect();


// server
app.listen(PORT,()=>{
    console.log(`app listening on port: http://localhost:${PORT}`);
})