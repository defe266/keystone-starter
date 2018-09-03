import React from 'react';
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import i18nURL from 'client/lib/i18nURL';
var sd = require('sharify').data;
var I18N = sd.I18N;

var Head = React.createClass({

  propTypes: {

    location: React.PropTypes.object.isRequired,
    lang: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    noIndex: React.PropTypes.bool.isRequired,
  },

  render: function () {

    var props = this.props;
    const langSelected = props.lang;
    var location = props.location;

    var pathname = location.pathname;// + location.search;

    //# modo multislug vs pure url
    if(props.slugs){

      var defaultPathname = props.slugs;

    }else{

      if(langSelected == I18N.default){

        var defaultPathname = pathname;

      }else{

        var pathname_parts = pathname.split('/');

        pathname_parts.shift();
        pathname_parts.shift();

        var defaultPathname = '/' + pathname_parts.join('/');

      }
    }


    return (


      <Helmet>

        <html lang={props.lang}/>
            <title>{props.title}</title>
            <meta name="description" content={props.description} />

            {props.noIndex || process.env.NODE_ENV == 'development' ? <meta name="robots" content="noindex"/> : null}


            <link rel="canonical" href={sd.SERVER_URL + pathname} />


            {I18N.langs.map((lang, index) => {

              if(lang == langSelected) return null

              return <link rel="alternate" hreflang={lang} href={sd.SERVER_URL + i18nURL(defaultPathname, lang)} />

            })}

        </Helmet>

    )
  }

});


export default connect((state, ownProps) => {

  return Object.assign({}, state.head, {

    lang: state.i18nState.lang,
    location : state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions : {}
  })

})(Head)