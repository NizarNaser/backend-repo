import express from "express"
import { addFood ,listFood,removeFood,getOneFood,updateFood} from "../controllers/foodController.js"
import path from "path"
import multer from "multer"
import fs from "fs"

const foodRouter = express.Router();
// إنشاء مجلد `uploads` تلقائيًا إذا لم يكن موجودًا
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Image Storage Engine

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        
        cb(null,"uploads/")},
    filename:(req,file,cb)=>{
        cb(null, Date.now() +path.extname(file.originalname));
    }
})

const upload = multer({storage})
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("🔍 Received Headers:", req.headers);
    console.log("🔍 Received Body:", req.body);
    console.log("🔍 Middleware file check:", req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded in middleware" });
    }
    next();
  }, addFood);
  foodRouter.get("/one-item/:id",getOneFood)
  foodRouter.put("/update-item/:id",upload.single("image"),updateFood)
  foodRouter.get("/list",listFood)
  foodRouter.post("/remove",removeFood)

foodRouter.use("/uploads",express.static("uploads"));



export default foodRouter;