'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

require('site_css');
require('ionicons_css');

var AboutMenu = React.createClass({
    render: function() {
        return(<div className="menu">
            About
        </div>);
    }
});


module.exports = AboutMenu;