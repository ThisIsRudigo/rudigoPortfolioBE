
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
    businessType: String,
    role: String,
   
    address: String,
    businessType: String,
    stack: String,
    week: String,
    accountType:{
        type: String,
        enum: ["owner","admin","business","student"],
        required: true,
        default: "business"
    }
};

var User = new Schema(fields, { timestamps: true});

module.exports = mongoose.model('User', User);