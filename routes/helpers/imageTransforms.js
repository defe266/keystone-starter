var imgSteamHandler = require('../../lib/imgSteamHandler.js');
var path = require('path');
var fs = require('fs');


module.exports = function(req, res, next){

	var file = req.url.split('/:/')[0];
	var filePath = path.resolve(__dirname, '../../public'+file);

	//console.log('1',filePath);

	//fs.exists(file, function(exists) {

	fs.access(filePath,function(err){

		if (err) return next();

		imgSteamHandler(req,res);
	});

}