
var express = require('express');
var router = express.Router();

var config = require('../../config');
var FirebaseAuth = require('firebaseauth');
var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);
const protector = require('../../middlewares/protector');
var User = require('../../models/user');




function allow(accountType){
    return function(req, res, next){
        var userId = req.user.id;
        User.findById(userId, function(err, user){
            if (err){
                console.log(err);
                return res.badRequest('something unexpected happened');
            }

            if (user && accountType.split(',').indexOf(user.accountType) >= 0){
                req.user = user;
                return next();
            }
            
            res.unauthorized('You are not authorized to perform this operation');
        })
    };
}

/** ENDPOINT FOR GETTING PROFILE OF ALL STUDENTS */

/**
* @swagger
* definition:
*       Users:
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
*           accountType: 
*             type: string
*             title: "Account Type"
*           studentType:
*             type: string
*             title: "Student Type"
*           stack:
*               type: string
*               title: "stack"
*/ 
/**
 * @swagger
 * securityDefinition:
 *        
 *      apiKeyAuth: 
 *        type:  apiKey
 *        name: 'x-access-token'
 *        in: 'header'
 *      
 *      
 * 
 * 
 */           
/**
 * @swagger
 * /account/profile/students:
 *   get:
 *     summary: "This endpoint returns the entire students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *      
 *       
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students', protector.protect,function(req,res){

    User.find({accountType: "student"},function(err,user){
        if(err){
            console.log(err);

            return res.bad("Something unexpected happened");
        }

        if(!user){
            return res.badRequest("User profile not set up.");
        }

        res.success(user);
    });
//    } else{
       
//        res.badRequest("something terrible happened")
//    }
});

/**
 * @swagger
 * /account/profile/students/FEW:
 *   get:
 *     summary: "This endpoint returns the front end web students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *       
 *       
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students/FEW', protector.protect,function(req,res){
    
        User.find({stack: "front end web"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });

/**
 * @swagger
 * /account/profile/students/BEW:
 *   get:
 *     summary: "This endpoint returns back end web students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security:
 *          - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students/BEW', protector.protect,function(req,res){
    
        User.find({stack: "back end web"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });

/**
 * @swagger
 * /account/profile/students/android:
 *   get:
 *     summary: "This endpoint returns the android students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students/android', protector.protect,function(req,res){
    
        User.find({stack: "android"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });

/**
 * @swagger
 * /account/profile/students/UIUX:
 *   get:
 *     summary: "This endpoint returns the UI/UX students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students/UIUX', protector.protect,function(req,res){
    
        User.find({stack:"UIUX"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });

/**
 * @swagger
 * /account/profile/students/local:
 *   get:
 *     summary: "This endpoint returns the local students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/students/local', protector.protect,function(req,res){
    
        User.find({studentType: "local"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });

/**
 * @swagger
 * /account/profile/students/remote:
 *   get:
 *     summary: "This endpoint returns the remote students"
 *     tags:
 *      - Students
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */    
router.get('/students/remote', protector.protect,function(req,res){
    
        User.find({studentType: "remote"},function(err,user){
            if(err){
                console.log(err);
    
                return res.bad("Something unexpected happened");
            }
    
            if(!user){
                return res.badRequest("User profile not set up.");
            }
    
            res.success(user);
        });
    
    });
/** ENDPOINT FOR GETTING ALL USERS */

/**
 * @swagger
 * /account/profile/all:
 *   get:
 *     summary: "This endpoint returns the entire profile in the database"
 *     tags:
 *      - Users
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "An array of users."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/all', protector.protect, allow("owner,admin"),function(req,res){
   
    User.find({},function(err,user){
        if(err){
            // console.log(err);

            return res.serverError("Something unexpected happened")
        }

        if(!user){
            return res.badRequest("User profile not set up.");
        }

       res.success(user);
    });
    
});


/** ENDPOINT FOR GETTING LOGGED IN USER */

/**
 * @swagger
 * /account/profile:
 *   get:
 *     summary: "This endpoint returns the logged in user"
 *     tags:
 *      - Users
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: "Logged in user."
 *         schema:
 *           $ref: "#/definitions/Users"
 */
router.get('/', protector.protect,function(req,res){

    User.findById(req.user.id, function(err,user){
        if(err){
            // console.log(err);

            return res.serverError("Something unexpected happened")
        }

        if(!user){
            return res.badRequest("User profile not set up.");
        }

        res.success(user);
    });
});


/** ENDPOINT FOR GETTING A STUDENT */

/**
 * @swagger
 * /account/profile/student/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Returns a single student
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         description: Student's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single student
 *         schema:
 *           $ref: '#/definitions/Users'
 */

