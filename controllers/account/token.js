var express = require('express');
var router = express.Router();

const config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

router.post('/', function(req, res){

    var refreshToken = req.body.refreshToken || req.query.refreshToken || req.headers['x-access-refreshToken'];

    if (typeof(refreshToken) !== 'string'){
        return res.badRequest('refreshToken is required');
    }

    firebase.refreshToken(refreshToken, function(err, response){
        if (err){
            //firebase errors come as object {code, message}, return only message
            return res.badRequest(err.message);
        }

        res.success(response);
    });
});


module.exports = router;