import React from 'react';
import {Link as ReactLink} from 'react-router';
import {IndexLink} from 'react-router';

export default class Link extends React.Component {

  parseTo(to) {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }
  isInternal(to) {
    
    // If it's a relative url such as '/path', 'path' and does not contain a protocol we can assume it is internal.
    
    //if(to.indexOf("://") === -1) return true;

    const toLocation = this.parseTo(to);
    return window.location.hostname === toLocation.hostname;

  }

  render() {

    const props = this.props;
    const to = props.to;
    const children = props.children;

    var rest = Object.assign({},props);

    delete rest.to;
    delete rest.children;


    if (!process.env.BROWSER) return <a href={to} {...rest}>{children}</a>

    //{to, children, ...rest} = this.props;

    const toLocation = this.parseTo(to);
    const isInternal = this.isInternal(toLocation);
    if (isInternal) {

      if(rest.target == '_self') delete rest.target;

      if(props.IndexLink) return (<IndexLink to={toLocation.pathname} {...rest}>{children}</IndexLink>);

      return (<ReactLink to={toLocation.pathname} {...rest}>{children}</ReactLink>);
    } else {
      return (<a href={to} {...rest}>{children}</a>);
    }
  }
}