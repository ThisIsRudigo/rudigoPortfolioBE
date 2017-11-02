var express = require('express');
var router = express.Router();

const config = require('../../config');
const FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

const validator = require('../../utils/validator');
// var protector = require('../../middlewares/protector');

var User = require('../../models/user');

/** ENDPOINT FOR REGISTRATION */
router.post('/admin', function(req,res) {

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var accountType = req.body.accountType;
    var studentType = req.body.studentType;
    var stack = req.body.stack;

    var validated = validator.isValidEmail(res, email) &&
                    validator.isValidPassword(res, password) &&
                    validator.isFullname(res, name);

    if (!validated)
        return;

    var allowedAccountTypes = ["student", "admin", "owner"];
    var allowedStudentTypes = ["local", "remote"];
    var allowedStackTypes = ["front end web", "back end web", "android", "ui/ux"];

    if (accountType && allowedAccountTypes.indexOf(accountType.toLowerCase()) < 0) {
        return res.badRequest("Account type is required");
    }
    if (studentType && allowedStudentTypes.indexOf(studentType.toLowerCase()) < 0) {
        return res.badRequest('Please select from the given options for student type !');
    }
    if (stack && allowedStackTypes.indexOf(stack.toLowerCase()) < 0) {
        return res.badRequest('Please select from the given options for student stack !');
    }

    var extras = {
        name: name,
        requestVerification: true
    };

    firebase.registerWithEmail(email, password, extras, function (err, response) {
        if (err) {
            console.log(err);
            return res.badRequest(err.message);
        }

        var info = {
            _id: response.user.id,
            name: response.user.displayName,
            email: response.user.email,
            accountType: accountType
        };

        if (accountType !== "student") {
            mongodbRegister(info, response, function (errorMessage, result) {
                if (err) {
                    console.log(err);
                    return res.badRequest(errorMessage);
                }
                else {
                    res.success(result);
                }
            });
        }else {

            info.studentType = studentType;
            info.stack = stack;
            mongodbRegister(info, response, function (errorMessage, result) {
                if (err) {
                    console.log(err);
                    return res.badRequest(errorMessage);
                }
                else {
                    res.success(result);
                }
            });
        }
    });
});


router.post('/business', function(req, res){
    var email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        businessType = req.body.businessType;

    var validated = validator.isValidEmail(res, email) &&
        validator.isValidPassword(res, password) &&
        validator.isFullname(res, name);

    if (!validated)
        return;

    if (typeof(businessType) !== 'string'){
        return res.badRequest('businessType is required');
    }

    var extras = {
        name: name,
        requestVerification: true
    };

    firebase.registerWithEmail(email, password, extras, function(err, response){
        if(err){
            console.log(err);
            return res.badRequest(err.message);
        }

        var info = {
            _id: response.user.id,
            name: response.user.displayName,
            email: response.user.email,
            businessType: businessType
        };
        mongodbRegister(info, response, function(errorMessage, result){
            if(err){
                console.log(err);
                return res.badRequest(errorMessage);
            }
            else {
                res.success(result);
            }
        });
    });
});

function mongodbRegister (info, response, callback){

    User.create(info, function(err, user){
        if(err){
            console.log(err);
            return callback ("Something unexpected happened");
        }

        var result = {
            name: user.name,
            accountType: user.accountType,
            businessType: user.businessType,
            token: response.token,
            refreshToken: response.refreshToken,
            expiryMilliseconds: response.expiryMilliseconds
        };

        return callback(null, result);
    });
}

module.exports = router;