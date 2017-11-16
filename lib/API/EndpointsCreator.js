
const ErrorHandling = require('./ErrorHandling.js');
const DbFiltering = require('./DbFiltering.js');

module.exports = function(model){

	let previousPutOperation = Promise.resolve();

	let createFromArray = function(req, res, next) {

	    // need to think about error handling on bulk
	    model.create(req.body).then((results) => {

	      res.json(results);

	  }/*, (error) => {

	      console.log("errors: ",error);

	  }*/).catch(next);

	}

	let createSingle = function(req, res, next) {

		let { filter, fields, pagination, populatePaths, sort } = DbFiltering.getDbFiltering(req, next);
	    var newItem = new model(req.body);

	    newItem.save().then((item) => {

	    	if(populatePaths){

	    		item.populate(populatePaths).execPopulate().then((item) => res.json(item))

	    	}else{

	    		res.json(item);
	    	}

	    }, (error) => {

	        return ErrorHandling.HandleDbError(error, res, next);

	    }).catch(next);
	}


	return {

		get : function(req, res, next){//, keystone.middleware.api

			let { filter, fields, pagination, populatePaths, sort } = DbFiltering.getDbFiltering(req, next);

			var queryKey = req.query.getBy ? req.query.getBy : '_id';

			var conditionsBasic = {}

			conditionsBasic[queryKey] = req.params.id

			var conditions =  Object.assign(conditionsBasic, filter)

			var query = model.findOne(conditions, fields)

			if(populatePaths){

		    	query = query.populate(populatePaths)
		    }


		    query.then((item) => {

		        if (!item) return ErrorHandling.GenerateNotFound(res);

		    	res.json(item);

		    }).catch(next);


		},

		list : function(req, res, next){

			let { filter, fields, pagination, populatePaths, sort } = DbFiltering.getDbFiltering(req, next);

		    let query = model.find(filter, fields, pagination).sort(sort);

		    if(populatePaths){

		    	query = query.populate(populatePaths)
		    }

		    query.then((items) => {

		        if (!pagination) {

		            return items;
		        }

		        return model.find(filter).count().then((count) => {

		            res.set("X-Page-Count", DbFiltering.getTotalPages(pagination.limit, count));

		            return items;
		        });

		    }).then((items) => {

		        res.json(items);

		    }).catch(next);

		},


		post : function(req, res, next){

		    if( Object.prototype.toString.call(req.body) === '[object Array]' ) {

		        return createFromArray(req, res, next);
		    }

		    return createSingle(req, res, next);
		},


		put : function(req, res, next){

			//#! encadeno find + updates para asegurarme de que funcionan de forma atómica y prevenir un save anticipado de un model desactualziado (VersionError: No matching document found.)  (tal vez había que aislar encadenamientos con updates del mismo _id para reducir el potencial cuello de botella)
			previousPutOperation = previousPutOperation.then(() => {


				let { filter, fields, pagination, populatePaths, sort } = DbFiltering.getDbFiltering(req, next);

				var queryKey = req.query.getBy ? req.query.getBy : '_id';

				var conditionsBasic = {}

				conditionsBasic[queryKey] = req.params.id

				var conditions =  Object.assign(conditionsBasic, filter)

				var query = model.findOne(conditions)


			    return query.then((item) => {

			        if (!item) return ErrorHandling.GenerateNotFound(res);

			        delete req.body.__v

			        Object.assign(item, req.body);

			        return item.save()

			    }).then((item) => {

			        if(populatePaths){

		    			return item.populate(populatePaths).execPopulate().then((item) => res.json(item))

			    	}else{

			    		res.json(item);
			    	}

			    }, (error) => {

			        return ErrorHandling.HandleDbError(error, res, next);

			    }).catch(next);

			})

		},

        atomicPut: function(req, res, next){
            // to extract into a create like function to isolate from web layer ?
            let { filter, fieldsToUpdate, populatePaths } = DbFiltering.getDbFiltering(req, next);

            var query = model.findOneAndUpdate(
               filter,
               { $set: fieldsToUpdate },
               { new: true }
            );

            return query.then((item) => {
                if(populatePaths){
                    return item.populate(populatePaths).execPopulate().then((item) => res.json(item))
                }else{
                    res.json(item);
                }
            }, (error) => {
                return ErrorHandling.HandleDbError(error, res, next);
			}).catch(next);
        },

		remove : function(req, res, next){

			let { filter, fields, pagination, populatePaths, sort } = DbFiltering.getDbFiltering(req, next);

			var queryKey = req.query.getBy ? req.query.getBy : '_id';

			var conditionsBasic = {}

			conditionsBasic[queryKey] = req.params.id

			var conditions =  Object.assign(conditionsBasic, filter)

			var query = model.findOne(conditions)

			query.then((item) => {

		        if (!item) return ErrorHandling.GenerateNotFound(res);

		        return item.remove().then((item) => {

			        if(populatePaths){

		    			item.populate(populatePaths).execPopulate().then((item) => res.json(item))

			    	}else{

			    		res.json(item);
			    	}

			    })

		    }).catch(next);

		}

	}
}
