import express from "express";
import { addFood, listFood, removeFood, getOneFood, updateFood } from "../controllers/foodController.js";
import { storage } from "../config/cloudinary.js"; // ✅ استخدم التخزين السحابي
import multer from "multer";

const foodRouter = express.Router();

const upload = multer({ storage });

// إضافة طعام جديد مع الصورة
foodRouter.post("/add", upload.single("image"), async (req, res) => {
  try {
    // إضافة الطعام عبر ال API
    await addFood(req, res);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء إضافة الطعام", error });
  }
});

// الحصول على طعام واحد باستخدام الـ ID
foodRouter.get("/one-item/:id", getOneFood);

// تحديث طعام
foodRouter.put("/update-item/:id", upload.single("image"), async (req, res) => {
  try {
    // إذا كانت الصورة موجودة، نقوم بتحديثها
    if (req.file) {
      req.body.image = req.file.path;
    }
    // تحديث الطعام عبر الـ API
    await updateFood(req, res);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تحديث الطعام", error });
  }
});

// عرض جميع الأطعمة
foodRouter.get("/list", listFood);

// إزالة طعام
foodRouter.post("/remove", async (req, res) => {
  try {
    await removeFood(req, res);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء إزالة الطعام", error });
  }
});

export default foodRouter;
