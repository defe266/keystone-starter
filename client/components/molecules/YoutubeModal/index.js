import React from 'react';
import _ from 'lodash';

import Modal from 'react-bootstrap/lib/Modal';

import './index.css'

var YoutubeModal = React.createClass({

  getInitialState() {
    return { show: false };
  },

  close() {
    this.setState({ show: false });
  },

  open() {
    this.setState({ show: true });
  },

  render: function () {

    var props = this.props;

    var videoSRC = 'https://www.youtube.com/embed/'+props.video;
    var videoSRCauto = videoSRC+"?autoplay=1&rel=0&showinfo=0" ;

    var video = this.state.show ? videoSRCauto : videoSRC;

    var classes = props.classes || props.className
    
    return (

      <div className={"YoutubeModal " + classes} onClick={this.open}>

        {props.children}

        <Modal show={this.state.show} onHide={this.close} className="YoutubeModal__Modal">
          
          <Modal.Body>
            <button type="button" className="close" onClick={this.close}>&times;</button>
            <iframe width="100%" height="350" src={video} frameborder="0"  allowfullscreen></iframe>
          </Modal.Body>

        </Modal>

      </div>
    )
  }

});

export default YoutubeModal;