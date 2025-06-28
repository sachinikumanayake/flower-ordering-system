import express from "express";
import { addFlower,listFlower,removeFlower} from "../controllers/flowerController.js";
import multer from "multer";
import path from "path";

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


router.post("/add", upload.single("image"), addFlower);
router.get("/list",listFlower)
router.post("/remove",removeFlower);

export default router;