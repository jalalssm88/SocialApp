const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkPlaceSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    work_place:{
        type:String
    },
    job_title:{
        type:String
    },
    start_date:{
        type:String
    },
    end_date:{
        type:String
    },
    is_working:{
        type:Boolean
    }
});

module.exports = mongoose.model('work_place', WorkPlaceSchema);