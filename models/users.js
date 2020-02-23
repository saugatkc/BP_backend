const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
    },

    image:{
        type:String
    },
    saved:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'}],
    admin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);