const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    university:{
        type:String
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    is_graduated:{
        type:Boolean
    }
});

module.exports = mongoose.model('university', UniversitySchema);