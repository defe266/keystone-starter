export default function (id, errors){

	return {type: 'FORM_'+id+'_SEND_ERRORS', data: errors}
}