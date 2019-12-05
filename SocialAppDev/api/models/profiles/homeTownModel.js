const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeTownSchema = new Schema({
    user_id:{
        type:mongoose.Types.ObjectId, ref:'users'
    },
    home_town:{
        type:String
    }
});

module.exports = mongoose.model('home_town', HomeTownSchema);