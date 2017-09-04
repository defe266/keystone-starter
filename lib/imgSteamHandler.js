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
    driver: 'fs',
    path: path.resolve(__dirname, '../public'),///uploads -> extract match with public routes
    cache: {
      path: path.resolve(__dirname, '../cache')
    }
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

  console.log('image-steam error: ', err)
  
});


module.exports = connect.getHandler()