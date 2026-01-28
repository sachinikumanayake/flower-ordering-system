import flowerModel from "../models/flowerModel.js";
import fs from 'fs';

const addFlower = async (req, res) => {

    try {
        console.log("REQ FILE:", req.file);

        let image_filename = req.file ? req.file.filename : null;

        const flower = new flowerModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await flower.save();
        
        res.json({ success: true, message: "Flower added successfully" }); 

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// flower list
const listFlower = async (req,res) => {
    try {
        const flower = await flowerModel.find({});
        res.json({success:true,data:flower})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// remove
const removeFlower = async (req,res) =>{
    try {
        const flower = await flowerModel.findById(req.body.id);
        fs.unlink(`uploads/${flower.image}`,()=>{})
        await flowerModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Flower Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
export { addFlower,listFlower,removeFlower };