import foodModel from "../models/foodModel.js";
import fs from "fs"


//add food item

const addFood = async(req,res) => {
    let image_filename = req.file.filename;
    console.log("📂 File Info:", req.file);

    let imageUrl =`https://backend-repo-v73c.onrender.com/uploads/${image_filename}`;
    const food = new foodModel({
        name:req.body.name,
        name_uk:req.body.name_uk,
        description:req.body.description,
        price:req.body.price,
        ves:req.body.ves,
        category:req.body.category,
        image:imageUrl,
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
const removeFood = async (req,res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"food Removed"});

  } catch (error) {
    console.log(error);
        res.json({success:false,message:"Error"})
  }
}

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