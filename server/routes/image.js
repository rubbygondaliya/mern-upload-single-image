const express = require('express');
const Image = require('../Models/ImageSchema');
const ImageRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file
*/
ImageRouter.post("/uploadmulter", upload.single('imageData'), (req, res, next) => {
    console.log(req.body);
    const newImage = new Image({
        name: req.body.name,
        imageName: req.body.imageName,
        imageData: req.file.path
    });

    newImage.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err));
});

/*
    upload image in base64 format, thereby,
    directly storing it in mongodb database
    along with images uploaded using firebase
    storage
*/    
ImageRouter.route("/uploadbase")
    .post((req, res, next) => {
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.body.imageData
        });

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

ImageRouter.post('/greeting', (req, res) => {
    const name = req.body.name || 'World';
    console.log(req.body);
    // res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    res.json({ greeting: `Hello ${name}!` });
});

module.exports = ImageRouter;