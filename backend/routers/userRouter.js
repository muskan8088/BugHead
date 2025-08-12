const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('../models/usermodel'); // importing the user model
//this model is used to interact with the "user" collection in yhe mongoDB database.

const router = express.Router();

router.post('/add', (req, res) => {
  console.log(req.body);//logging the request body to the console

  new Model(req.body) //Creating a new instance of the Model with the request body
    .save() //saving the new user to the database
    .then((result) => {
      res.status(200).json(result); //sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying faills
      console.log('Error saving users:', err.message);//logging the error message to the console

    });
})


//delete

//  router.delete('/delete/:id',(req,res) =>{
//     res.send('Response from User Delete Route');

//  })
// //update
//  router.put('/update/:id',(req,res) =>{
//     res.send('Response from User Update Route');
//  })

//getall
router.get('/getall', (req, res) => {
  Model.find() //finding all users in the 'Users' collection
    .then((result) => {
      res.status(200).json(result); //sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying faills
      console.log('Error finding users:', err.message);//logging the error message to the console

    });
})
// get/:id
router.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id) //finding a user by ID from  the request parameters
    .then((result) => {
      res.status(200).json(result);// sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying fails
      console.log('Error saving users:', err.message);//logging the error message tothe console 

    });
})
//getbyemail/:email
router.get('/getbyemail/:email', (req, res) => {
  Model.find({ email: req.params.email })
    .then((result) => {
      res.status(200).json(result);// sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying fails
      console.log('Error saving users:', err.message);//logging the error message tothe console 

    });
})
// /delete
router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);// sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying fails
      console.log('Error saving users:', err.message);//logging the error message tothe console 

    });
})

// /update 
router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.status(200).json(result);// sending a success response with the saved user data
    }).catch((err) => {
      res.status(500).json(err); //sending an error response if saying fails
      console.log('Error saving users:', err.message);//logging the error message tothe console 

    });
})
//authenticate
router.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) {
        //authentication Successful
        //Generate Token

        const { _id, name, email } = result;
        const payload = { _id, name, email };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
          if (err) {
            console.log(err);
            res.status(500).json(err);


          } else {
            res.status(200).json({ token });
          }
        })


      } else {
        //auth Failed
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    }).catch((err) => {
      res.status(500).json(err)
      console.log(err);

    });

})




module.exports = router;
