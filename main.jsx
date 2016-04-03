'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletMap = require('./components/LeafletMap.jsx');
var Search = require('./components/Search.jsx');
var _ = require('underscore');

require('bootstrap_css');


// ReactDOM.render(<LeafletMap selectedToptour={selectedToptour}/>, document.getElementById('map'));

// ReactDOM.render(<Search selectedToptour={selectedToptour} setSelectedToptour={setSelectedToptour}/>, document.getElementById('search-container'));

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
            <LeafletMap selectedToptour={this.state.selectedToptour}/>
            <Search setSelectedToptour={this.updateSelectedToptour}/>
        </div>);
    }

});


// class Application extends React.Component {
//     constructor () {
//         super();
//         this.state = {
//             selectedToptour : null
//         };
//     }

//     updateSelectedToptour(toptour) {
//         console.log(this);
//         setState({selectedToptour: toptour});
//     }


//     render() {
//         return (
//             <div>
//                 <LeafletMap selectedToptour={this.state.selectedToptour}/>
//                 <Search setSelectedToptour={this.updateSelectedToptour}/>
//             </div>
//         );
//     }
// }


ReactDOM.render(<App />, document.getElementById('wrapper'));