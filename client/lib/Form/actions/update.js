export default function (id, update){


	return {type: 'FORM_'+id+'_UPDATE', data: update}
}