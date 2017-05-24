var React = require('react');
//var sd = require('sharify').data;

var Icon = require('../../atoms/Icon');

require('./index.css');

module.exports = React.createClass({
      /*
      render: function (){

            return <div>Bingo</div>
      }
      */
     render: function (){

            //var i18n = sd.i18n;
            var props = this.props;
            var className = props.className ? props.className : '';
            var classShow = props.show ? 'ModalFullScreen--show ' : '';
            //var classNoScroll = props.noScroll ? 'ModalFullScreen--noScroll ' : '';  + classNoScroll
            


            //<div className="ModalSelector__overlay" onClick={props.onClose}/>
            return (

                  <div className={"ModalFullScreen " + classShow + className}>

                        <div className="ModalFullScreen__header">

                              <button className="ModalFullScreen__closeBtn btn btn-link" onClick={props.onHide}>
                                    <Icon name="times"/>
                              </button>
                        </div>

                        <div className="ModalFullScreen__body">
                              {props.children}
                        </div>

                    </div>
            );
      }
});