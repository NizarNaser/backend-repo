import mongoose from "mongoose";

const foodSchema= new mongoose.Schema({
    name:{type:String,required:true},
    name_uk:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    ves:{type:String,required:false},
    image:{type:String,required:true},
    category:{type:String,required:true}

}, { timestamps: true })

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;