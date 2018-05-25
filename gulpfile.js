var nodemon = require('gulp-nodemon');
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackDevConfig = require("./webpack.dev.config.js");
var webpackConfig = require("./webpack.config.js");
var glob = require('glob');
var exec = require('child_process').exec;
var runSequence = require('run-sequence')



gulp.task('dev', ['nodemon','webpack:hot-server']);
gulp.task('build', ['webpack']);
gulp.task('deploy', function(callback) {

  runSequence('build','commit','gandi-push','gandi-deploy', callback);

});

gulp.task('dev_deploy', function(callback) {

  runSequence('build','commit','heroku-push', callback);

});



//# Dev backend server
gulp.task('nodemon', function () {

		nodemon({
		    script: 'keystone.js',
		    ignore: ["public/*","cache/*","node_modules/*","client/*"],
		})

});



//# Dev frontend server with proxy to backend server
gulp.task("webpack:hot-server", function(callback) {
    new WebpackDevServer(webpack(webpackDevConfig), {
      publicPath: webpackDevConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      colors: true,
      proxy: {
             "*": "http://localhost:"+process.env.PORT // proxy request form node server routes in the other port
      }
    }).listen(process.env.PORT_DEV, 'localhost', function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log('Listening at localhost:'+process.env.PORT_DEV+' proxy localhost:'+process.env.PORT);
    });
});


//# Build
gulp.task("webpack", function(callback) {
    // run webpack

    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });    
});



//# Deploy via gandi

gulp.task( 'commit', function(callback) {


    exec('git add -A && git diff --quiet && git diff --staged --quiet || git commit -am "Deploy commit"', function (err, stdout, stderr) {
        
        console.log(stdout);
        console.log(stderr);     

        callback(err);
        
    });

} );


gulp.task( 'gandi-push', function(callback) {

    exec('git push gandi master', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        callback(err);
        
    });

} );


gulp.task( 'gandi-deploy', function(callback) {

    var process  = exec('ssh XXXXXXX@git.dc0.gpaas.net deploy default.git', {maxBuffer: 1024 * 2000}, function (err, stdout, stderr) {

        callback(err);
    });

    process.stdout.on('data', function(data) {
        console.log(data);
    });

    process.stderr.on('data', function(data) {
        console.log(data);
    });

});


gulp.task( 'heroku-push', function(callback) {

    var process = exec('git push heroku master', function (err, stdout, stderr) {

        callback(err);
    });

    process.stdout.on('data', function(data) {
        console.log(data);
    });

    process.stderr.on('data', function(data) {
        console.log(data);
    });

});


gulp.task( 'i18n-export', function(callback) {


    var process = exec('npm run extract', function (err, stdout, stderr) {

        callback(err);
    });

    process.stdout.on('data', function(data) {
        console.log(data);
    });

    process.stderr.on('data', function(data) {
        console.log(data);
    });

});

gulp.task( 'i18n-import', function(callback) {


    var process = exec('npm run import', function (err, stdout, stderr) {

        callback(err);
    });

    process.stdout.on('data', function(data) {
        console.log(data);
    });

    process.stderr.on('data', function(data) {
        console.log(data);
    });

});