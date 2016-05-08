'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

require('site_css');
var _ = require('underscore');
require('ionicons_css');





var GraphicViewControllerRadioButton = React.createClass({


    onChange: function(e) {
        this.props.onChange(this.props.graphicVCId);
        require.ensure(['jquery'], function() {
            var $ = require('jquery');
        var k= $("<div></div>");
        });
    },

    render: function() {
        return <div >
                   <input  
                    type="radio" 
                    onChange={this.onChange}
                    name="graphicVCId" 
                    checked = {this.props.graphicVC.selected}
                    value={this.props.graphicVC.id}
                /> {this.props.graphicVC.name}
                </div>
    }
});


var GraphicViewControllerMenu = React.createClass({

    onGraphicVCChanged: function(graphicVCId) {
        this.props.selectGraphicVCById(graphicVCId);
    },

    render: function() {

        var radios = _.map(this.props.graphicVCs, function(obj, key) {
            return (<GraphicViewControllerRadioButton 
                        graphicVCId={key}
                        key = {key}
                        graphicVC={obj}
                        onChange={this.onGraphicVCChanged} 
                    />);
        }, this);

        var checkBoxes = null;
        var checkBoxes = _.map(this.props, function(obj, key) {
            return (<div><input type="checkbox" /></div>);
        });

        return(<div className="menu">
                <h3>Karttype</h3>

                <form action="">
                    {radios}
                </form>
                
        </div>);
    }

});

module.exports = GraphicViewControllerMenu;