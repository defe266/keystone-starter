import React from 'react'
import { connect } from 'react-redux'
import i18nURL from 'client/lib/i18nURL';

import submit from '../../../../../actions/Forms/contact_submit'

import {Checkbox} from 'react-bootstrap'
import Head from '../../../../organisms/Head';
import Layout from '../../../../layouts/Standar';
import TextI18n from 'client/components/atoms/TextI18n';
import Row from 'client/components/atoms/Row'
import Col from 'client/components/atoms/Col'
import FormGroup from 'client/components/atoms/FormGroup'
import ButtonLoader from 'client/components/atoms/ButtonLoader'
import MarkerMap from '../../../../molecules/MarkerMap';

import './index.css';


var Page = React.createClass({
  
  propTypes: {
    
    id: React.PropTypes.string.isRequired,
    values : React.PropTypes.object.isRequired,
    show : React.PropTypes.bool.isRequired,
    sending: React.PropTypes.bool.isRequired,
    errors: React.PropTypes.array.isRequired,
  },

  contextTypes: {
    __: React.PropTypes.func.isRequired
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
    const values = props.values;
    const errors = props.errors;

console.log('props.loading',props.sending)
    return (


      <Layout className="Page">

        <Head/>

        <div className="TemplateContact">

            <div className="container">

              <div className="containerStandar">

                <div className="headerStandar">
                  <h1 className="titleStandar"><TextI18n value={item.title}/></h1>
                </div>

                <Row>
                  <Col sm={6}>

                    <TextI18n value={item.content} html/>
                    
                  </Col>

                  <Col sm={6}>

                    <form className="TemplateContact__form" onSubmit={this.submit}>

                      <Row>

                          <Col md={6}>

                            <FormGroup label={this.context.__("Su nombre *")} errors={errors.name}>
                              <input type="text" className="form-control" value={values.name} onChange={(e) => this.update({name : e.target.value})}/>
                            </FormGroup>

                          </Col>

                          <Col md={6}>

                            <FormGroup label={this.context.__("Su e-mail *")} errors={errors.email}>
                              <input type="text" className="form-control" value={values.email} onChange={(e) => this.update({email : e.target.value})}/>
                            </FormGroup>
                            
                          </Col>

                          <Col md={12}>

                            <FormGroup label={this.context.__("Asunto")}>
                              <input type="text" className="form-control" value={values.subject} onChange={(e) => this.update({subject : e.target.value})}/>
                            </FormGroup>

                            <FormGroup label={this.context.__("Su mensaje")}>
                              <textarea type="text" className="form-control" rows="8" value={values.message} onChange={(e) => this.update({message : e.target.value})}/>
                            </FormGroup>

                            {props.LOPD ? 

                              <FormGroup errors={errors.polPrivacy}>

                                <Checkbox checked={values.polPrivacy} onChange={(e) => this.update({polPrivacy : e.target.checked})}>
                                  {this.context.__('Acepto')} <a href={i18nURL("/"+props.LOPD.key, props.lang)} target="_blank">{this.context.__('Política de Privacidad')}</a>
                                </Checkbox>

                              </FormGroup>

                            :null}

                            <ButtonLoader loading={props.sending} className="btn btn-primary btn-lg" onClick={this.submit}>{this.context.__("Enviar")}</ButtonLoader>
                            
                          </Col>

                      </Row>

                    </form>

                  </Col>

                </Row>

                

                

              </div>

            </div>

            { item.haveMap && item.coordinates && item.coordinates.length == 2 ? 

              <MarkerMap coords={[item.coordinates[1], item.coordinates[0]]} zoom={16}/>

            :null}

        </div>
      </Layout>
    )
  }

});


//export default Page;


export default connect((state, ownProps) => {


  return Object.assign({}, state.forms.CONTACT, {

    query : state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.query : {},
    LOPD: state.positions.data.LOPD,
    lang: state.i18nState.lang
  })

})(Page)