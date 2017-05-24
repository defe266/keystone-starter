import React from 'react'
import { connect } from 'react-redux'

import submit from '../../../../actions/Contact/submit'

//import BlockHTML from '../../../atoms/BlockHTML'
import TextI18n from '../../../atoms/TextI18n'
import Row from '../../../atoms/Row'
import Col from '../../../atoms/Col'
import FormGroup from '../../../atoms/FormGroup'
import ButtonLoader from '../../../atoms/ButtonLoader'
import MarkerMap from '../../../molecules/MarkerMap';

import './index.css';


var Page = React.createClass({
  
  propTypes: {
    
    id: React.PropTypes.string.isRequired,
    data : React.PropTypes.object.isRequired,
    show : React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    errors: React.PropTypes.array.isRequired,
  },

  contextTypes: {
    t: React.PropTypes.func.isRequired
  },

  componentDidMount (){


    //# al iniciar borramos todo lo que se hubiera escrito
    this.props.dispatch({type: 'FORM_'+this.props.id+'_RESET'});

    var initialData = {language : this.props.lang}

    //# si hay parametros de ruta que coincidan conl os campos, los usamos para iniciar el formulario
    if(this.props.query){

      initialData = Object.assign({}, this.props.query, initialData)
    }

    this.update( initialData );
  },

  update (data) {
    
    this.props.dispatch({type: 'FORM_'+this.props.id+'_UPDATE', data: data});
  },

  submit (e) {
    
    if(e) e.preventDefault();

    this.props.dispatch(submit(this.context));
  },

  render: function () {

    const props = this.props;
    const item = props.item;
    const query = props.query;
    const values = props.data;
    const errors = props.errors;


    return (

      <div className="TemplateContact">

          <div className="container">

            <div className="containerStandar">

              <div className="headerStandar">
                <h1 className="titleStandar"><TextI18n value={item.fields.title}/></h1>
              </div>

              <Row>
                <Col sm={6}>

                  <TextI18n value={item.fields.content} html/>
                  
                </Col>

                <Col sm={6}>

                  <form className="TemplateContact__form" onSubmit={this.submit}>

                    <Row>

                        <Col md={6}>

                          <FormGroup label={this.context.t("Su nombre *")} errors={errors.name}>
                            <input type="text" className="form-control" value={values.name} onChange={(e) => this.update({name : e.target.value})}/>
                          </FormGroup>

                        </Col>

                        <Col md={6}>

                          <FormGroup label={this.context.t("Su e-mail *")} errors={errors.email}>
                            <input type="text" className="form-control" value={values.email} onChange={(e) => this.update({email : e.target.value})}/>
                          </FormGroup>
                          
                        </Col>

                        <Col md={12}>

                          <FormGroup label={this.context.t("Asunto")}>
                            <input type="text" className="form-control" value={values.subject} onChange={(e) => this.update({subject : e.target.value})}/>
                          </FormGroup>

                          <FormGroup label={this.context.t("Su mensaje")}>
                            <textarea type="text" className="form-control" rows="8" value={values.message} onChange={(e) => this.update({message : e.target.value})}/>
                          </FormGroup>

                          <ButtonLoader loading={props.loading} className="btn btn-primary" onClick={this.submit}>{this.context.t("Enviar")}</ButtonLoader>
                          
                        </Col>

                    </Row>

                  </form>

                </Col>

              </Row>

              

              

            </div>

          </div>

          { item.fields.haveMap && item.fields.coordinates && item.fields.coordinates.length == 2 ? 

            <MarkerMap coords={[item.fields.coordinates[1], item.fields.coordinates[0]]} zoom={16}/>

          :null}

      </div>
    )
  }

});


//export default Page;


export default connect((state, ownProps) => {



  return Object.assign({}, state.forms.CONTACT, {

    query : state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.query : {}

  })

})(Page)