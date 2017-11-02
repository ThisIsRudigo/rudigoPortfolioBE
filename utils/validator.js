var validator = require('validator');

exports.isValidEmail = function(res, email, optional){
	if (!optional && !email) {
	    return res.badRequest('Email is required');
	}
	if (!validator.isEmail(email)){
        return res.badRequest('Email is required and must be string');
	}

	return true;
};

exports.isValidPhoneNumber = function(res, phone_number, optional){
    if (!optional && !phone_number) {
        return res.badRequest('Phone Number is required');
    }
    if (!validator.isMobilePhone(phone_number, 'any')){
        return res.badRequest('Phone Number is not valid')
    }

    return true;
};

exports.isAddress = function(res, address, optional){
    if (!optional && !address) {
        return res.badRequest('Address is required');
    }
    if (typeof(address) !== 'string' || address.trim().indexOf(' ') <= 0){
        return res.badRequest('Address must be a string and cannot be empty');
    }

    return true;
};

exports.isBio = function(res, bio, optional){
    if (!optional && !bio) {
        return res.badRequest('Address is required');
    }
    if (typeof(bio) !== 'string' || bio.trim().indexOf(' ') <= 0){
        return res.badRequest('Bio must be a string and cannot be empty');
    }

    return true;
};

exports.isValidPassword = function(res, password, optional){
	if (!optional && !password) {
	    return res.badRequest('Password is required');
	}
	if (typeof(password) !== 'string' || password.length < 6){
	    return res.badRequest('Invalid password. Must be 6 or more characters')
	}

	return true;
};

exports.isFullname = function(res, name, optional){
	if (!optional && !name) {
	    return res.badRequest('Name is required');
	}

    var validName = /^[a-z,A-Z]([-']?[a-z,A-Z]+)*( [a-z,A-Z]([-']?[a-z,A-Z]+)*)+$/.test(name); //https://stackoverflow.com/questions/11522529/regexp-for-checking-the-full-name
    if (!validName){
        return res.badRequest('Name is not valid or complete. Provide name in full');
    }

	return true;
};

exports.isUsername = function(res, username, optional){
    if (!optional && !username) {
        return res.badRequest('Name is required');
    }

    var validUsername = /^[a-zA-Z0-9_.-]{3,16}$/.test(username);
    if (!validUsername){
        return res.badRequest('Username is not valid please enter a valid username');
    }

    return true;
};

exports.isOverMinimumAge = function(res, d_o_b, optional){
	if (!optional && !d_o_b) {
	    return res.badRequest('Date of birth is required');
	}

	if (typeof(d_o_b) !== 'number'){
        return res.badRequest('Date of birth must be a valid timestamp (number)');
	}

	var today = new Date();
	var birthDate = new Date(parseInt(d_o_b));
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
	    age--;
	}

	if (age < 13){
		return res.badRequest('Minors cannot open accounts on teylormade. Minimum age requirement is 13 years');
	}

	return true;
};


