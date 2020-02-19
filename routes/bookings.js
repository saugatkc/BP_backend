const express = require('express');
const Booking = require('../models/bookings');
const router = express.Router();
const auth = require('../auth');



router.post('/booking', (req, res, next) => {
    Booking.create({
        checkin:req.body.checkin,
        checkout: req.body.checkout,
        guest: req.body.guest,
        hotel: req.body.hotel,
        }).then((booking) => {
            res.json(booking);
        }).catch(next);
});


//fetching user their current booking
router.route('/:id/booking')
.get((req,res,next)=> {
    Booking.find({ guest: req.params.id, status:"booked" })
    .populate('hotel')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});


//fetching user their completed stays
router.route('/:id/completed')
.get((req,res,next)=> {
    Booking.find({ guest: req.params.id, status:"completed" })
    .populate('hotel')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});

//fetching user their canceled stays
router.route('/:id/canceled')
.get((req,res,next)=> {
    Booking.find({ guest: req.params.id, status:"canceled" })
    .populate('hotel')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});

//Updating booking status and deleting the booking
router.route('/:id')
.put((req, res, next) => {
    Booking.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((reply) => {
            if (reply == null) throw new Error("Booking not found!");
            res.json(reply);
        }).catch(next);
})
.delete((req,res, next)=>{
    Booking.findByIdAndDelete(req.params.id)
    .then((booking) => {
        if (booking == null) throw new Error("booking not found!");
                res.json(booking);
    }).catch((err) => next(err));
})

//fetching hotel their all completed stays
router.get('/hotel/hotelbooking/completed',  auth.verifyHotel, (req,res,next)=> {
    Booking.find({ hotel: req.hotel._id, status:"completed"})
    .populate('guest')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});

//fetching hotel their all bookings
router.get('/hotel/hotelbooking/booked',  auth.verifyHotel, (req,res,next)=> {
    Booking.find({ hotel: req.hotel._id, status:"booked"})
    .populate('guest')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});

//fetching hotel their all staying guest
router.get('/hotel/hotelbooking/staying',  auth.verifyHotel, (req,res,next)=> {
    Booking.find({ hotel: req.hotel._id, status:"checkedin"})
    .populate('guest')
    .then((booking) => {
        res.json(booking);
    }).catch((err) => next(err));
});


module.exports = router;