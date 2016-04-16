'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');  
var _ = require('underscore');


var Button = React.createClass({

    onClick: function(e) {
        this.props.handleClick(this.props.menuId);
    },

    render: function () {
    return (
      <button
        className="btn btn-default"
        // style={buttonStyle}
        onClick={this.onClick}>{this.props.label}</button>
    );
    }
});


var SideBar = React.createClass({

    getInitialState: function() {
        return {

        }
    },

    clicked: function(e) {
        console.log("sidebar ", e);
        this.props.selectMenu(e);
    },




    render: function() {
            if (this.props.selectedToptour) {
                return (
                    <div className="sidebar">
                        <Button menuId="selected-back" handleClick={this.clicked} label="<-"></Button>
                        <Button menuId="selected-map" handleClick={this.clicked} label="maps"></Button>
                        <Button menuId="selected-info" handleClick={this.clicked} label="info"></Button>
                    </div>
                );
            }
            return(
            <div className="sidebar">
                <Button menuId="search" handleClick={this.clicked} label="search"></Button>
                <Button menuId="maps" handleClick={this.clicked} label="maps"></Button>
                <Button menuId="news" handleClick={this.clicked} label="news"></Button>
                <Button menuId="about" handleClick={this.clicked} label="about"></Button>
            </div>);
    }

});

module.exports = SideBar;