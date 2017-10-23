
var express = require('express');
var router = express.Router();

var config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

// var protector = require('../../middlewares/protector');

var User = require('../../models/user');


/** ENDPOINT FOR REGISTRATION */
router.post('/admin', function(req,res){
 
       var email = req.body.email;
       var password = req.body.password;
       var name = req.body.name;
       var accountType = req.body.accountType;
       var studentType = req.body.studentType;
    

    if (typeof(email) !== 'string'){
        return res.badRequest('Email is required');
    }
   
     if (typeof(password) !== 'string'){
        return res.badRequest('Password is required');
    }
     if (typeof(name) !== 'string' || name.trim().length < 2){
        return res.badRequest('Name is required');
    }
    if (typeof(accountType) !== 'string'){
        return res.badRequest('Account type is required');
    }
   

    var allowedAccountTypes = ["student", "admin", "owner"];
    if (accountType && allowedAccountTypes.indexOf(accountType.toLowerCase()) < 0){
        return res.badRequest("Account type is required");
    }

    var allowedStudentTypes = ["local", "remote"];
    

    if (accountType == "student" && typeof(studentType) !== 'string'){

            return res.badRequest('Student type is required');
    
        if (studentType !== allowedStudentTypes.indexOf(studentType.toLowerCase()) < 0){
            return res.badRequest('Please select from the given options for student type !');
        }
      }
    // if (studentType && allowedStudentTypes.indexOf(studentType.toLowerCase()) < 0){

    //         return res.badRequest("Student type is required");
    //     }
    
   

   
    var extras = {
        name: name,
        requestVerification: true
    };

    firebase.registerWithEmail(email, password, extras, function(err,response){
        if(err){
            console.log(err);
            return res.badRequest(err.message);
        }

        var info = {
            _id: response.user.id,
            name: response.user.displayName,
            email: response.user.email,
            accountType: accountType,
            studentType: studentType,
        };

        User.create(info, function(err){
            if(err){
                console.log(err);
                return res.badRequest("Something unexpected happened");
            }
            var info = {
                name: response.user.displayName,
                accountType:response.user.accountType,
                token: response.token,
                refreshToken: response.refreshToken,
                expiryMilliseconds:response.expiryMilliseconds
            };
            res.success(info);
        });
    });
});

router.post('/business', function(req, res){
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        businessType = req.body.businessType;

    if (typeof(email) !== 'string'){
        return res.badRequest('Email is required');
    }
    if (typeof(password) !== 'string'){
        return res.badRequest('Password is required');
    }
    if (typeof(name) !== 'string'|| name.trim().length < 2){
        return res.badRequest('Name is required');
    }
    if (typeof(businessType) !== 'string'){
        return res.badRequest('businessType is required');
    }

    var extras = {
        name: name,
        requestVerification: true
    };

    firebase.registerWithEmail(email, password, extras, function(err,response){
        if(err){
            console.log(err);
            return res.badRequest(err.message);
        }

        var info = {
            _id: response.user.id,
            name: response.user.displayName,
            email: response.user.email
        };

        User.create(info, function(err, user){
            if(err){
                console.log(err);
                return res.badRequest("Something unexpected happened");
            }
            var info = {
                name: user.displayName,
                accountType: user.accountType,
                businessType: user.businessType,
                token: response.token,
                refreshToken: response.refreshToken,
                expiryMilliseconds: response.expiryMilliseconds
            };

            res.success(info);
        });
    });
});



module.exports = router;