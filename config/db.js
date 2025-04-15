import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nizarnaser17:Nizar_1970@cluster0.dlcal.mongodb.net/food-del").then(()=>console.log("DB Connected"));
}