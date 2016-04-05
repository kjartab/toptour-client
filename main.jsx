'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletMap = require('./components/LeafletMap.jsx');
var Search = require('./components/Search.jsx');
var _ = require('underscore');
var CesiumComponent = require('./components/Cesium.jsx')

require('bootstrap_css');


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
//             <LeafletMap selectedToptour={this.state.selectedToptour}/>
//             <Search setSelectedToptour={this.updateSelectedToptour}/>
//         </div>);
//     }

// });

var App = React.createClass({

    getInitialState() {
        return {
            selectedToptour : null
        }
    },

    updateSelectedToptour(toptour) {
        this.setState({selectedToptour : toptour});
    },

    render() {
        return (<div>
                <CesiumComponent selectedToptour={this.state.selectedToptour}/>
                <Search setSelectedToptour={this.updateSelectedToptour}/>
            </div>);
        }

});






ReactDOM.render(<App />, document.getElementById('wrapper'));