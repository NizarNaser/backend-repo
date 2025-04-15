import express from "express"
import { addCat ,listCat,removeCat,updateCat,getOneCat} from "../controllers/catController.js"
import path from "path"
import multer from "multer"
import fs from "fs"

const catRouter = express.Router();
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
catRouter.post("/add-cat", upload.single("image"), (req, res, next) => {
    console.log("🔍 Received Headers:", req.headers);
    console.log("🔍 Received Body:", req.body);
    console.log("🔍 Middleware file check:", req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded in middleware" });
    }
    next();
  }, addCat);
  catRouter.get("/one-cat/:id",getOneCat)
  catRouter.get("/list-cat",listCat)
  catRouter.post("/remove-cat",removeCat)
  catRouter.put("/update-cat/:id",upload.single("image"),updateCat)
  

catRouter.use("/uploads",express.static("uploads"));



export default catRouter;