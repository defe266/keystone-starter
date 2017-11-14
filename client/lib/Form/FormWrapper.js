import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

//import ButtonLoader from 'components/buttonLoader/buttonLoader.jsx';


var FormWrapper = function(id){


  return function(Component){


    var Form = React.createClass({

      update: function(data){

        this.props.dispatch({type: 'FORM_'+id+'_UPDATE', data: data});
      },
/*
      SubmitBtn: function(props){

        return (

          <ButtonLoader {...props} loading={this.props.sending} disabled={props.disabled || this.props.disabled}>
            {props.children}
          </ButtonLoader>
        )
      },*/

      render: function () {

        const props = this.props;

        return <Component {...props} update={this.update} SubmitBtn={this.SubmitBtn}/>
      }

    });

    //export default Area;


    return connect((state, ownProps) => {

      return state.forms[id]

    })(Form)
  }

}



export default FormWrapper