router.get('/student/:id', protector.protect, allow('owner,admin,business,student'), function(req,res){
    
    var allowedAccountTypes = ["owner", "admin", "business"];
    var requestAccountTypes = ["student", "business"];


    User.findById(req.params.id, function(err,userToGet){
        if (err){

            return;
        }

        if (allowedAccountTypes.indexOf(userToGet.accountType) >= 0 &&  requestAccountTypes.indexOf(req.user.accountType) >=0){
            return res.unauthorized("You cannot perform this operation !");
        }
            User.findById(req.params.id, function(err,user){

                if(err){
            // console.log(err);

            return res.serverError("Something unexpected happened")
        }

        if(!user){
            return res.badRequest("User profile not found.");
        };

        res.success(user);
    });
        
    });
    //  };
});

/** ENDPOINT FOR GETTING A USER */

/**
 * @swagger
 * /account/profile/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a specific user
 *     produces:
 *       - application/json
 *     security: 
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single user
 *         schema:
 *           $ref: '#/definitions/Users'
 */

router.get('/:id', protector.protect, allow("owner,admin"), function(req,res){

    User.findById(req.params.id, function(err,user){
        if(err){
            // console.log(err);

            return res.serverError("Something unexpected happened")
        }
// checking if not user
        if(!user){
            return res.badRequest("User profile not set up.");
        }

        res.success(user);
    });
});

/** ENDPOINT FOR UPDATING PROFILE OF CURRENTLY LOGGED IN USER */
/**
 * @swagger
 * /account/update:
 *   put:
 *     tags: Users
 *     description: Updates the logged in user
 *     produces: application/json
 *     parameters:
 *       name: user
 *       in: body
 *       description: Fields for the User resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully updated
 */


router.put('/update', protector.protect,allow('owner,admin,business'), function(req,res){

    var name = req.body.name,
        address =  req.body.address,
        role = req.body.role,
        phoneNumber = req.body.phoneNumber,
        stack = req.body.stack,
        week = req.body.week,
        businessType = req.body.businessType,
        photo = req.body.photo,
        rating = req.body.rating;

    if (!(name || address || phoneNumber || role || stack || week || businessType || photo || rating)){
        return res.badRequest("please select the fields you want to update");
    }  
    
     if (name && typeof(name) !== 'string'|| name.trim().length < 2 || name.trim().indexOf(' ') <= 0){
        return res.badRequest('Name must be a string with at least 3 characters');
           
    }
    
    if (address && typeof(address) !== 'string'){
        return res.badRequest('address must be a string');
    }

    if (photo && typeof(photo) !== 'string'){
        return res.badRequest('photo is required');   
    }
    
     if (stack && typeof(stack) !== 'string'){
        return res.badRequest('stack must be a string.');
    }
    
      if (phoneNumber && typeof(phoneNumber) !== 'string'){
        return res.badRequest('phone number is required');
    }
    
     if (week && typeof(week) !== 'number'){
        return res.badRequest('week must be a number');   
    }
   
    if (role && typeof(role) !== 'string'){
        return res.badRequest('role must be a string.');
    }

    if (businessType && typeof(businessType) !== 'string'){
        return res.badRequest('business type must be a string.');
    }

    if (rating && typeof(rating) !== 'number'){
        return res.badRequest('business type must be a number.');
    }

    
    var profile = {};

    if (name)
        profile.name = name.trim();;
    if (address)
        profile.address = address.trim();
    if (photo)
        profile.photo = photo;
    if (stack)
        profile.stack = stack.trim();
    if (phoneNumber)
        profile.phoneNumber = phoneNumber.trim();
    if (week)
        profile.week = week.trim();
    if (role)
        profile.role = role.trim();
    if (businessType)
        profile.businesssType = businessType.trim();
    if (rating)
        profile.rating = rating.trim();
    
    User.findByIdAndUpdate(req.user.id,  {$set: profile}, {$new: true}, function(err, user) {

    if (err) {
        console.log(err);
        return res.serverError("Something unexpected happened");
    }

    if (!user) {
        console.log(err);
        return res.badRequest("User profile not set up.");
    }

      var info = {
            photo: user.photo,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
            phone:user.phoneNumber,
            stack:user.stack,
            week: user.week,
            businessType: user.businessType,
            rating: user.rating,
     };

        if (name){
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            firebase.updateProfile(token, name, function (err) {
                if (err) {
                    console.log(err);
                     return res.serverError("Oops! something happened");
                }
                
                res.success(info);
            });
        }
        else{
            
            res.success(info);
        }
    })
});

