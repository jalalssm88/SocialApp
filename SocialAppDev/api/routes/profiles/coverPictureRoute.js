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

const coverPicture = require('../../models/profiles/coverPictureModel');
router.post('/upload_cover_picture', uploads.single('fileData'), (req, res, next)=>{
    var images = `http://${req.headers.host}/${req.file.path}`
    const new_cover_picture = new coverPicture({
        user_id:req.headers.user_id,
        cover_picture:images
    })
    new_cover_picture.save()
    .then(picture => {
        res.status(200).json({
            status:"success",
            message: 'Cover picture successfully uploaded',
        });
    })
    .catch(err => {
       res.status(500).json({
           error:err
       })
    })
});

router.get('/get_cover_picture/:id', (req, res, next)=>{
    const id = req.params.id;
    var query ={
        "user_id":id
    }
    coverPicture.find (query) 
    .select('_id user_id cover_picture')
    .exec()
    .then(doc => {
        var last_image = doc[doc.length-1];
        console.log("doc in cover picture", doc)
        console.log('last image', last_image)
        if(doc){
            res.status(200).json(last_image)
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