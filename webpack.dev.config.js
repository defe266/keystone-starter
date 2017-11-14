var webpack = require('webpack');
var path = require('path');
var env = require('node-env-file');
var fs = require('fs');

env(__dirname + '/.env');


var entry = {};

fs.readdirSync(path.resolve(__dirname, './apps')).forEach(function(fld) {

  if(fld.indexOf('.') == -1){//# fix for .DS_store

    entry[fld] = [
          'webpack-dev-server/client?http://localhost:'+process.env.PORT_DEV,
          'webpack/hot/only-dev-server',
          "babel-polyfill",
          './apps/'+fld+'/client.js'
      ]
  }

});


module.exports = {

    entry: entry,
    output: {

    	path: __dirname + "/public/assets",
    	publicPath: '/assets/',
        filename: '[name].js'
    },

    resolve: {
      root: [path.resolve(__dirname, ''), path.resolve(__dirname, 'node_modules')],
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [

        	//# JS AND JSX WITH BABEL & REACT-HOT-LOADER FOR DEVELOPEMENT

            {
               	test: /\.(js|jsx)?$/,
			          exclude: /(node_modules|bower_components)/,

                loader: 'react-hot!babel?presets[]=es2015&presets[]=stage-0&presets[]=react'
            },


            //# JSON
            { 
                test: /\.json$/,
                loader: 'json-loader'
            },

            //# RESOURCES *.*?n* (react-notifications)
            {
                  test: /\.(gif|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
                  loader: "file-loader",//loader: 'file-loader?name=[hash].[ext]'
            },


      		  //# CSS
            { 
             	test: /\.css$/,
             	//loader: "style-loader!css-loader"
             	loaders: ['style', 'css'],
            },

            //# STYLUS
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },

          		
          		//# LESS
    		    {
    		      test: /\.less$/,
    		      loader: 'style!css!less'
    		    },

    		    //# SASS
    		    {
    		      test: /\.scss$/,
    		      loader: 'style!css!sass'
    		    },
    		    
            //#EJS TEMPLATES
            //{ test: /\.ejs$/, loader: "ejs-loader?variable=data" }
            { test: /\.ejs$/, loader: "ejs-compiled" }
            
        ]
    },

    
	plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development'),
              'BROWSER': true
            }
        }),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin() //not reload if there is an error
  	]
}