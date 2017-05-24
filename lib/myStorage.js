var keystone = require('keystone');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var utils = require('keystone-utils');
//var originalFilename = require('keystone-storage-namefunctions').originalFilename;


// Return the original filename provided in the file object with autoincrement
var originalFilenameAutoincrement = function (file, i, callback) {

  //return file.originalname;
  var originalname = file.originalname;
  var ext = path.extname(originalname);
  var baseName = originalname.replace(ext, '');
  var baseNameSlug = utils.slug(baseName);
  var nameSlug = baseNameSlug + ext

  //var filePath = path.resolve(__dirname, '../public/uploads/'+originalname); 
  var filePath = keystone.expandPath('./public/uploads/'+nameSlug)

  //console.log("originalname",originalname)
  //console.log("filePath",filePath)

  

  fs.stat(filePath, function(err, stat) {

    //console.log("???",err,stat)

      if(!err) {

        //var baseName = path.basename(originalname);
        


        return crypto.randomBytes(16, function (err, data) {

          if (err) return callback(err);

          var hash = data.toString('base64')
                          .replace(/\+/g, '-')
                          .replace(/\//g, '_')
                          .replace(/=/g, '')
                          .slice(0, 16);

          return callback(null, baseNameSlug + '-' + hash + ext);

        });


        //return callback(null, baseName + '-' + new Date().getTime() + ext);
        //path.basename(
      }

      if(err && err.code == 'ENOENT'){

        return callback(null, nameSlug);
      }

      return callback(err);
  });

  //return callback(null, filenameFromBuffer(data, file.extension));
};


module.exports = new keystone.Storage({

  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'),//keystone.expandPath('./uploads'),
    publicPath: '/uploads/uploads',
    generateFilename: originalFilenameAutoincrement,
    //publicPath: '/public/uploads',
    //publicPath: '/public/uploads2',
    //publicPath: '/uploads',//public/
  },
  schema: {
    originalname: true,
    url: true,
  }
});