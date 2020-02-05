const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hotel = require('../models/hotels');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        Hotel.create({
            owner:req.body.owner,
            username: req.body.username,
            password: hash,
            phone: req.body.phone,
            email: req.body.email,
            addressDistrict: req.body.addressDistrict,
            addressCity: req.body.addressCity,
            noOfRooms:req.body.addressCity,
            available: req.body.available
            
        }).then((hotel) => {
            let token = jwt.sign({ _id: hotel._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

module.exports = router;

router.post('/login', (req, res, next) => {
    Hotel.findOne({ username: req.body.username })
        .then((hotel) => {
            if (hotel == null) {
                let err = new Error('Hotel not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, hotel.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: hotel._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})