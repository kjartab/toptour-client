'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');




var SearchInput = React.createClass({

    handleChange: function(event) {
        console.log(event.target.value);
        console.log(this);
        this.props.handleInputChange(event.target.value);
        // this.setState({value: event.target.value});
    },

    render: function() {
        console.log(this.props);
        return (
            <input
                type="text"
                value={this.props.currentValue}
                onChange={this.handleChange}
            />
        );
    }

});

var SearchResults = React.createClass({

    render: function() {
        return (
            <div>
                <p>test</p>
            </div>
        );
    }

})

var Search = React.createClass({

    getInitialState() {
        return { 
            currentValue : "e"
        }
    },


    get() {
        
    },

    handleInputChange: function(value) {
        console.log(value);
        this.setState({currentValue: value});
        this.suggest(value);
        console.log(this.state);
    },

    render: function() {
        return (
            <div>
            <SearchInput
                handleInputChange = {this.handleInputChange}
                currentValue = {this.state.currentValue}
            />
            <SearchResults
                suggestions = {this.state.suggestions}
                searchResults = {this.state.searchResults}
            />
            </div>
        );
    }

});

module.exports = Search;

// module.exports = SearchInput;