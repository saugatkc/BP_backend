const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkin:{
        type: String,
    },
    checkout:{
        type: String,
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
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);