const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkin:{
        type: String,
        required: true
    },
    checkout:{
        type: String,
        required: true,
    },
    guest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    status:{
        type: String,
        default:"booked"
    },
    idimage:{
        type:String
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);