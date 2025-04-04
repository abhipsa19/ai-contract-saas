import dotenv from "dotenv"
dotenv.config();

import express from "express";
import "./config/passport"
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose"
import morgan from "morgan"
import passport from "passport"
import session from "express-session"
import MongoStore from "connect-mongo"


// routes
import authRoute from "./routes/auth";

const app =express();


mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to Mongodb'))
  .catch((err: unknown) => console.log(err));


  
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL!
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite : process.env.NODE_ENV === "production"? "none":"lax",
    maxAge: 24*60*60*1000, //24 hrs
  },

}))


app.use(passport.initialize());
app.use(passport.session());


app.use("/auth",authRoute);


const PORT = 8080;

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
})

