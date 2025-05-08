import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import catRouter from "./routes/catRoute.js";



//app config
const app =express()
const port =process.env.PORT 
//middeleware
app.use(express.json())
// ✅ السماح فقط لموقع GitHub Pages
const allowedOrigins = [
  "https://dubai-restaurant-karaoke-bar.vercel.app",
  "https://nizarnaser.github.io"
];


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

