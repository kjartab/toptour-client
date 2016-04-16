'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');  
var _ = require('underscore');

var SideBar = React.createClass({

    getInitialState: function() {
        return {

        }
    },

    render: function() {
            if (this.props.selectedToptour) {
                return (
                    <div className="sidebar">
                        <Button onClick={clicked} >Export</Button>
                        <Button onClick={clicked} >Export</Button>
                        <Button onClick={clicked} >Export</Button>
                    </div>     
                );
            }
            return(
            <div className="sidebar">
                <div>search</div>   
                <div>analyse</div>
                <div>maps</div>
                <div>about</div>
            </div>);
    }

});

module.exports = SideBar;