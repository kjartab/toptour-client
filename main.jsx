'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletVC = require('./components/LeafletVC.jsx');
var Search = require('./components/Search.jsx');
var SideBar = require('./components/SideBar.jsx');
var ToptourView = require('./components/ToptourView.jsx');
var _ = require('underscore');

// require('bootstrap_css');


// ReactDOM.render(<LeafletMap selectedToptour={selectedToptour}/>, document.getElementById('map'));

// ReactDOM.render(<Search selectedToptour={selectedToptour} setSelectedToptour={setSelectedToptour}/>, document.getElementById('search-container'));

var ToptourHeader = React.createClass({

    render: function() {
        return (
            <div className="toptour-header">
                {this.props.selectedToptour.navn}
            </div>
            )
    }

});


var NewsMenu = React.createClass({
    render: function() {
        return(<div className="menu">
            News
        </div>);
    }
});

var AboutMenu = React.createClass({
    render: function() {
        return(<div className="menu">
            About
        </div>);
    }
});

var MapMenu = React.createClass({

    render: function() {
        return (
            <div className="menu">
                <h3>Kartlag</h3>
                <p>OSM</p>
                <p>Norkart</p>
                
                <h3>Karttype</h3>
                <p>Leaflet</p>
                <p>Cesium</p>
                <p>Mapbox</p>
                <p>Mapzen</p>
            {this.props.mapType}
            </div>
            );
    }

});


var App = React.createClass({

    getInitialState: function() {
        return {
            searchServerUrl : config.searchServerUrl,
            selectedMenu: "search",
            selectedToptour : null,
            visible: false,
            mapType: "leaflet"
        }
    },

    updateSelectedToptour: function(toptour) {
        this.setState({selectedToptour : toptour, visible: true});
    },

    deselectToptour: function() {
        this.setState({selectedToptour : null, visible: false});
    },

    getActiveMenu() {

        switch (this.state.selectedMenu) {
            case "search":
                return (<Search 
                    setSelectedToptour={this.updateSelectedToptour} 
                    searchServerUrl={this.state.searchServerUrl}
                />);

            case "maps":
                return (
                    <MapMenu
                        mapType={this.props.mapType}
                    />);

            case "selected-map":                
                return (
                    <MapMenu
                        mapType={this.props.mapType}
                    />);

            case "news":
                return(
                    <NewsMenu

                    />
                    );
            case "about":
                return(
                    <AboutMenu

                    />
                    );
            default:
                return null;

        }
    },

    getMenu: function() {

        if (this.state.selectedToptour) {
            if (this.state.selectedMenu.startsWith('selected')) {
                return this.getActiveMenu();
            } else {
                return <ToptourHeader selectedToptour = {this.state.selectedToptour}/>
            }
        } else {
            if (!this.state.selectedMenu) {
                this.selectMenu('search');
            } else {
                return this.getActiveMenu();
            }
        }

            
    },

    getMapView: function(mapType) {
        switch(mapType) {
            case "leaflet":
                console.log("render map", this.state.selectedToptour);
                return(<LeafletVC selectedToptour={this.state.selectedToptour}/>);

            case "openlayers":
                return null;
                // return(<OpenlayersVC selectedToptour={this.state.selectedToptour}/>);

            case "cesium":
                return null;
                // return(<CesiumVC selectedToptour={this.state.selectedToptour}/>);
        }
        
    },

    selectMenu: function(menuId) {
        console.log(menuId);
        if (menuId === 'selected-back') {

            this.deselectToptour();
            this.setState({selectedMenu : "search"});
        } else {
            console.log("TIHS MENU " , menuId)
            this.setState({selectedMenu : menuId});
        }

    },

    render: function() {

        var menu = this.getMenu();
        console.log(this.state.selectedMenu);
        var map = this.getMapView();

        return (<div className="wrapper">
            <LeafletVC selectedToptour={this.state.selectedToptour}/>
            <SideBar
                selectedToptour={this.state.selectedToptour}
                deselectToptour={this.deselectToptour}
                selectMenu={this.selectMenu}
            />
            {menu}
            

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