/** ENDPOINT FOR UPDATING PROFILE OF A SINGLE USER */
/**
 * @swagger
 * /account/update/{id}:
 *   put:
 *     tags: Users
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       name: user
 *       in: body
 *       description: Fields for the User resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully updated
 */


router.put('/update/:id', protector.protect,allow('owner,admin'), function(req,res){
    User.findById(req.params.id, function(err,userToUpdate){
        if (err){
            return;
        }

        var allowedAccountTypes = ["owner", "admin"];

        if (allowedAccountTypes.indexOf(userToUpdate.accountType) >= 0 && req.user.accountType == "admin"){
            return res.unauthorized("Admins cannot update owner or another admin's account")
        }
    
            var name = req.body.name,
            address =  req.body.address,
            role = req.body.role,
            phoneNumber = req.body.phoneNumber,
            stack = req.body.stack,
            week = req.body.week,
            businessType = req.body.businessType,
            photo = req.body.photo,
            rating = req.body.rating;


    if (!(name || address || phoneNumber || role || stack || week || businessType || photo || rating)){
        return res.badRequest("please select the fields you want to update");
    }  
    
    if (name && typeof(name) !== 'string'){
        return res.badRequest('Name  must be a string ');       
    }
    
    if (address && typeof(address) !== 'string'){
        return res.badRequest('address must be a string.');
    }

    if (photo && typeof(photo) !== 'string'){
        return res.badRequest('photo is required');   
    }
    
    if (stack && typeof(stack) !== 'string'){
        return res.badRequest('stack must be a string.');
    }
    
    if (phoneNumber && typeof(phoneNumber) !== 'string'){
        return res.badRequest('phone number is required');
    }
    
    if (week && typeof(week) !== 'number'){
        return res.badRequest('week must be a number.');   
    }
   
    if (role && typeof(role) !== 'string'){
        return res.badRequest('role must be a string.');
    }

    if (businessType && typeof(businessType) !== 'string'){
        return res.badRequest('business type must be a string.');
    }

    if (rating && typeof(rating) !== 'number'){
        return res.badRequest('business type must be a number.');
    }

    
    var profile = {};

    if (name)
        profile.name = name.trim();
    if (address)
        profile.address = address.trim();
    if (photo)
        profile.photo = photo;
    if (stack)
        profile.stack = stack.trim();
    if (phoneNumber)
        profile.phoneNumber = phoneNumber.trim();
    if (week)
        profile.week = week;
    if (role)
        profile.role = role.trim();
    if (businessType)
        profile.businesssType = businessType.trim();
    if (rating)
        profile.rating = rating;
    
        
    User.findByIdAndUpdate(req.params.id,  {$set: profile}, {$new: true}, function(err, user) {
                
    if (err) {
        console.log(err);
        return res.serverError("Something unexpected happened");
    }

    if (!user) {
        console.log(err);
        return res.badRequest("User profile not set up.");
    }

      var info = {
            photo: user.photo,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
            phone:user.phoneNumber,
            stack:user.stack,
            week: user.week,
            businessType:user.businessType,
            rating: user.rating,
        };

            if (name){
                var token = req.body.token || req.query.token || req.headers['x-access-token'];
                firebase.updateProfile(token, name, function (err) {
                    if (err) {
                        console.log(err);
                        return res.serverError("Something shitty happened");
                    }
                    
                    res.success(info);
                });
            }
            else{
                
                res.success(info);
            }
        })
    });
});

/* DELETES A SPECIFIC USER FROM THE DATABASE */


/**
 * @swagger
 * /account/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */

router.delete('/:id',protector.protect, allow('owner,admin'),function(req,res){
  
        User.findById(req.params.id, function(err, userToDelete){
            if (err){

                return;
            }
            
            var allowedAccountTypes = ["owner", "admin"];

            if (allowedAccountTypes.indexOf(userToDelete.accountType) >=0 && req.user.accountType == "admin"){
                return res.unauthorized("Admin cannot delete admin or owner account");
            }
                 User.remove(req.params.id, function(err, user){
                    if (err){
                        return res.serverError("something unexpected happened")
                    }
                    if (!user){
                        return res.badRequest("User not found")
                    }
                    res.success(user);
            });
            
   });

   
});

/** ENDPOINT FOR REQUESTING PASSWORD CHANGE */
router.post('/edit_password', function(req,res){

    var password = req.body.password;

    if (typeof(password) !== 'string'){
        return res.badRequest('password is required');
    }

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    firebase.changePassword(token, password, function(err, authData){
        if(err){
            return res.serverError(err.message);
        }
        else
            var info = {
                token: authData.token,
                refreshtoken: authData.refreshToken
            };
            res.success(info);
    });
});
        
module.exports = router;

