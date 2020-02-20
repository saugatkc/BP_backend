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
    },
    email:{
        type: String,
       
    },
    addressDistrict:{
        type: String,
      
    },
    addressCity:{
        type: String,
       
    },
    latitude:{
        type:String
    },
    longitude:{
        type: String
    },
    noOfRooms:{
        type: String,
        
    },
    available:{
        type: String,
       
    },
    price:{
        type:String,
        
    },
    status:{
        type: Boolean,
        default: true
    },
    images: [imagesSchema],
    
    features:[featureSchema]

}, {timestamps: true});

module.exports = mongoose.model('Hotel', hotelSchema);