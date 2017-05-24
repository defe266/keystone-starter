var React = require('react');
var classnames = require('classnames');

var Icon = require('../../atoms/Icon');

require('./index.css');

module.exports = React.createClass({


            minus: function(){

                  if(this.props.value != 0) this.props.onChange(this.props.value -1)
            },

            plus: function(){

                  this.props.onChange(this.props.value +1)
            },

            render: function (){


                  var props = this.props;

                  var classes = classnames({

                        "NumberPlusMinus" : true,
                        "NumberPlusMinus--zero" : this.props.value == 0
                  })
            

                  return (

                        <div className={classes}>

                              <div className="NumberPlusMinus__minus NumberPlusMinus__btn" onClick={this.minus}>

                                    <Icon name="minus-circle"/>
                              </div>

                              <div className="NumberPlusMinus__value">

                                    {props.value}
                              </div>

                              <div className="NumberPlusMinus__plus NumberPlusMinus__btn" onClick={this.plus}>

                                    <Icon name="plus-circle"/>
                                    
                              </div>

                              <div className="clearfix"/>
                          </div>
                  );
            }
});