var React = require('react');

module.exports = function provideContext(Component, customContextTypes) {

    var ContextProvider = React.createClass({

        displayName: 'ContextProvider',

        propTypes: {
            context: React.PropTypes.object.isRequired
        },

        childContextTypes: customContextTypes,

        getChildContext: function () {

            var childContext = {}

            Object.keys(customContextTypes).forEach(function (key) {

                childContext[key] = this.props.context[key];

            }, this);

            return childContext
        },

        render: function () {

            return React.createElement(Component, this.props);
        }
    });

    return ContextProvider;
};