import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import catRouter from "./routes/catRoute.js";

//app config
const app =express()
const port =4000

//middeleware
app.use(express.json())
app.use(cors({
    origin: 'https://nizarnaser.github.io',
    credentials: true  // يسمح بإرسال بيانات المصادقة
  }));

app.use(express.urlencoded({ extended: true }));
//db connection
connectDB();

// اجعل السيرفر يقدم الملفات من مجلد uploads مباشرة
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
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


//mongodb+srv://nizarnaser17:Nizar_1970@cluster0.dlcal.mongodb.net/?