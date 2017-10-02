
exports.checkPostBody = function(req, res, next){
    var name = req.body.name;

    next()
}

exports.setupResponder = function(req, res, next)
{
	res.reply = function(response, code){
		if (code)
			res.status(code);
		else if (response.code)
			res.status(response.code);
		else
			res.status(200);

		res.send(response);
	};

	res.success = function(data){
		if (!res.headersSent){
			var response = {
				status: "success",
				code: 200,
				data: data
			};
			
			res.reply(response);
		}
	};

	//some error not due to server
	res.serverError = function(error){
		if (!res.headersSent){
			var response = {
				status: "error",
				description: "Server Error",
				code: 500,
				error: error
			};
			
			res.reply(response);
		}
	};

	//token failed validation or was not supplied
	res.unauthorized = function(error){
		if (!res.headersSent){
			var response = {
				status: "error",
				description: "Unauthorized",
				code: 401,
				error: error
			};
			
			res.reply(response);
		}
	};

	//user caused error, improper or invalid request
	res.badRequest = function(error){
		if (!res.headersSent){
			var response = {
				status: "error",
				description: "Bad Request",
				code: 400,
				error: error
			};
			
			res.reply(response);
		}
    };

	next();
};