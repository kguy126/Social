// like location bio experiences eduacation....
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


//Load Profile Model
const Profile = require('../../models/Profile');
// Load User profile 
const User = require('../../models/Users');

//@route    GET api/users/profile
//@desc     Tests profile route
//@access   Public

router.get('/test', (req,res) => res.json({msg: 'Profile Works'}));


//@route    GET api/profile
//@desc     GET current users profile 
//@access   Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) =>{ 

    const errors ={}
    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'NO PROFILE!!!!';
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


//@route    GET api/profile/all
//@desc     GET profiles
//@access   Public

router.get('/all', (req, res) =>{ 

    const errors ={};
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofile = 'NO PROFILES';
            res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'NO PROFILES!!!'}));

    //you fit get error so chnaged form err to 
});


//@route    GET api/profile/handle/:handle
//@desc     GET profile by handle
//@access   Public

router.get('/handle/:handle', (req, res) =>{ 

    const errors ={}
    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     GET profile by user ID
//@access   Public

router.get('/user/:user_id', (req, res) =>{ 

    const errors ={}
    Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'NO PROFILE!!!'}));

    //you fit get error so chnaged form err to 
});


//@route    POST api/profile
//@desc     Create or Edit user profile 
//@access   Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{ 

    const {errors, isValid} = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }


    //Get fields
    const profileFields = {};
    profileFields.user= req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
  

    //Sills split into array 
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills= req.body.skills.split(',');
    }

    //Social
    profileFields.social ={};
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(profile){

            //Update
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields},
                {new: true}).then(profile => res.json(profile));
        }
        else{
            //Create

            //Check for handle
            Profile.findOne( {handle: profileFields.handle}).then(
                profile => {
                    if(profile){
                        errors.handle = 'Exists!';
                        res.status(404).json(errors);
                    }
            //Save profile
            new Profile (profileFields).save().then(profile => res.json(profile));        

                }
            );


        }

        
    });
   

 
}
);

//@route    GET api/profile/experience
//@desc    Add experience to profile
//@access   Private

router.post('/experience',passport.authenticate('jwt', {session: false}), (req, res) =>{ 

    const {errors, isValid} = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }

    Profile.findOne({user: req.user.id})
    .then(profile => {

        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }

        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
      
        
    });

});

//@route    GET api/profile/education
//@desc    Add education to profile
//@access   Private

router.post('/education',passport.authenticate('jwt', {session: false}), (req, res) =>{ 

    const {errors, isValid} = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }

    Profile.findOne({user: req.user.id})
    .then(profile => {

        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }

        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
      
        
    });

})


//@route    DELETE api/profile/experience/:exp_id
//@desc     DELETE experience from profile
//@access   Private

router.delete('/experience/:exp_id',passport.authenticate('jwt', {session: false}), (req, res) =>{ 


    Profile.findOne({user: req.user.id})
    .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        //Splice
        profile.experience.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      
        
    })
    .catch(err=> res.status(404).json())
    ;

});



//@route    DELETE api/profile/education/:edu_id
//@desc     DELETE education from profile
//@access   Private

router.delete('/education/:edu_id',passport.authenticate('jwt', {session: false}), (req, res) =>{ 


    Profile.findOne({user: req.user.id})
    .then(profile => {
        //Get remove index
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

        //Splice
        profile.education.splice(removeIndex, 1);

        //Save
        profile.save().then(profile => res.json(profile));
      
        
    })
    .catch(err=> res.status(404).json())
    ;

});


//@route    DELETE api/profile/
//@desc     DELETE user and profile
//@access   Private

router.delete('/',passport.authenticate('jwt', {session: false}), (req, res) =>{ 


    Profile.findOneAndRemove({user: req.user.id})
    .then(()=> {
        User.findOneAndRemove({_id: req.user.id}).then(
            () => res.json({success: true})
        );

    });
  

});



module.exports = router;
