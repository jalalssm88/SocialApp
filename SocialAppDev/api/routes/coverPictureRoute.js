const express = require('express');
var fs = require('fs');
const router = express.Router();
var multer = require('multer')
const path = require("path")

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
      // to check which file extensions are availabe
      //Allowed ext
      const fileTypes = /jpeg|png|jpg|gif/;
      //Check ext
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      //check mime
      const mimeType = fileTypes.test(file.mimetype);
      if (mimeType && extname) {
        return cb(null, true);
      } else {
        cb("Error: invalid file type");
      }
    }
  })


const coverPicture = require('../models/coverPictureModel');
router.post('/upload_cover_picture', uploads.single('fileData'), (req, res, next)=>{
    console.log('fileeeeee========', req.file)
    var images = `http://${req.headers.host}/${req.file.path}`
    console.log('imageee', images)
    const new_cover_picture = new coverPicture({
        user_id:req.headers.user_id,
        cover_picture:images
    })
    console.log('headderrrs', req.headers)
    console.log ("new_cover_picture", new_cover_picture)
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
        console.log('docccccccccccc================', doc)
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







// const express = require('express');
// var app = express();
// const sharp = require('sharp')
// const fs = require("fs")
// const path = require("path")
// var bodyParser = require('body-parser');
// var multer = require('multer');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static('public'));
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //console.log(req.body);
//     const {
//       firstName,
//       id
//     } = req.body
//     const dir = `./public/uploads/${firstName}_${id}`
//     fs.exists(dir, exist => {
//       if (!exist) {
//         return fs.mkdir(dir, error => cb(error, dir))
//       }
//       return cb(null, dir)
//     })
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + "-" + file.originalname
//     );
//   }
// });

// const uploads = multer({
//   storage,
//   limits: 1024 * 1024 * 5,
//   fileFilter: (req, file, cb) => {
//     // to check which file extensions are availabe
//     //Allowed ext
//     const fileTypes = /jpeg|png|jpg|gif/;
//     //Check ext
//     const extname = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     //check mime
//     const mimeType = fileTypes.test(file.mimetype);
//     if (mimeType && extname) {
//       return cb(null, true);
//     } else {
//       cb("Error: invalid file type");
//     }
//   }
// })

// app.post("/", uploads.single("image"), async (req, res) => {
//   console.log(req.body);
//   const {
//     image
//   } = req.file
//   await sharp(req.file.path)
//     .resize(500)
//     .jpeg({
//       quality: 50
//     })
//     .toFile(
//       `public/uploads/${req.body.firstName}_${req.body.id}/` + "thumb_" + req.file.originalname
//     )
//   //fs.unlinkSync(req.file.path)

//   return res.send('SUCCESS!')
//   //res.send(req.file)
// })

// app.get("/", (req, res) => {
//   console.log(req);

//   res.send(req.headers.host)
// })
// app.listen(3000, () => console.log("listnening on port 3000"))