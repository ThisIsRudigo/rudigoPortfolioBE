
var config = require('../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

var customCallback = function(req, res, next, error, data){
    if(error === 'ERROR NO TOKEN'){
        res.badRequest('No token provieded');
    }
    else if (error === 'ERROR INVALID TOKEN'){
        res.badRequest('Supplied token is invalid');
    }
    else if (error){
        console.log(error);
        res.serverError('Something unexpected happen')
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