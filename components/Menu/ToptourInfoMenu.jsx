'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

require('site_css');
require('ionicons_css');



var ToptourInfoMenu = React.createClass({
    render: function() {
        return(<div className="menu">
                <h3>{this.props.selectedToptour.navn}</h3>
                <div>{this.props.selectedToptour.beskrivelse}</div>
            </div>);
    }

});

module.exports = ToptourInfoMenu;