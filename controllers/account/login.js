
var express = require('express');
var router = express.Router();

var config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

var User = require('../../models/user');

/** END POINT FOR LOGIN WITH EMAIL */
router.post('/', function(req,res){
   var email = req.body.email;
    var password = req.body.password;

    if (typeof(email) !== 'string'){
        return res.badRequest('Email is required');
    }
    if (typeof(password) !== 'string'){
        return res.badRequest('Password is required');
    }

    
    firebase.signInWithEmail(email, password, function(err, response){

        if(err){
            console.log(err);
            return res.badRequest(err.message);
        }

        User.findById(response.user.id, function(err,user){
            if(err){
                console.log(err);
                return res.badRequest("Something unexpected happened");
            }

            if(!user){
                return res.success ({
                    newUser: true,
                    name: response.user.displayName,
                    photo: response.user.photoUrl,
                    token: response.token
                })
            }

            var info ={
                name: response.user.displayName,
                accountType:user.accountType,
                token: response.token,
                refreshToken: response.refreshToken
            };

            res.success(info);
        });
    });
});

module.exports = router;