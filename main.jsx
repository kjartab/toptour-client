'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletMap = require('./components/LeafletMap.jsx');
var Search = require('./components/Search.jsx');
var SideBar = require('./components/SideBar.jsx');
var ToptourView = require('./components/ToptourView.jsx');
var _ = require('underscore');

require('bootstrap_css');


// ReactDOM.render(<LeafletMap selectedToptour={selectedToptour}/>, document.getElementById('map'));

// ReactDOM.render(<Search selectedToptour={selectedToptour} setSelectedToptour={setSelectedToptour}/>, document.getElementById('search-container'));


var App = React.createClass({

    getInitialState: function() {
        return {
            searchServerUrl : config.searchServerUrl,
            selectedToptour : null,
            visible: false
        }
    },

    updateSelectedToptour: function(toptour) {
        this.setState({selectedToptour : toptour, visible: true});
    },

    deselectToptour: function() {
        this.setState({selectedToptour : null, visible: false});
    },

    render: function() {
        return (<div className="wrapper">
            <LeafletMap selectedToptour={this.state.selectedToptour}/>
            <SideBar selectedToptour={this.state.selectedToptour}/>
            <Search 
                setSelectedToptour={this.updateSelectedToptour} 
                searchServerUrl={this.state.searchServerUrl}
            />
            {
                this.state.selectedToptour && this.state.visible ?
                <ToptourView 
                    deselectToptour={this.deselectToptour}
                    selectedToptour={this.state.selectedToptour}/>
                : null
            }

        </div>);
    }

});



// var App = React.createClass({

//     getInitialState() {
//         return {
//             selectedToptour : null
//         }
//     },

//     updateSelectedToptour(toptour) {
//         this.setState({selectedToptour : toptour});
//     },

//     render() {
//         return (<div>
//                 <CesiumComponent selectedToptour={this.state.selectedToptour}/>
//                 <Search setSelectedToptour={this.updateSelectedToptour}/>
//             </div>);
//         }

// });






ReactDOM.render(<App />, document.getElementById('wrapper'));