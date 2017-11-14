module.exports.getDbFiltering = function(req, next) {

    if(req.protected && !req.user) return next(new Error('Auth needed!'));

    var filter;
    if (req.query.filter) {

        //# si venía codificado lo parseamos, sino  lo dejamos como está
        filter = typeof req.query.filter == 'string' ? JSON.parse(req.query.filter) : req.query.filter;
    }

    // Assure user can only see stuff from his site
    if(req.protected){

        //filter = Object.assign({}, filter, {customer: req.user.customer._id});
    }


    var fields;
    if (req.query.fields) {

        //# si venía codificado lo parseamos, sino  lo dejamos como está
        fields = typeof req.query.fields == 'string' ? JSON.parse(req.query.fields) : req.query.fields;
    }

    let pagination;
    if (req.query.limit && req.query.limit != -1 && req.query.page) {
        let pageSize = Number.parseInt(req.query.limit) || 50;
        let page = Number.parseInt(req.query.page) || 1;
        pagination = {
            skip : (page - 1) * pageSize,
            limit : pageSize
        }
    } else {
       pagination = undefined;
    }

    // https://github.com/buunguyen/mongoose-deep-populate
    var populatePaths = req.query.populate;

    var sort;
    if (req.query.sort) {
        sort = JSON.parse(req.query.sort);
    }

    var fieldsToUpdate;
    if (req.query.fieldsToUpdate) {
        fieldsToUpdate = typeof req.query.fieldsToUpdate == 'string' ? JSON.parse(req.query.fieldsToUpdate) : req.query.fieldsToUpdate;
    }

    return {
        filter,
        fields,
        pagination,
        populatePaths,
        sort,
        fieldsToUpdate
    }
}

module.exports.getTotalPages = function(limit, resultCount) {
    return Math.ceil(resultCount / limit);
}
