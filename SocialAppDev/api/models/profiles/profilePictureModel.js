const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfilePictureSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    profile_picture:{
        type:String
    },
});

module.exports = mongoose.model('profile_pictures', ProfilePictureSchema);