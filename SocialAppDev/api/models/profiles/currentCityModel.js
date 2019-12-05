const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentCitySchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    current_city:{
        type:String
    }
});

module.exports = mongoose.model('current_city', CurrentCitySchema);