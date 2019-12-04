const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoverPictureSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    cover_picture:{
        type:String
    },
});

module.exports = mongoose.model('cover_pictures', CoverPictureSchema);