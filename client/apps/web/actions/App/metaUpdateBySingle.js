import metaUpdate from './metaUpdate';

export default function (single){

	return (dispatch, getState) => {

		if(single.notFound || single.loading || single.error) return true;

		var lang = getState().i18nState.lang;

		var fields = single.item;

		var title = fields.metaTitle && fields.metaTitle[lang] ? fields.metaTitle[lang] : fields.title[lang];
		var description = fields.metaDescription && fields.metaDescription[lang] ? fields.metaDescription[lang] : '';
		var noIndex = fields.metaNoIndex;
		var slugs = fields.slug;

		return dispatch( metaUpdate(title, description, noIndex, slugs) );
	}
}