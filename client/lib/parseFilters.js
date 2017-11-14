export default function(filters){

	var filtersTransform = {}


	filters.forEach(function(item){

		if(item.value){

			if(item.id.indexOf('_._') != -1){

				var keys = item.id.split('_._')

				var key1 = keys[0];
				var key2 = keys[1];
				

				if(filtersTransform[key1]){

					
					filtersTransform[key1][key2] = item.value


				}else{

					var objectAux = {}

					objectAux[key2] = item.value

					filtersTransform[key1] = objectAux
				}

				/*
				var keys = item.id.split('_._')

				var object = {}

				object[keys[keys.length-1]] = item.value;


				if(filtersTransform[]})
				
				for(var i = keys.length-2; i > 0; i--){

					var objectAux = {}

					objectAux[keys[i]] = object

					object = objectAux;

				}


				filtersTransform[keys[0]] = object
				*/

			}else{

				filtersTransform[item.id] = item.value;
			}
			
		}
	})


	return filtersTransform
}