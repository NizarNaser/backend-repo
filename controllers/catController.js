import catModel from "../models/catModel.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ استورد Cloudinary



//add food item

const addCat = async(req,res) => {
    const image_filename = req.file.path; 
    const cat = new catModel({
        name:req.body.name,
        name_uk:req.body.name_uk,
        addel:req.body.addel,
        image:image_filename,
    })

    try {
        console.log("Received file:",req.file);
        if(!req.file){
            return res.status(400).json({error:"No image uploaded"});
        }
        await cat.save();
        res.json({success:true,message:"cat Added"});
    } catch (error) {
         res.json({success:false,message:"Error"})
       
            
    }



}

//all food list
const listCat = async (req,res) => {
    try {
        const cats = await catModel.find({});
        res.json({success:true,data:cats});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}

//remove cat 
const removeCat = async (req, res) => {
    try {
      const cat = await catModel.findById(req.body.id);
      if (!cat) {
        return res.status(404).json({ success: false, message: "cat not found" });
      }
  
      // حذف الصورة من Cloudinary
      if (cat.image_public_id) {
        await cloudinary.uploader.destroy(cat.image_public_id);
      }
  
      // حذف العنصر من قاعدة البيانات
      await catModel.findByIdAndDelete(req.body.id);
  
      res.json({ success: true, message: "cat removed successfully" });
    } catch (error) {
      console.log("❌ Remove Error:", error);
      res.status(500).json({ success: false, message: "Error removing cat item" });
    }
  };
//one cat item
const getOneCat = async (req,res) => {
    try {
        const cat = await catModel.findById(req.params.id);
        if (!cat) return res.status(404).json({ error: "cat not found" });
        res.json(cat);
      } catch (error) {
        res.status(500).json({ error: "Error fetching cat item" });
      }
}
//update cat item
const updateCat = async (req, res) => {
    
    try {
        // البحث عن العنصر الحالي
        const existingCat = await catModel.findById(req.params.id);
        if (!existingCat) {
            return res.status(404).json({ error: "cat not found" });
        }

        const image_url = req.file ? req.file.path : existingFood.image;

        // تحديث البيانات
        const updatedCat = await catModel.findByIdAndUpdate(
            req.params.id, 
            {
                name: req.body.name,
                name_uk: req.body.name_uk,
                addel: req.body.addel,
                image: image_url
            },
            { new: true }
        );

        res.json({ success: true, message: "cat updated successfully!", updatedCat });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Error updating cat item" });
    }
};

export{addCat,listCat,removeCat,updateCat,getOneCat}