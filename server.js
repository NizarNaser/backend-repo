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
    origin: 'https://nizarnaser.github.io/admin-dubai/',
    credentials: true  // يسمح بإرسال بيانات المصادقة
  }));

app.use(express.urlencoded({ extended: true }));
//db connection
connectDB();
// ✅ تمكين الوصول إلى مجلد الصور (اختياري)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // للسماح بعرض الصور مباشرة

//api endpoints

app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
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