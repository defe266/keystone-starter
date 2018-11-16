import metaUpdate from './metaUpdate';

export default function (single){

	return (dispatch, getState) => {

		if(single.notFound || single.loading || single.error) return true;

		const state = getState();
		const position_home = state.positions.data.home;

		var lang = getState().i18nState.lang;

		var fields = single.item;

		var title = fields.metaTitle && fields.metaTitle[lang] ? fields.metaTitle[lang] : fields.title[lang];
		var description = fields.metaDescription && fields.metaDescription[lang] ? fields.metaDescription[lang] : '';
		var noIndex = fields.metaNoIndex;
		var slugs = fields.slug;

		//# si es página home, su ruta es la raiz siempre, no queremos generar metadatos de urls con la info de las slugs
		if( position_home && position_home._id == single.item._id ){

			slugs = null;
		}

		return dispatch( metaUpdate(title, description, noIndex, slugs) );
	}
}