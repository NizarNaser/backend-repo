import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ استورد Cloudinary



//add food item

const addFood = async (req, res) => {
    console.log("–– BODY ––", req.body);
console.log("–– FILE ––", req.file);
    // تحقق من وجود الصورة في الطلب
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // معالجة بيانات الطعام
    const imageUrl = req.file.path; // مسار الصورة، تأكد من أنه صالح
    const publicId = req.file.filename; // يجب أن يكون لديك ملف فريد من نوعه
    const { name, name_uk, description, price, ves, category } = req.body;

    // تأكد من وجود البيانات المطلوبة
    if (!name || !price || !category || !description) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const food = new foodModel({
        name,
        name_uk,
        description,
        price,
        ves,
        category,
        image: imageUrl,
        image_public_id: publicId
    });

    try {
        // حفظ الطعام في قاعدة البيانات
        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error); // سجّل الخطأ لتتبعه
        res.status(500).json({ success: false, message: "Error saving food", error: error.message });
    }
};

//all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
      if (!food) {
        return res.status(404).json({ success: false, message: "Food not found" });
      }
  
      // حذف الصورة من Cloudinary
      if (food.image_public_id) {
        await cloudinary.uploader.destroy(food.image_public_id);
      }
  
      // حذف العنصر من قاعدة البيانات
      await foodModel.findByIdAndDelete(req.body.id);
  
      res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
      console.log("❌ Remove Error:", error);
      res.status(500).json({ success: false, message: "Error removing food item" });
    }
  };

//one food item
const getOneFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) return res.status(404).json({ error: "Food not found" });
        res.json(food);
      } catch (error) {
        res.status(500).json({ error: "Error fetching food item" });
      }
}

//update food item
const updateFood = async (req, res) => {
    
    try {
        // البحث عن العنصر الحالي
        const existingFood = await foodModel.findById(req.params.id);
        if (!existingFood) {
            return res.status(404).json({ error: "Food not found" });
        }

        // التحقق من الصورة الجديدة أو الاحتفاظ بالصورة القديمة
        const image_filename = req.file ? req.file.filename : existingFood.image;
        console.log(req.body.name)
        // تحديث البيانات
        const updatedFood = await foodModel.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                name_uk: req.body.name_uk,
                description: req.body.description,
                price: req.body.price,
                ves: req.body.ves,
                category: req.body.category,
                image: image_filename
            },
            { new: true }
        );

        res.json({ success: true, message: "Food updated successfully!", updatedFood });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Error updating food item" });
    }
};

export{addFood,listFood,removeFood,getOneFood,updateFood}