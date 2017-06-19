module.exports = function forceLiveDomain(req, res, next) {
	
  if (req.headers && req.headers.host.slice(0, 4) === 'www.') {


    var newHost = req.headers.host.slice(4);


    return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }

   next();

}