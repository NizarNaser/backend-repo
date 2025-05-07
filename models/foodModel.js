import mongoose from "mongoose";

const foodSchema= new mongoose.Schema({
    name:{type:String,required:true},
    name_uk:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    gram:{type:String,required:true},
    image:{type:String},
    category:{type:String,required:true},
    image_public_id: {type:String} // معرّف الصورة في Cloudinary


}, { timestamps: true })

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;