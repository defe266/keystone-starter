var keystone = require('keystone');
var Upload = keystone.list('Upload').model;


exports.tinyvisionList = function(req, res, next) {

	var type = req.query.type;//type: image file media
	var q = req.query.q;


	var conditions = {

		'file.mimetype': { $regex : type, $options : 'i'}
	}

	if(q){

		conditions._id = { $regex : q, $options : 'i'}
	}
	

	Upload.find(conditions,'_id').then((items) => {//,'file'


		res.json(items.map((item) => {

			return {
				"imageUrl": "/uploads/"+item._id+'/:/rs=w:150,h:150,m/cr=w:150,h:150)',
				"name": item._id,
				"value": "/uploads/"+item._id+'/:/',
			}

		}))

	}).catch(next)
  
}
