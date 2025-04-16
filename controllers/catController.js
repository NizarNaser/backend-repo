import catModel from "../models/catModel.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ استورد Cloudinary
//add cat item

const addCat = async (req, res) => {
    console.log("–– BODY ––", req.body);
console.log("–– FILE ––", req.file);
    // تحقق من وجود الصورة في الطلب
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    // معالجة بيانات الطعام
    const imageUrl = req.file.path; // مسار الصورة، تأكد من أنه صالح
    const publicId = req.file.filename; // يجب أن يكون لديك ملف فريد من نوعه
    const { name, name_uk, addel} = req.body;

    // تأكد من وجود البيانات المطلوبة
    if (!name || !name_uk || !addel ) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const cat = new catModel({
        name:req.body.name,
        name_uk:req.body.name_uk,
        addel:req.body.addel,
        image:imageUrl,
    })

    try {
        // حفظ الطعام في قاعدة البيانات
        await cat.save();
        res.json({ success: true, message: "cat added successfully" });
    } catch (error) {
        console.error("Error adding cat:", error); // سجّل الخطأ لتتبعه
        res.status(500).json({ success: false, message: "Error saving cat", error: error.message });
    }
};


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

        let imageUrl = existingCat.image;
        let imagePublicId = existingCat.image_public_id;

        if (req.file) {
            // حذف الصورة القديمة من Cloudinary
            if (imagePublicId) {
                await cloudinary.uploader.destroy(imagePublicId);
            }

            // تخزين الجديدة
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        }

        const updatedCat = await catModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                name_uk: req.body.name_uk,
                addel: req.body.addel,
                image: imageUrl,
                image_public_id: imagePublicId
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