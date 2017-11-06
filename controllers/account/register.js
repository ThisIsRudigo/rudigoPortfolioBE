
var express = require('express');
var router = express.Router();

var config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);

// var protector = require('../../middlewares/protector');

var User = require('../../models/user');


/** ENDPOINT FOR REGISTRATION */

/**
 * @swagger
 * definition:
 *       Admin:
 *         properties:
 *           name:
 *             type: string
 *             title: "Name"
 *           password:
 *             type: string
 *             title: "Password"
 *           email:
 *             type: string
 *             title: "Email"
 *           accountType:
 *             type: string
 *             title: "Account Type"
 *             enum:
 *             - "admin"
 *             - "student"
 *           studentType:
 *             type: string
 *             title: "Student Type"
 *             enum:
 *             - "local"
 *             - "remote"
 *           stack: 
 *             type: string
 *             title: "Student's Stack"
 *             enum:
 *             - "front end web"
 *             - "back end web"
 *             - "android"
 *             - "uiux"
 *          
 *           example: {
 *             name: TrippleSoft ICT,
 *             password: qwertyuio12345@rt,
 *             email": TrippleSoftICT@gmail.com,
 *             accountType: student,
 *             studentType: local,
 *             stack: back end web
 *            }
 */

/**
 * @swagger
 * account/register/admin:
 *   post:
 *     summary: Registers a new admin or student
 *     description:
 *       "This endpoint registers a new admin or student to Rudigo Portfolio"
 *     tags:
 *       - Register
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         type: string
 *         schema: 
 *           $ref: "#/definitions/Admin"
 *         model: {
 *            "name": "TrippleSoft ICT",
 *            "password": "qwertyuio12345@rt",
 *            "email": "TrippleSoftICT@gmail.com",
 *            "accountType":"admin"
 *            }
 *     responses:
 *      
 *       409:
 *         description: When the email is already in use
 *     securityDefinitions:
 *       jwtToken:
 *         description: "A JWT short-lived token containing key information about the user.\
 *           \ It is created every time a user is authenticated and lasts 10 minutes. Its\
 *           \ renewed automatically each time a non-public endpoint is called with a valid\
 *           \ Refresh-Token header."
 *         type: "apiKey"
 *         name: "Authorization"
 *         in: "header"
 *       refreshToken:
 *         description: "A long-lived token containing information account user session.\
 *           \ It is generated every time a user is authenticated, and lasts 30 days. Also,\
 *           \ if user changes its role or password, of if there is any suspect of replay\
 *           \ attack, all tokens are revoked"
 *         type: "apiKey"
 *         name: "Refresh-Token"
 *         in: "header"
 *     
 */
router.post('/admin', function(req,res){
 
       var email = req.body.email;
       var password = req.body.password;
       var name = req.body.name;
       var accountType = req.body.accountType;
       var studentType = req.body.studentType;
       var stack = req.body.stack;
    

    if (typeof(email) !== 'string' ){
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
    var allowedStackTypes = ["front end web", "back end web", "android", "uiux"];

    if (accountType == "student" && typeof(studentType) !== 'string'){

            return res.badRequest('Student type is required');

            if (studentType !== allowedStudentTypes.indexOf(studentType.toLowerCase()) < 0){
                return res.badRequest('Please select from the given options for student type !');

        }  
      }
    if (accountType == "student" && typeof(stack) !== 'string'){

             return res.badRequest('Student Stack is required');

            if (stack !== allowedStackTypes.indexOf(stack.toLowerCase()) < 0){
                return res.badRequest('Please select from the given options for student stack !');
            
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
            stack: stack,
        };

        User.create(info, function(err, user){
            if(err){
                console.log(err);
                return res.badRequest("Something unexpected happened");
            }
            var info = {
                name: user.name,
                accountType: user.accountType,
                token: response.token,
                refreshToken: response.refreshToken,
                expiryMilliseconds:response.expiryMilliseconds
            };
            res.success(info);
        });
    });
});

/**
 * @swagger
 * definition:
 *       NewBusiness:
 *         properties:
 *           name:
 *             type: string
 *             title: "Name"
 *           password:
 *             type: string
 *             title: "Password"
 *           email:
 *             type: string
 *             title: "Email"
 *           businessType:
 *             type: string
 *             title: "Business Type"
 *           example: {
 *             "name": "TrippleSoft ICT",
 *             "password": "qwertyuio12345@rt",
 *             "email": "TrippleSoftICT@gmail.com",
 *             "businessType":"Tech"
 *            }
 * 
 * 
 *       UserJWT:
 *          type: object
 *          properties:
 *            token:
 *              type: string
 *              description: A short-lived token containing...
 *              title: Token
 *            refresh_token: 
 *              type: string
 *              description: A long-lived token containing ...
 *              title: Refresh Token
 *            user: 
 *              $ref: "#/definitions/NewBusiness"
 */

/**
 * @swagger
 * /account/register/business:
 *   post:
 *     summary: Registers a new business
 *     description:
 *       "This endpoint registers a new business to Rudigo Portfolio"
 *     tags:
 *       - Register
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         type: string
 *         schema: 
 *           $ref: "#/definitions/NewBusiness"
 *         model: {
 *            "name": "TrippleSoft ICT",
 *            "password": "qwertyuio12345@rt",
 *            "email": "TrippleSoftICT@gmail.com",
 *            "businessType":"Tech"
 *            }
 *     responses:
 *       201:
 *         description: The JWT token representing user session
 *         schema: 
 *           $ref: "#/definitions/UserJWT"
 *         headers:
 *           Authorization: 
 *             type: string
 *             description: A JWT short-lived token...
 *           Refresh-Token: 
 *             type: string
 *             description: A long-lived token ...
 *       409:
 *         description: When the email is already in use
 *     securityDefinitions:
 *       jwtToken:
 *         description: "A JWT short-lived token containing key information about the user.\
 *           \ It is created every time a user is authenticated and lasts 10 minutes. Its\
 *           \ renewed automatically each time a non-public endpoint is called with a valid\
 *           \ Refresh-Token header."
 *         type: "apiKey"
 *         name: "Authorization"
 *         in: "header"
 *       refreshToken:
 *         description: "A long-lived token containing information account user session.\
 *           \ It is generated every time a user is authenticated, and lasts 30 days. Also,\
 *           \ if user changes its role or password, of if there is any suspect of replay\
 *           \ attack, all tokens are revoked"
 *         type: "apiKey"
 *         name: "Refresh-Token"
 *         in: "header"
 *     
 */
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

        // if(!user){
        //     return res.success ({
        //         newUser: true,
        //         name: response.user.displayName,
        //         photo: response.user.photoUrl,
        //         token: response.token
        //     })
        // }

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