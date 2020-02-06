const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    checkin:{
        type: String,
        required: true
    },
    checkout:{
        type: String,
        required: true,
        unique: true
    },
    guest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);