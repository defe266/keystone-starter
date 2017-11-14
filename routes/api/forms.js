var keystone = require('keystone');
var Email = require('keystone-email');


module.exports.contact = function(req, res, next){

	keystone.list('User').model.find({receiveContacts : true}, 'name email').lean().then((data) => {

		if(data.length > 0){

			var locals = req.body;
			var recipients = data.map((i) => i.email);

			new Email('templates/emails/contact.ejs', { 

				transport: 'mailgun' 

			}).send(locals, {
				
				to: recipients,
				from: {
					name: 'WEB',
					email: 'web@'+process.env,
				},
				subject: 'Nuevo contacto ['+locals.name+']',

				'h:Reply-To': locals.email,

		  	}, function(err,result){

		  		if(err) return next(err)

		  		res.json({result : result})	
		  	});
		  	
		}else{

			res.json({msg : 'ok'})	
		}

	}).catch(next)
}