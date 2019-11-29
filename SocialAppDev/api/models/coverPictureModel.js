const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobpostSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    cover_picture:{
        type:String
    },
});

module.exports = mongoose.model('cover_pictures', JobpostSchema);