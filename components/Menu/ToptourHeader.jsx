'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

require('site_css');
require('ionicons_css');

var ToptourHeader = React.createClass({

    render: function() {
        return (
            <div className="toptour-header">
                {this.props.selectedToptour.navn}
            </div>
            )
    }
});

module.exports = ToptourHeader;