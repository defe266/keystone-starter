
if(typeof window !== 'undefined') {

    var $ = require('jquery');


    require('bootstrap-notify');

    require('bootstrap/dist/css/bootstrap.css');
    require('font-awesome/css/font-awesome.css');
    require('animate.css');
    require('./index.css');


    //# growl para notificaciones
    //window.Growl = function(msg, state){

    module.exports = function(msg, state){

    	var icon = 'fa fa-info-circle';

    	switch(state){

    		case 'success' :  	icon = 'fa fa-check-circle'; break;
    		case 'warning' :  	icon = 'fa fa-exclamation-circle'; break;
    		case 'danger'  : 	icon = 'fa fa-times-circle'; break;
            //default        :    icon = 'fa fa-info'; break;
    	}
    	

    	return $.notify({
            // options
            icon: icon,
            message: msg
        },{
            // settings
            type: state ? state : 'info',

            //timer: 2000,
            delay: 100,
            timer: 1000,
            z_index: 9999,
            /*animate: {
    			enter: 'animated fadeInDown',
    			exit: 'animated fadeOutUp'
    		},*/
    		allow_dismiss: false,
            placement: {
                from: "bottom",
                align: "right"
            },
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 col-md-3 col-lg-2 alert alert-{0} notification" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }

}else{

    //# server null response
    module.exports = function(msg, state){

        return {

            update : function(){ return false; }
        };
    }

}