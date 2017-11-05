var express = require('express');
var router = express.Router();

// serve swagger
router.get('/', function(req,res,next){
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = router;