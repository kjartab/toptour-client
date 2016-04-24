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
        console.log(this.props);
        var iconClass="icon " + this.props.iconClass;
    return (
      <button
        className="btn btn-default"
        // style={buttonStyle}
        label={this.props.label}
        onClick={this.onClick}><i className={iconClass}></i></button>
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
                        <Button menuId="selected-back" handleClick={this.clicked} iconClass="ion-chevron-left" label="<-"></Button>
                        <Button menuId="selected-map" handleClick={this.clicked} iconClass="ion-android-map" label="maps"></Button>
                        <Button menuId="selected-map" handleClick={this.clicked} iconClass="ion-images" label="images"></Button>
                        <Button menuId="selected-info" handleClick={this.clicked} iconClass="ion-information" label="info"></Button>
                    </div>
                );
            }
            return(
            <div className="sidebar">
                <Button menuId="search" handleClick={this.clicked} iconClass="ion-search" label="search"></Button>
                <Button menuId="maps" handleClick={this.clicked} iconClass="ion-android-map" label="maps"></Button>
                <Button menuId="news" handleClick={this.clicked} iconClass="ion-android-notifications-none" label="news"></Button>
                <Button menuId="about" handleClick={this.clicked} iconClass="ion-information" label="about"></Button>
            </div>);
    }

});

module.exports = SideBar;