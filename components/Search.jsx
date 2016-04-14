'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');  
var _ = require('underscore');




var SearchInput = React.createClass({

    handleChange: function(event) {
        this.props.handleInputChange(event.target.value);
        // this.setState({value: event.target.value});
    },

    render: function() {
        return (
            <input
                type="text"
                value={this.props.currentValue}
                onChange={this.handleChange}
            />
        );
    }

});

var SearchResultElement = React.createClass({

    onClick: function(e) {
        console.log("click");
        this.props.selectResult(this.props.hit._source);
    },

    render: function() {
        return (
            <div className="search-result">
                <li onClick={this.onClick}>{this.props.hit._source.navn}</li>
            </div>
            );
    }

})

var SearchResultList = React.createClass({



    selectSuggestion: function(id) {

    },


    render: function() {

        var res = this.props.searchResults;
        var hits = [];
        if (res) {
            hits = res.hits.hits;
        } 
        var resultElements = _.map(hits, function(hit) {

            return <SearchResultElement 
                        key={hit._id}
                        hit={hit}
                        selectResult={this.props.selectToptour}
                    />;
        }, this);
    
        return (            
            <ul>
                {resultElements}
            </ul>
        );
    }

})

var Search = React.createClass({

    getInitialState: function() {
        return { 
            currentValue : "..",
            searchResults: null,
            suggestions: null
        }
    },

    updateResults: function(data) {
        this.setState({searchResults: data })
    },

    search: function(queryText) {
        var query = {
            query : { 
                bool: { 
                    must: [
                        { "match": { "_all":  queryText  }}  
                    ],
                    filter: [ 
                        { "terms": { "tags": ["skitur"] }} 
                    ]
                }
            }
        }


        $.ajax({
            context: this,
            method : 'POST',
            data : JSON.stringify(query),
            url: "http://localhost:9200/toptour/_search",
            success: function(data) {
                this.updateResults(data);
            },
            error: function(data) {
                console.log(data);
            }
        }, this);
    },


    handleInputChange: function(value) {
        this.setState({currentValue: value});
        this.search(value);
    },
    
    onMouseOut: function() {
    },

    render: function() {

        return (
            <div 

                onMouseOut={this.onMouseOut}
                className="search-container">
                <SearchInput
                    handleInputChange = {this.handleInputChange}
                    currentValue = {this.state.currentValue}
                />
                <SearchResultList
                    selectToptour = {this.props.setSelectedToptour}
                    selectedToptour = {this.props.selectedToptour}
                    suggestions = {this.state.suggestions}
                    searchResults = {this.state.searchResults}
                />
            </div>
        );
    }

});

module.exports = Search;

// module.exports = SearchInput;