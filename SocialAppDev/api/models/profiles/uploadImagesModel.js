const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadImagesSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    upload_image:{
        type:String
    },
});

module.exports = mongoose.model('upload_images', UploadImagesSchema);