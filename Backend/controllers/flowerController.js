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
        
        // 🚨 නිවැරදි කරන ලද Response: 
        // 200 OK හෝ 201 Created status එක සමඟ JSON response body එකක් යවන්න.
        // මෙය Front-end එකේ if (response.data.success) { ... } logic එක ක්‍රියාත්මක කරයි.
        res.json({ success: true, message: "Flower added successfully" }); // 200 OK (Default)

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