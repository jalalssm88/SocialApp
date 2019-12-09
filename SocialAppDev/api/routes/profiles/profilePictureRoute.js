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


const profilePicture = require('../../models/profiles/profilePictureModel');
router.post('/upload_profile_picture', uploads.single('fileData'), (req, res, next)=>{
    console.log('fileeeeee========', req.file)
    var images = `http://${req.headers.host}/${req.file.path}`
    console.log('imageee', images)
    const new_profile_picture = new profilePicture({
        user_id:req.headers.user_id,
        profile_picture:images
    })
    new_profile_picture.save()
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

router.get('/get_profile_picture/:id', (req, res, next)=>{
    const id = req.params.id;
    console.log('id in profile pic', id)
    var query ={
        "user_id":id
    }
    profilePicture.find (query) 
    .select('_id user_id profile_picture')
    .exec()
    .then(doc => {
        var last_image = doc[doc.length-1];
        console.log('doc in profile picture', doc)
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

router.get('/get_profile_picture/', (req, res, next)=>{
  // var query = {sort({ _id: -1 }).limit(1)}
  profilePicture.find()
  .select('user_id profile_picture')
  .populate('user_id', 'first_name last_name')
  .exec()
  .then(doc => {
     console.log('================================', doc)

     var response = {}
      var my_array = []
      doc.map(item=>{
        console.log('itemmmmm', item)
          if(!response.hasOwnProperty(item.user_id._id)) {	
              response[item.user_id._id] = []
          } 
          response[item.user_id._id] = (item)
      })

      Object.values(response).map(item => {
          my_array.push(item)
      })

      if(doc){
          res.status(200).json(my_array)
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