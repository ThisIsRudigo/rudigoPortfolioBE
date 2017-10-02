// // var config = require('../config');
// // var FirebaseAuth = require('firebaseauth');
// // var firebase = new FirebaseAuth(config.FIREBASE_API_KEY);
// // var acl = require(acl);

// // acl.allow([
// //     {
// //         roles:['owner', 'admin', 'business', 'student'],
// //         allows:[
// //             {resources: '/account/profile', permissions:'*'},
// //         ]
// //     }
// // ])

// var acl = require('acl');
// acl.allow('owner',['/account/profile','/account/profile/update'], '*');
// acl.allow('admin',['/account/profile','/account/profile/update'],['post,get,put']);
// acl.allow('business',['/account/profile','/account/profile/update'],['post,get,put']);
// acl.allow('student',['/account/profile','/account/profile/update'],'get');

// // exports.roleAuthorization = function( requiredRole){
// //     return function (req, res, next) {
// //         var user = req.user;

// //         User.findById(user._id, (err, foundUser) =>{
// //             if(err) {
// //                 return res.serverError('Something unexpected happened!')
// //             }
// //             if(!user){
// //                 return res.badRequest({ error: 'No user was found.'});
// //             }
// //             // If user is found, check role
// //             if (getRole(founderUser.role) >= getRole(requiredRole)){
// //                 return next();
// //             }

// //             return res.badRequest({ error: 'You are not authorized to perform this operation.'})
// //         });
// //     };
// // }
// module.exports = acl;