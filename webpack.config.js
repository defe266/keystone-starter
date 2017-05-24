var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');




var entry = {};

fs.readdirSync(path.resolve(__dirname, '../apps')).forEach(function(fld) {

  if(fld.indexOf('.') == -1){//# fix for .DS_store

    apps[fld] = [
          "babel-polyfill",
          './apps/'+fld+'/client.js'
      ]
  }

});


module.exports = {

    //context: __dirname + "/app",
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
                loader: 'babel',
                query: {
                    presets:['es2015','stage-0','react']
                }
            },


            //# JSON
            { 
                test: /\.json$/,
                loader: 'json-loader'
            },
		    

            //# RESOURCES
            {
                  test: /\.(gif|png|ttf|eot|svg|woff(2)?)(\S+)?$/,
                  //loader: "file-loader",//loader: 'file-loader?name=[hash].[ext]'
                  loader: "file-loader?name=[name].[ext]"
                  //name=[name].[ext]?[hash]
            },
            
      		//# CSS
            { 
             	test: /\.css$/,
             	//loader: "style-loader!css-loader"
             	//loaders: ['style', 'css'],
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },

            //# STYLUS
            { 
                test: /\.styl$/, 
                //loader: 'style-loader!css-loader!stylus-loader'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader",'stylus-loader')
            },

      		
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
            { test: /\.ejs$/, loader: "ejs-compiled" }
        ]
    },
    plugins: [
        
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production'),
              'BROWSER': true
            }
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }),// { output: {comments: false} }   { comments: false }
        new webpack.optimize.DedupePlugin()
    ]   
}