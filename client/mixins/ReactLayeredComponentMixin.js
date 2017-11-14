var React = require('react');
var ReactDOM = require('react-dom');
import { Provider } from 'react-redux'
import provideContext from 'client/wrappers/provideContext'

var ReactLayeredComponentMixin = {

    contextTypes: {

        store: React.PropTypes.object.isRequired,
        dragDropManager: React.PropTypes.object.isRequired
    },
    componentWillUnmount: function() {
        this._unrenderLayer();
        document.body.removeChild(this._target);
    },
    componentDidUpdate: function() {
        this._renderLayer();
    },
    componentDidMount: function() {
        // Appending to the body is easier than managing the z-index of everything on the page.
        // It's also better for accessibility and makes stacking a snap (since components will stack
        // in mount order).
        this._target = document.createElement('div');
        document.body.appendChild(this._target);
        this._renderLayer();
    },
    _renderLayer: function() {

        // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
        // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.
        //React.render(this.renderLayer(), this._target);

        //ReactDOM.render(<Provider store={this.context.store}>{this.renderLayer()}</Provider>, this._target);

        var Layer = (props) => {

            return <div>{this.renderLayer()}</div>
        }

        Layer = provideContext(Layer, {

            store: React.PropTypes.object.isRequired,
            dragDropManager: React.PropTypes.object.isRequired, //# contexto que necesitan los componentes D&D para funcionar
            
        });


        ReactDOM.render(<Layer context={this.context}/>, this._target);

    },
    _unrenderLayer: function() {
        ReactDOM.unmountComponentAtNode(this._target);
    }
};


module.exports = ReactLayeredComponentMixin;