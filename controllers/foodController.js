import foodModel from "../models/foodModel.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ استورد Cloudinary


//add food item

const addFood = async(req,res) => {

    const imageUrl =req.file.path;
    const publicId = req.file.filename;
    const food = new foodModel({
        name:req.body.name,
        name_uk:req.body.name_uk,
        description:req.body.description,
        price:req.body.price,
        ves:req.body.ves,
        category:req.body.category,
        image:imageUrl,
        image_public_id:publicId
    })

    try {
        console.log("Received file:",req.file);
        if(!req.file){
            return res.status(400).json({error:"No image uploaded"});
        }
        await food.save();
        res.json({success:true,message:"Food Added"});
    } catch (error) {
         res.json({success:false,message:"Error"})
       
            
    }



}

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

//update food item
const updateFood = async (req, res) => {
    
    try {
        // البحث عن العنصر الحالي
        const existingFood = await foodModel.findById(req.params.id);
        if (!existingFood) {
            return res.status(404).json({ error: "Food not found" });
        }

        const image_url = req.file ? req.file.path : existingFood.image;
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
                image: image_url
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