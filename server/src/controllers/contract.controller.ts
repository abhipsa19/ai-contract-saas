import e from "express";
import multer from "multer";


const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error("Invalid file type"));
        }
}}).single("contract");