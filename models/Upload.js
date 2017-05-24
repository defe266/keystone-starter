var keystone = require('keystone');
var Types = keystone.Field.Types;
var myStorage = require('../lib/myStorage.js');
var exec = require('child_process').exec;
var i18n = require('../config.js').i18n
var langs = i18n.langs
var defaultLang = i18n.default


var Upload = new keystone.List('Upload', {

  defaultSort: '-createdAt'
})

Upload.add({

  file: { label: "Archivo", type: Types.FileUpload, storage: myStorage, initial: true, noedit: true},
  createdAt: { label: "Creado el", type: Date, default: Date.now },
  title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
  content: { label: "Contenido", type: Types.I18nHtml,  langs: langs, defaultLang: defaultLang, wysiwyg: true},
  link: { label: "Enlace", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
  
});

//# change _id in schema
Upload.schema.add({

    _id: { type: String, index: true, unique: true }
});



//# si se acaba de crear -> usamos nombre de archivo para generar _id
Upload.schema.pre('save', function(next, done) {

  var upload = this;

  if(!upload.isNew) return next();


  this._id = upload.file.filename;

  next();

});

//# after remove -> delete file
Upload.schema.post('remove', function(doc) {

  exec('rm public/uploads/'+doc.file.filename, function(err, stdout, stderr) { //+'.*'
    if (err) { 
        console.log('child process exited with error code ' + err.code); 
        return; 
    } 
    console.log(stdout); 
  });

});



Upload.defaultColumns = 'file, createdAt'

Upload.register();