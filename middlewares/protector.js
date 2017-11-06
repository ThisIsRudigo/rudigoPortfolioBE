
var config = require('../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

var customCallback = function(req, res, next, error, data){
    console.log(req.query);
    if(error === 'ERROR_NO_TOKEN'){
        res.badRequest('No token provided');
    }
    else if (error === 'ERROR_INVALID_TOKEN'){
        res.badRequest('Supplied token is invalid');
    }
    else if (error){
        console.log(error);
        res.serverError('Something unexpected happened')
    }
    else if (data.error){
        res.badRequest('An unexpected error occurred trying to verify your identity.');   
    }
    else {
        req.user = data;
        next();
    }
};
const serviceAccount = require('../service_account.json');
const protector = firebase.protect(serviceAccount, customCallback);

exports.protect = protector;