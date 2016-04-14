'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');  
var _ = require('underscore');

var ToptourView = React.createClass({

    componentWillUpdate: function(nextProps, nextState) {
        console.log(nextProps, "new");
    },

    componentDidUpdate: function() {

    },

    render: function() {
        console.log(this.props);
        var tt = this.props.selectedToptour;
        return (<div className="toptour-view">
            <p>{tt.navn}</p>
            <p>{tt.beskrivelse}</p>
        </div>);
    }


});

module.exports = ToptourView;