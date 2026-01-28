import express from "express";
import { addFlower,listFlower,removeFlower} from "../controllers/flowerController.js";
import multer from "multer";
import path from "path";
import adminAuth from "../middleware/adminAuth.js"; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const router = express.Router();


router.post("/add", adminAuth, upload.single("image"), addFlower);

router.get("/list",listFlower) 

router.post("/remove", adminAuth, removeFlower); 


export default router;