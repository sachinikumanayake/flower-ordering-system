// Backend/routes/flowerRoute.js

import express from "express";
import { addFlower,listFlower,removeFlower} from "../controllers/flowerController.js";
import multer from "multer";
import path from "path";
import adminAuth from "../middleware/adminAuth.js"; // Middleware Import කර ඇත

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Folder name
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage: storage });

const router = express.Router();


// 1. 🟢 addFlower Route එක ආරක්ෂා කිරීම
router.post("/add", adminAuth, upload.single("image"), addFlower);

// 2. 🟢 listFlower Route එක සියලු දෙනාටම විවෘතව තබන්න (ආරක්ෂාව අවශ්‍ය නැත)
router.get("/list",listFlower) 

// 3. 🟢 removeFlower Route එක ආරක්ෂා කිරීම
router.post("/remove", adminAuth, removeFlower); 


export default router;