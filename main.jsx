'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletVC = require('./components/GraphicVC/LeafletVC.jsx');
// var CesiumVC = require('./components/GraphicVC/CesiumVC.jsx');
var OpenlayersVC = require('./components/GraphicVC/OpenlayersVC.jsx');

var Search = require('./components/Search.jsx');
var SideBar = require('./components/Sidebar/SideBar.jsx');

var NewsMenu = require('./components/Menu/NewsMenu.jsx');
var AboutMenu = require('./components/Menu/AboutMenu.jsx');
var ToptourInfoMenu = require('./components/Menu/ToptourInfoMenu.jsx');
var ToptourHeader = require('./components/Menu/ToptourHeader.jsx');
var GraphicViewControllerMenu = require('./components/Menu/GraphicViewControllerMenu.jsx');

var ToptourView = require('./components/ToptourView.jsx');
var _ = require('underscore');
require('./style/map.css');

require('ionicons_css');


var App = React.createClass({

    getInitialState: function() {

        var graphicVCs = {
            "openlayers": {
                name: "Openlayers",
                selected : false
            },  
            "leaflet": {
                name: "Leaflet",
                selected : true
            }
            ,  
            "cesium": {
                name: "Cesium",
                selected: false
            }
            
        };

        return {
            searchServerUrl : config.searchServerUrl,
            selectedMenu: "search",
            selectedToptour : null,
            visible: false,
            graphicVCs: graphicVCs,
            camera: null
        }
    },

    getSelectedGraphicVC: function() {
        return _.find(state.graphicVCs, function(graphicVC) {
            return graphicVC.selected === true;
        });
    },

    selectGraphicVCById: function(graphicVCId) {

        var graphicVCs = this.state.graphicVCs;
        for (var key in graphicVCs) {
            if (key === graphicVCId) {
                graphicVCs[key].selected = true;
            } else {
                graphicVCs[key].selected = false;
            }
        }
        console.log(graphicVCs)

        this.setState({
            graphicVCs : graphicVCs
        });
    },

    updateSelectedToptour: function(toptour) {
        this.setState({selectedToptour : toptour, visible: true});
    },

    deselectToptour: function() {
        this.setState({selectedToptour : null, visible: false});
    },

    getActiveMenu: function() {

        switch (this.state.selectedMenu) {
            case "search":
                return (<Search 
                    setSelectedToptour={this.updateSelectedToptour} 
                    searchServerUrl={this.state.searchServerUrl}
                />);

            case "maps":
                return (
                    <GraphicViewControllerMenu
                        graphicVCs={this.state.graphicVCs}
                        selectGraphicVCById={this.selectGraphicVCById}
                    />);

            case "selected-map":                
                return (
                    <GraphicViewControllerMenu
                        graphicVCs={this.state.graphicVCs}
                        selectGraphicVCById={this.selectGraphicVCById}
                    />);
            case "selected-info":
                return (<ToptourInfoMenu
                        selectedToptour={this.state.selectedToptour}
                        />
                    );
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

    updateCamera: function(camera) {
        console.log(camera);
        this.setState({camera : camera});
    },

    getGraphicVC: function() {
        var selectedKey = null;
        _.each(this.state.graphicVCs, function(graphicVC, key) {
            if (graphicVC.selected === true) {
                selectedKey = key
            }
        });

        switch(selectedKey) {
            case "openlayers":
                return <OpenlayersVC 
                            selectedToptour={this.state.selectedToptour}
                            addedLayers={this.state.addedLayers}
                            updateCamera={this.updateCamera}
                            camera={this.state.camera}
                        />;

            case "leaflet":
                    return <LeafletVC 
                            selectedToptour={this.state.selectedToptour}                            
                            addedLayers={this.state.addedLayers}
                            updateCamera={this.updateCamera}
                            camera={this.state.camera}
                        />;

            // case "cesium":
            //     return  <CesiumVC 
            //                 selectedToptour={this.state.selectedToptour}
            //                 addedLayers={this.state.addedLayers}
            //                 updateCamera={this.updateCamera}
            //                 camera={this.state.camera}
            //             />;

            // case 'mapboxgl' : 
            //     return <MapboxGlVC 
            //                 selectedToptour={this.state.selectedToptour}
            //                 addedLayers={this.state.addedLayers}
            //                 updateCamera={this.updateCamera}
            //                 camera={this.state.camera}
            //             />;

            default:
                return <LeafletVC 
                            selectedToptour={this.state.selectedToptour}                            
                            addedLayers={this.state.addedLayers}
                            updateCamera={this.updateCamera}
                            camera={this.state.camera}
                        />;
        }
        
    },

    selectMenu: function(menuId) {

        if (menuId === 'selected-back') {
            this.deselectToptour();
            this.setState({selectedMenu : "search"});
        } else {
            this.setState({selectedMenu : menuId});
        }

    },

    render: function() {

        var menu = this.getMenu();
        var graphicVC = this.getGraphicVC();
        console.log(graphicVC);
        console.log(menu);
        return (<div className="wrapper">
            {graphicVC}
            <SideBar
                selectedToptour={this.state.selectedToptour}
                deselectToptour={this.deselectToptour}
                selectMenu={this.selectMenu}

            />
            {menu}
            

        </div>);
    }

});


ReactDOM.render(<App />, document.getElementById('wrapper'));