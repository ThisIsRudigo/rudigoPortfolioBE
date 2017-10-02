
var express = require('express');
var router = express.Router();

var config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

/** ENDPOINT FOR REQUESTING PASSWORD CHANGE USING EMAIL */
router.post('/password', function(req,res){
    var email = req.body.email;

    if (typeof(email) !== 'string'){
        return res.badRequest('Email is missing or invalid');
    }

    firebase.sendPasswordResetEmail(email, function(err){
        if(err){
            return res.badRequest(err.message);
        }
        res.success('An email has been sent to '+ email+ ' with the procedure.')
    })
});

/**  ENDPOINT FOR UPDATING PASSWORD ONCE THE PASSWORD RESET EMAIL HAS BEEN SENT */
router.post('/password/change', function(req,res){

    var oobCode = req.body.oobCode;
    var newPassword = req.body.newPassword;

    if (typeof(newPassword) !== 'string' || newPassword.length < 6){
        return res.badRequest('New password is required and must be at least 7 characters long');
    }
    if(typeof(oobCode) !== 'string'){
        return res.badRequest('oobCode is required');
    }

    firebase.resetPassword(oobCode, newPassword, function(err){
        if (err){
            return res.badRequest(err.message);
        }
        res.success_('Password changed successfully !')
    })
});

module.exports = router;