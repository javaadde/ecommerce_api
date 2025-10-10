import express from "express";
import { dbConnect } from "./db/db.js";
import MongoStore from "connect-mongo"; // mongo-connect
import dotenv from "dotenv"; // env configure
import session from "express-session"; // session
import cors from "cors";

// routers
import { signUpRouter } from "./routes/signup.js";
import { signInRouter } from "./routes/signin.js";
import { productsRouter } from "./routes/products.js";
import { adminRouter } from "./routes/admin.js";
import { cartRouter } from "./routes/cart.js";
import { ordersRouter } from "./routes/orders.js";
import { detailsRouter } from "./routes/details.js";
import { categoryRouter } from "./routes/category.js";
import { IsLogined } from "./controllers/app.js";

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
  "https://ecommerce-frontend-react-flame.vercel.app",
  "https://ecommerce-frontend-react-tau.vercel.app",
  "https://javad-react.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // must be false on localhost (no https)
      sameSite: "lax", // try "lax" first, then "none" if cross-site
    },
    store: MongoStore.create(
      { mongoUrl: MONGO_URL },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        tls: true,
      }
    ),
  })
);

app.get("/", IsLogined);

app.use("/category", categoryRouter);
app.use("/details", detailsRouter);
app.use("/order", ordersRouter);
app.use("/cart", cartRouter);
app.use("/admin", adminRouter);
app.use("/products", productsRouter);
app.use("/signin", signInRouter);
app.use("/signup", signUpRouter);

app.use((req, res) => {
  res.status(404);
  res.json({
    message: "page not fount",
  });
});

dbConnect(); //  connect to database

// server
app.listen(PORT, () => {
  console.log(`app listening on port: http://localhost:${PORT}`);
});
