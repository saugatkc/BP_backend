const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const hotelstorage = multer.diskStorage({
    destination: "./public/hotels",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

router.route('/')
    .post(upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    });


const uploadhotel = multer({
        storage: hotelstorage,
        fileFilter: imageFileFilter
    })
    
router.route('/hotel')
        .post(uploadhotel.single('imageFile'), (req, res) => {
            res.json(req.file);
        });   

module.exports = router;