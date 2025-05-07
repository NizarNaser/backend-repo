import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ استورد Cloudinary

// إضافة طعام
const addFood = async (req, res) => {
    console.log("–– BODY ––", req.body);
    console.log("–– FILE ––", req.file);

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const imageUrl = req.file.path; // مسار الصورة
    const publicId = req.file.filename; // معرف الصورة
    const { name, name_uk, description, price, gram, category } = req.body;

    if (!name || !price || !category || !description) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const food = new foodModel({
        name,
        name_uk,
        description,
        price,
        gram,
        category,
        image: imageUrl,
        image_public_id: publicId
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Error saving food", error: error.message });
    }
};

// عرض قائمة الأطعمة
// كاش داخل الذاكرة
let cachedFoods = null;
let cacheExpiration = null;



    // عرض قائمة الأطعمة
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}).select("name description price category image"); // تحديد الحقول المطلوبة فقط
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching foods" });
    }


    try {
        const foods = await foodModel
            .find({})
            .select("name description price category image");

        // تخزين الكاش لمدة 10 دقائق
        cachedFoods = foods;
        cacheExpiration = now + 10 * 60 * 1000;

        res.json({ success: true, data: foods, cache: false });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching foods" });
    }
};


// حذف طعام
const removeFood = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    try {
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (food.image_public_id) {
            await cloudinary.uploader.destroy(food.image_public_id);
        }

        await foodModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log("❌ Remove Error:", error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

// الحصول على طعام واحد
const getOneFood = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await foodModel.findById(id);
        if (!food) return res.status(404).json({ error: "Food not found" });
        res.json(food);
    } catch (error) {
        res.status(500).json({ error: "Error fetching food item" });
    }
};

// تحديث طعام
const updateFood = async (req, res) => {
    const { id } = req.params;

    try {
        const existingFood = await foodModel.findById(id);
        if (!existingFood) {
            return res.status(404).json({ error: "Food not found" });
        }

        let imageUrl = existingFood.image;
        let imagePublicId = existingFood.image_public_id;

        if (req.file) {
            // حذف الصورة القديمة من Cloudinary
            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }

            // تخزين الصورة الجديدة
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                name_uk: req.body.name_uk,
                description: req.body.description,
                price: req.body.price,
                gram: req.body.gram,
                category: req.body.category,
                image: imageUrl,
                image_public_id: imagePublicId
            },
            { new: true }
        );

        res.json({ success: true, message: "Food updated successfully!", updatedFood });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Error updating food item" });
    }
};

export { addFood, listFood, removeFood, getOneFood, updateFood };
