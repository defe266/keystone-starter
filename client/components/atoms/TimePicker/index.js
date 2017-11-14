var React = require('react');
//var _ = require('underscore');
//var moment = require('moment');


require('./index.css');

var TimePicker = React.createClass({

  displayName: 'TimePicker',

  getInitialState: function() {

    //var value = this.props.value : this.props.defaultValue;

    return {
      value: null
      //hour: value ? value.format('HH') : '00',
      //minute: value ? value.format('mm') : '00'
    }
  },

  addZeroes: function(num){

    var places = 2;
    var zero = places - num.toString().length + 1;

    return Array(+(zero > 0 && zero)).join("0") + num;
  },

  handleChangeHour: function(e){

    if(this.props.defaultValue) var value = this.props.defaultValue;
    if(this.state.value) var value = this.state.value;
    if(this.props.value) var value = this.props.value;

    if(value){

      var value_parts = value.split(':');
      
    }else{

      var value_parts = ['00','00']
    }


    value_parts[0] = e.target.value;
    value = value_parts.join(':');  

    
    
    this.setState({
      value: value
    });

    if(this.props.onChange) this.props.onChange(value)
  },

  handleChangMinute: function(e){

    if(this.props.defaultValue) var value = this.props.defaultValue;
    if(this.state.value) var value = this.state.value;
    if(this.props.value) var value = this.props.value;

    if(value){

      var value_parts = value.split(':');
      
    }else{

      var value_parts = ['00','00']
    }

    value_parts[1] = e.target.value;
    value = value_parts.join(':');
    
    this.setState({
      value: value
    });

    if(this.props.onChange) this.props.onChange(value)
  },

  render: function() {

    var props = this.props;

    let class_size = this.props.size ? ' input-'+this.props.size : '';

    if(this.props.value) var value = this.props.value;

    if(this.props.defaultValue) var value = this.props.defaultValue;
    if(this.state.value) var value = this.state.value;
    if(this.props.value) var value = this.props.value;


    if(value){

      var value_parts = value.split(':');
    }
    

    var hour = value ? value_parts[0] : '00';
    var minute = value ? value_parts[1] : '00';



    //# options
    var options_hours = [];

    for(var i = 0 ; i < 24; i++){

      var numberAdapted = this.addZeroes(i);

      options_hours.push(<option key={numberAdapted} value={numberAdapted}>{numberAdapted}</option>);
    }

    var options_minutes = [];

    for(var i = 0 ; i < 60; i++){

      var numberAdapted = this.addZeroes(i);

      options_minutes.push(<option key={numberAdapted} value={numberAdapted}>{numberAdapted}</option>);
    }

    

    return (

      <div className="TimePicker">
          
          <input type="hidden" name={this.props.name} value={value} />

          <select className={"TimePicker__hour form-control" + class_size} onChange={this.handleChangeHour} value={hour}>
            {options_hours}
          </select>

          <select className={"TimePicker__minute form-control" + class_size} onChange={this.handleChangMinute} value={minute}>
            {options_minutes}
          </select>

          <div className="clearfix"/>

      </div>
    )
  }
  
});


module.exports = TimePicker;