//authenticate user
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/Users');

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public

router.get('/test', (req,res) => res.json({msg: 'Userss Works'}));

//@route    GET api/users/register
//@desc     Register user
//@access   Public

router.post('/register', (req,res) => {

    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }
    User.findOne( {email: req.body.email}).then(user =>{
    if(user){
        error.email = 'Email exists already!';
        return res.status(400).json(errors);
        
    }
    else{
        const avatar= gravatar.url(req.body.email,{
            s: '200',
            r: 'pg',
            d: 'mm'

        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
        });

        bcrypt.genSalt(8, (err, salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save().then(user=> res.json(user)).catch(err => console.log(err));
            })


        })

    }
})

});

//@route    GET api/users/login
//@desc     login user
//@access   Public

router.post('/login', (req,res) =>{

    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email


    User.findOne({email}).then(user=>
        // pass in errors and password just like email in uprop ERRORS!!
        {if(!user){ return res.status(404).json({email: 'User not found'});}

        //Password?
        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(isMatch){
               // res.json({msg: 'Yup!'});
               const payload = {id: user.id, name: user.name, avatar: user.avatar}

               jwt.sign(payload, keys.secretOrKey,{expiresIn: 3600}, (err, token) =>{
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });


               }
               );
            } else{
                return res.status(400).json({ password: 'Password incorrect'});
            }

        })


        });

});

//@route    GET api/users/current
//@desc     return current user
//@access   Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) =>{ res.json({

    id: req.user.id,
    name: req.user.name,
    email: req.user.email
});
});


module.exports = router;