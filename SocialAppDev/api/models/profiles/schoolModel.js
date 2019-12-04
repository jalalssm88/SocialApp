const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    school:{
        type:String
    },
    class_year:{
        type:String
    }
});

module.exports = mongoose.model('school', SchoolSchema);