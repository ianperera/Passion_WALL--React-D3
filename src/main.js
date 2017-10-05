var React = require('react');
var Reactdom = require('react-dom');

var draw = require('./draw');
require('./main.less');

var App = React.createClass({
    render: function() {
        return (<div>
            {draw.showHexagon()}
        </div>);
    }
});

window.app = Reactdom.render(<App />, document.getElementById('hexagon-wall'));
