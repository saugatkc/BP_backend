const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    image:{
        type:String
    }
});

const featureSchema = new mongoose.Schema({
    feature:{
        type:String
    }
});

const hotelSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    hotelname:{
        type :String,
        required: true
    },
    profileimage:{
        type: String
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
        type: String,
        required: true
    },
    noOfRooms:{
        type: String,
        required: true
    },
    available:{
        type: String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    status:{
        type: Boolean,
        default: false
    },
    images: [imagesSchema],
    
    features:[featureSchema]

}, {timestamps: true});

module.exports = mongoose.model('Hotel', hotelSchema);