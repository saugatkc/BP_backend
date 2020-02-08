const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hotel = require('../models/hotels');
const router = express.Router();
const auth = require('../auth');


//Hotels add and view
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
            hotelname:req.body.hotelname,
            profileimage:req.body.profileimage,
            username: req.body.username,
            password: hash,
            phone: req.body.phone,
            email: req.body.email,
            addressDistrict: req.body.addressDistrict,
            addressCity: req.body.addressCity,
            noOfRooms:req.body.noOfRooms,
            available: req.body.available,
            price: req.body.price
            
        }).then((hotel) => {
            let token = jwt.sign({ _id: hotel._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});



//loging in existing hotel
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


//getting hotel profile 
router.get('/me', auth.verifyHotel, (req, res, next) => {
    res.json({ _id: req.hotel._id, owner: req.hotel.owner, hotelname: req.hotel.hotelname,profileimage:req.hotel.profileimage, username: req.hotel.username,phone: req.hotel.phone,email: req.hotel.email, addressDistrict: req.hotel.addressDistrict, addressCity: req.hotel.addressCity, noOfRooms: req.hotel.noOfRooms, available: req.hotel.available,price: req.hotel.price, status: req.hotel.status });
});

//updating hotel details
router.put('/me', auth.verifyHotel, (req, res, next) => {
    Hotel.findByIdAndUpdate(req.hotel._id, { $set: req.body }, { new: true })
        .then((hotel) => {
            res.json({ _id: hotel._id, owner: hotel.owner,hotelname: req.hotel.hotelname,profileimage:req.hotel.profileimage, username: hotel.username,phone: hotel.phone,email: hotel.email, addressDistrict: hotel.addressDistrict, addressCity: hotel.addressCity,latitude: hotel.latitude, longitude: hotel.longitude, noOfRooms: hotel.noOfRooms, available: hotel.available,price: req.hotel.price, status: hotel.status });
        }).catch(next);
});




//fetching hotels to guest
router.route('/hoteldetails')
.get((req,res,next)=> {
    Hotel.find({ status: true })
    .then((hotel)=> {
        res.json(hotel);
    }).catch((err)=>next(err));
});

//finding hotel requested to admin
router.route('/hotelrequest')
.get((req,res,next)=> {
    Hotel.find({ status: false })
    .then((hotel)=> {
        res.json(hotel);
    }).catch((err)=>next(err));
});

router.get('/:id',(req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            res.json(hotel);
        }).catch((err)=>next(err));
});

//gallery (adding fetching and empting images in gallery)
router.route('/:id/gallery')
.get((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            res.json(hotel.images);
        })
        .catch(next);
})
.post((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.images.push(req.body);
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.images);
                })
                .catch(next);
        })
        .catch(next);
})
.put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.images = [];
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.images);
                })
                .catch(next);
        })
        .catch(next);
});

//gallery (viewing image in gallery and deleting it)
router.route('/:id/gallery/:iid')
.get((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            let image = hotel.images.id(req.params.iid);
            res.json(image);
        })
        .catch(next);
})
.post((req, res) => {
    res.statusCode = 405;
        res.json({ message: "Method not allowed" });
})
.put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.images.pull(req.params.iid);
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.images);
                })
                .catch(next);
        })
        .catch(next);
});

//features (adding fetching and empting features of a hotel)
router.route('/:id/features')
.get((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            res.json(hotel.features);
        })
        .catch(next);
})
.post((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.features.push(req.body);
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.features);
                })
                .catch(next);
        })
        .catch(next);
})
.put((req, res) => {
    res.statusCode = 405;
    res.json({ message: "Method not allowed" });
})
.delete((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.features = [];
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.features);
                })
                .catch(next);
        })
        .catch(next);
});

//features (viewing editing and deleting a feature of a hotel)
router.route('/:id/features/:fid')
.get((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            let feature = hotel.features.id(req.params.fid);
            res.json(feature);
        })
        .catch(next);
})
.post((req, res) => {
    res.statusCode = 405;
        res.json({ message: "Method not allowed" });
})
.put((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            let feature = hotel.features.id(req.params.fid);
            feature.feature = req.body.feature;
            hotel.save()
                .then(() => {
                    res.json(feature);
                })
                .catch(next);
        })
        .catch(next);
})
.delete((req, res, next) => {
    Hotel.findById(req.params.id)
        .then((hotel) => {
            hotel.features.pull(req.params.fid);
            hotel.save()
                .then((hotel) => {
                    res.json(hotel.features);
                })
                .catch(next);
        })
        .catch(next);
});

module.exports = router;

