var fs = require('fs');
var path = require('path');

var apps = {};

//# import apps routes (universal)
fs.readdirSync(path.resolve(__dirname, '../client/apps')).forEach(function(fld) {

    if (fld.indexOf('.') == -1) { //# fix for .DS_store
        console.log('> Load APP: ' + fld);

        apps[fld] = require(path.resolve(__dirname, '../client/apps/' + fld + '/server.js'))
    }
});

module.exports = apps;
