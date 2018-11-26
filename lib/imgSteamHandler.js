//# img stream: live transforms like cloudinary

var path = require('path');
var imgSteam = require('image-steam');

var connect = new imgSteam.http.Connect({
/*
  http: [{
    port: 13337
  }],*/
  /*processor: {
    cache: false,
    concurrency: 0,
    simd: true
  },
  router: {
    steps: {
      fm: {
        name: 'format',
        f: 'format'
      }
    }
  },*/

  storage: {
    
    //app: ['isx'],
    /*driver: 'fs',
    path: path.resolve(__dirname, '../public'),///uploads -> extract match with public routes
    cache: {
      path: path.resolve(__dirname, '../cache')
    }*/

    "defaults": {
      driver: 'fs',
      path: path.resolve(__dirname, '../public'),///uploads -> extract match with public routes
    },

    cache: {
      path: path.resolve(__dirname, '../cache')
    },

    //"cacheTTS": 86400, /* 24 hrs */
    //"cacheOptimizedTTS": 43200, /* 12 hrs */
  },
  security: {
    enabled : false
  },

  "throttle": {
    "ccProcessors": 2,
    "ccPrefetchers": 10,
    "ccRequests": 50
  }



})


connect.on('error', function(err) { 

  console.log('image-steam error (connect): ', err)
  
});


/*
var http = require('image-steam').http;
var throttle = new http.Throttle();
throttle.on('error', function(err) { console.log('image-steam error (throttle): ', err) });

var Processor = require('image-steam').Processor;
var processor = new Processor();
processor.on('error', function(err) { console.log('image-steam error (Processor): ', err) });


var Storage = require('image-steam').Storage;
var storage = new Storage();
storage.on('error', function(err) { console.log('image-steam error (Storage): ', err) });
*/

module.exports = connect.getHandler()