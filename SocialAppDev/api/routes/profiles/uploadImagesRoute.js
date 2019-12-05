const express = require('express');
const router = express.Router();
var multer = require('multer')
const path = require("path")
var fs = require('fs');

var upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `./uploads/`
      fs.exists(dir, exist => {
        if (!exist) {
          return fs.mkdir(dir, error => cb(error, dir))
        }
        return cb(null, dir)
      })
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + "-" + file.originalname
      );
    }
  });

  const uploads = multer({
    storage,
    limits: 1024 * 1024 * 5,
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|png|jpg|gif/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimeType = fileTypes.test(file.mimetype);
      if (mimeType && extname) {
        return cb(null, true);
      } else {
        cb("Error: invalid file type");
      }
    }
  })


const uploadImages = require('../../models/profiles/uploadImagesModel');
router.post('/upload_images', uploads.single('fileData'), (req, res, next)=>{
    console.log('fileeeeee========', req.file)
    var images = `http://${req.headers.host}/${req.file.path}`
    console.log('imageee', images)
    const new_upload_image = new uploadImages({
        user_id:req.headers.user_id,
        upload_image:images
    })
    new_upload_image.save()
    .then(picture => {
        res.status(200).json({
            status:"success",
            message: 'Profile picture successfully uploaded',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_images/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('id in get images pic', id)
    var query ={
        "user_id":id
    }
    uploadImages.find (query) 
    .select('_id user_id upload_image')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message: "no data found against this id",
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;