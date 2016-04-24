'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletVC = require('./components/GraphicVC/LeafletVC.jsx');
// var CesiumVC = require('./components/GraphicVC/CesiumVC.jsx');
var OpenlayersVC = require('./components/GraphicVC/OpenlayersVC.jsx');
var Search = require('./components/Search.jsx');
var SideBar = require('./components/SideBar.jsx');
var ToptourView = require('./components/ToptourView.jsx');
var _ = require('underscore');
require('./style/map.css');
require('./style/css/ionicons.css');

// require('./node_modules/ionicons/dist/css/ionicons.css');


var ToptourHeader = React.createClass({

    render: function() {
        return (
            <div className="toptour-header">
                {this.props.selectedToptour.navn}
            </div>
            )
    }

});

var ToptourInfoMenu = React.createClass({
    render: function() {
        return(<div className="menu">
                <h3>{this.props.selectedToptour.navn}</h3>
                <div>{this.props.selectedToptour.beskrivelse}</div>
            </div>);
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


var GraphicViewControllerRadioButton = React.createClass({


    onChange: function(e) {
        this.props.onChange(this.props.graphicVCId);
        require.ensure(['jquery'], function() {
            var $ = require('jquery');
            console.log("ENSURE JQUERY");
        var k= $("<div></div>");
        });
    },

    render: function() {
        return <div >
                    <input 
                    type="radio" 
                    onChange={this.onChange}
                    name="graphicVCId" 
                    checked = {this.props.graphicVC.selected}
                    // check={this.props.selected}
                    value={this.props.graphicVC.id}
                /> {this.props.graphicVC.name}</div>
    }
});


var GraphicViewerControllerMenu = React.createClass({

    onGraphicVCChanged: function(graphicVCId) {
        this.props.selectGraphicVCById(graphicVCId);
    },

    render:  function() {

        var radios = _.map(this.props.graphicVCs, function(obj, key) {
            return (<GraphicViewControllerRadioButton 
                        graphicVCId={key}
                        key = {key}
                        graphicVC={obj}
                        onChange={this.onGraphicVCChanged} 
                    />);
        }, this);

        return(<div className="menu">
                    <h3>Karttype</h3>

                    <form action="">
                    {radios}
                    
                    </form>
        </div>);
    }

});


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
                },  
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
                    <GraphicViewerControllerMenu
                        graphicVCs={this.state.graphicVCs}
                        selectGraphicVCById={this.selectGraphicVCById}
                    />);

            case "selected-map":                
                return (
                    <GraphicViewerControllerMenu
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