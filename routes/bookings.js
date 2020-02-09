const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// //fetching hotels to guest
// router.route('/bookingdetais')
// .get((req,res,next)=> {
//     Booking.find({ status: "booked" })
//     .then((booking)=> {
//         res.json(booking);
//     }).catch((err)=>next(err));
// });

//fetching user their current booking
router.route('/booked', auth.verifyUser)
.get((req,res,next)=> {
    Booking.find({ status: "booked",guest: req.body.id })
    .then((bookings)=> {
        res.json(bookings);
    }).catch((err)=>next(err));
});

//fetching user their completed stays
router.route('/completed', auth.verifyUser)
.get((req,res,next)=> {
    Booking.find({ status: "completed",guest: req.body.id })
    .then((bookings)=> {
        res.json(bookings);
    }).catch((err)=>next(err));
});

//fetching user their cancled stays
router.route('/completed', auth.verifyUser)
.get((req,res,next)=> {
    Booking.find({ status: "cancled",guest: req.body.id })
    .then((bookings)=> {
        res.json(bookings);
    }).catch((err)=>next(err));
});
module.exports = router;