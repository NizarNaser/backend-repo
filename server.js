import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import catRouter from "./routes/catRoute.js";

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compression from "compression";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//app config
const app =express()
const port =process.env.PORT 
app.use(compression()); // ضغط الملفات لتحسين الأداء
//middeleware
app.use(express.json())
// ✅ السماح فقط لموقع GitHub Pages
const allowedOrigins = [
  "http://localhost:5173",
  "https://dubai-restaurant-karaoke-bar.vercel.app",
  "https://nizarnaser.github.io"
];

// ملفات ثابتة مع كاش طويل
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '30d', // 30 يوم
}));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
//db connection
connectDB();

//api endpoints

app.use("/api/food",foodRouter)

app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/cat",catRouter);
app.get("/",(req,res)=>{
    res.send("API Working")

})



app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port} `)
    
})

