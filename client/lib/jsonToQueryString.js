module.exports = function jsonToQueryString(json) {

  return '?' + 
      Object.keys(json).map(function(key) {

        if ( !json[key] ) return '';

          return encodeURIComponent(key) + '=' +
              encodeURIComponent(json[key]);

      }).join('&');

}