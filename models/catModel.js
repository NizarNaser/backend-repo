import mongoose from "mongoose";

const catSchema= new mongoose.Schema({
    name:{type:String,required:true},
    name_uk:{type:String,required:false},
    image:{type:String,required:true},
    addel:{type:String,required:true}

}, { timestamps: true })

const catModel = mongoose.models.cat || mongoose.model("cat",catSchema);

export default catModel;