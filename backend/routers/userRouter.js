const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('../models/usermodel');//importing user router
//this model is used to interact with the 'users'  collections in mango db

//const Product = require('../models/userProduct')
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body)
        .save()//user data saved in database

        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error saving user:", err.message);

        });

})

// router.post('/add',(req,res)=>{
//     console.log(req.body);

//     new Product(req.body)
//     .save()

//     .then((result) => {
//         res.status(200).json(result);
//     }).catch((err) => {
//         res.status(500).json(err);
//         console.log('error is:',err.message);

//     });

// })

// /getall
router.get('/getall', (req, res) => {
    Model.find()//finding all users in the user collection

        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error finding user:", err.message);

        });

})

// /getbyid

router.get('/getbyId/:id', (req, res) => {
    Model.findById(req.params.id)

        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error finding user:", err.message);

        });
})

//getbyemail

router.get('/getbyemail/:email', (req, res) => {
    Model.find({ email: req.params.email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error finding user:", err.message);

        });
})
// /delete
router.delete('/delete/:id', (req, res) => {

    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error finding user:", err.message);

        });

})
// /update
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error finding user:", err.message);

        });
})

//authenticate
router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)

        .then((result) => {
            if (result) {
                //authentication successful
                //generate token
                const { _id, name, email } = result;
                const payload = { _id, name, email };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    }
                    else {
                        res.status(200).json({ token });
                    }
                })
            } else {
                //auth failed
                res.status(401).json({ message: 'invalid credentials' });
            }
        }).catch((err) => {
            res.status(500).json(err);
            console.log("error authenticating user:", err.message);
        })
})
router.get("/getuser", verifyToken, (req, res) => {
    console.log(req.user);

    Model.findById(req.user._id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;//export the router to send to the other files