import mongoose from "mongoose";

const catSchema= new mongoose.Schema({
    name:{type:String,required:true},
    name_uk:{type:String,required:false},
    image:{type:String},
    addel:{type:String,required:true},
    image_public_id: {type:String} // معرّف الصورة في Cloudinary


}, { timestamps: true })

const catModel = mongoose.models.cat || mongoose.model("cat",catSchema);

export default catModel;