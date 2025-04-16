import express from "express"
import { addCat ,listCat,removeCat,updateCat,getOneCat} from "../controllers/catController.js"
import multer from "multer"
import { storage } from "../config/cloudinary.js"; // ✅ استخدم التخزين السحابي


const catRouter = express.Router();

const upload = multer({storage})
catRouter.post("/add-cat", upload.single("image"), addCat);
  catRouter.get("/one-cat/:id",getOneCat)
  catRouter.get("/list-cat",listCat)
  catRouter.post("/remove-cat",removeCat)
  catRouter.put("/update-cat/:id",upload.single("image"),updateCat)
  




export default catRouter;