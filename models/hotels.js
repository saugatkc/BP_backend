const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    owner:{
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
        required: true
    },
    email:{
        type: String,
        required: true
    },
    addressDistrict:{
        type: String,
        required: true
    },
    addressCity:{
        type: String
    },
    noOfRooms:{
        type: Int16Array
    },
    occupied:{
        type: Int16Array,
        default: '0'
    }

}, {timestamps: true});

module.exports = mongoose.model('Hotel', hotelSchema);