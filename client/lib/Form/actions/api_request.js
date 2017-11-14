var sd = require('sharify').data;
var axios = require('axios');
var Qs = require('qs');



export default function (payload){


    return (dispatch, getState) => {


        var token = getState().token;


        //console.log('single payload',payload);
        try{

            var model = payload.model;
            var method = (payload.method) ? payload.method : 'get';
            var id = payload.id;
            var data = payload.data;
            var params = payload.params;
            
            var url = payload.url ? payload.url : sd.SERVER_URL+"/api/"+model+ (id ? '/'+id : '');

            if(payload.path){

                url = sd.SERVER_URL + payload.path;
            }

            //!# Prevent caching
            /*
            if(params){

                params.uniq_param = (new Date()).getTime();

            }else{
                
                params = {uniq_param : (new Date()).getTime()};
            }*/
            
            

            var args = {

                url: url,
                method: method,
                responseType: 'json',
                headers: {},

                paramsSerializer: function(params) {

                    return Qs.stringify(params, {arrayFormat: 'brackets'});
                },

            }

            if(token){

                args.headers.auth = token
            }

            if(data){

                args.data = data;
            }

            if(params){
                args.params = params;
            }

        }catch(err){

            console.error(err);
        };

        return axios(args);

    }

    
}