var keystone = require('keystone');
var Types = keystone.Field.Types;
var myStorage = require('../lib/myStorage.js');
//var exec = require('child_process').exec;
var fs = require('fs');
var Errio = require('errio');
var glob = require("glob")
var i18n = require('../config.js').i18n
var langs = i18n.langs
var defaultLang = i18n.default


var Upload = new keystone.List('Upload', {

  defaultSort: '-createdAt',
  searchFields: 'file.filename'
})

Upload.add({

  file: { label: "Archivo", type: Types.FileUpload, storage: myStorage, initial: true, noedit: true},
  createdAt: { label: "Creado el", type: Date, default: Date.now },
  //title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
  //content: { label: "Contenido", type: Types.I18nHtml,  langs: langs, defaultLang: defaultLang, wysiwyg: true},
  //link: { label: "Enlace", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
  
  },

  { 
    heading: "Contenido (se usa en sliders)"
  }, 

  {
    title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang},
    content: { label: "Descripción", type: Types.I18nHtml,  langs: langs, defaultLang: defaultLang, wysiwyg: true},

    multiLink: { label: "Enlace multiple", type: Types.Boolean, default: false},

    link: { label: "Enlace", type: Types.I18nText, langs: langs, defaultLang: defaultLang, dependsOn: { multiLink: false }},

    links: {

      label:'Botones',
      type: Types.List, 
      fields: {

        //icon: { label: "Icono", type: Types.Text, note: "Nombre de icono 'font awesome' sin prefijo. https://fontawesome.com/v4.7.0/icons/"},
        //title: { label: "Título", type: Types.I18nText, langs: langs, defaultLang: defaultLang},

        text: { label: "Texto", type: Types.I18nText, note: "Añade iconos usando su nombre entre corchetes sin el prefijo 'fa-' <br/> ej: ver vídeo [arrow-right]  <br/> https://fontawesome.com/v4.7.0/icons/", langs: langs, defaultLang: defaultLang},

        //className: { label: "CSS Classes", type: Types.Text, note: "ej botón estandar de 'bootstrap': btn btn-primary"},

        classNameBtn: { label: "Tipo", type: Types.Select, default: 'btn', options: [
          { label: 'Estándar', value: 'btn' },
          { label: 'Transparente', value: 'btn btn-hollow-style' },
          { label: 'Play de vídeo', value: 'btn btn-video-play' }
        ]},

        classNameBtnStyle: { label: "Color", type: Types.Select, default: 'btn-primary', options: [
          { label: 'Azul', value: 'btn-primary' },
          { label: 'Amarillo', value: 'btn-warning' },
          { label: 'Rojo', value: 'btn-danger' },
          { label: 'blanco', value: 'btn-white' },
          
        ]},

        //className: { label: "CSS Classes", type: Types.Text, note: "ej botón estandar de 'bootstrap': btn btn-primary"},
        link: { label: "Enlace", type: Types.I18nText, langs: langs, note:"Usa el código de youtube con 'youtube:' para mostrarlo en un modal. <br/> ej: youtube:wZZ7oFKsKzY", defaultLang: defaultLang},

        
      },

      dependsOn: { multiLink: true }
    }
  }

);

//# change _id in schema
Upload.schema.add({

    _id: { type: String }//, index: true, unique: true
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
  /*
  exec('rm public/uploads/'+doc.file.filename, function(err, stdout, stderr) { //+'.*'
    if (err) { 
        console.log('child process exited with error code ' + err.code); 
        return; 
    } 
    console.log(stdout); 
  });*/

  var Log = keystone.list('Log').model;

  var unlink = function(path){

    return new Promise((resolve, reject) => {

      fs.unlink(path, function(err){

        if(err) return reject(err)

        resolve()

      });

    })
  }

  var globPromise = function(path, options = null){

    return new Promise((resolve, reject) => {

      glob(path, options, function(err, files){

        if(err) return reject(err)

        resolve(files)

      });

    })
  }

  var filename = doc._id;//doc.file.filename

  //# remove file
  unlink('public/uploads/'+filename).then(() => {

    //# find cache files
    return globPromise('cache/uploads/'+filename+'*')

  }).then(files => {

    //# remove cache files
    return Promise.all(files.map(f => unlink(f)))

  }).catch(err => {

    var errorMSG = `Error removing img '${filename}' : '${Errio.stringify(err)}'`;

    Log.create({message: errorMSG, type: 'error'})

  })

});



Upload.defaultColumns = 'file, createdAt'

Upload.register();