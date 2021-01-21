// let express = require("express");
// let router = express.Router();
//after coding out line 1 and 2 the terimanl stop crashing but gave back error of journal walkthrough doesn't exist 
// let sequelize = require('../db');
// let User = sequelize.import('../models/user');

// chaining 
const router = require('express').Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
//Create a new endpoint : /create
//The endpooint is going to be a post request
//Have an object that matches the model of UserTable (email/password).
// Let sequelize create a new record in the database (create)

router.post('/create', function(req, res){
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        function createSuccess(user) {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
  
        res.json({
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }
        )
     .catch(err => res.status(500).json({error: err}))
        });


router.post('/login',function(req, res){

User.findOne({
    where: {
        email:req.body.user.email
    }
})
.then(function loginSuccess(user){
    if(user) { 
        bcrypt.compare(req.body.user.password, user.password, function(err, matches){
            if(matches) {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})
                res.status(200).json({
                    user: user,
                    message: "User successfully logged in!",
                    sessionToken: token
                })
            } else {
                res.status(502).send({ error: "Login Failed"});
            }
        });
    } else {
        res.status(500).json({error: 'User does not exist.'})
    }

})

});
module.exports = router;