import express from "express"
import { addFood ,listFood,removeFood,getOneFood,updateFood} from "../controllers/foodController.js"

import { storage } from "../config/cloudinary.js"; // ✅ استخدم التخزين السحابي

import multer from "multer"


const foodRouter = express.Router();


const upload = multer({storage})
foodRouter.post("/add", upload.single("image"), addFood);
  foodRouter.get("/one-item/:id",getOneFood)
  foodRouter.put("/update-item/:id",upload.single("image"),updateFood)
  foodRouter.get("/list",listFood)
  foodRouter.post("/remove",removeFood)




export default foodRouter;