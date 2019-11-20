const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    gender:{
        type:String
    },
    date_of_birth:{
        type:String
    }
});

module.exports = mongoose.model('user', UserSchema);