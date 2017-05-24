import React from 'react'
import { connect } from 'react-redux'

import BlockHTML from '../../atoms/BlockHTML';

var TextI18n = function (props) {


    var lang = props.lang;
    var value = props.value;
    var output = value;

    if(value && lang && typeof value === 'object'){

        output = value[lang]
    }

    if(props.html) return <BlockHTML>{output}</BlockHTML>

	return <span>{output}</span>
}



module.exports = connect((state) => {

    return {

        lang: state.i18nState.lang
    }

})(TextI18n)