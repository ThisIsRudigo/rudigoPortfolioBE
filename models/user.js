
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fields = {
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
            type: String,
            required: true
    },
    phoneNumber: String,
    photo: String,
    address: String,
    accountType:{
        type: String,
        enum: ["owner","admin","business","student"],
        required: true,
        default: "business"
    },
    role: String,
    businessType: String,
    studentType:  {
        type: String,
        enum: ["local","remote"],   
    },
    stack: {
        type: String,
        enum:["front end web","back end web","android","uiux"],
    },
    week: String,
    rating: Number,
   
};

var User = new Schema(fields, { timestamps: true});

module.exports = mongoose.model('User', User);