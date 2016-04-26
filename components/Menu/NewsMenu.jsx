'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

require('site_css');
require('ionicons_css');



var NewsMenu = React.createClass({
    render: function() {
        return(<div className="menu">
            News
        </div>);
    }
});


module.exports = NewsMenu;