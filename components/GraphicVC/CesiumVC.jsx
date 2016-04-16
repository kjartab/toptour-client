'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
window.CESIUM_BASE_URL = './lib/Build/Cesium';
require('cesium_js');
require('cesium_widgets_css');
var Cesium = window.Cesium;


require('leaflet_css');
require('leaflet_marker');
require('leaflet_marker_2x');
require('leaflet_marker_shadow');



var CesiumVC = React.createClass({

    componentDidMount: function () {

        var viewer = new Cesium.Viewer(this.refs.map);


        this.map = viewer;
    },



    componentDidUpdate: function (prevProps, prevState) {


        if (this.props.selectedToptour) {

            
            
        }
        

    },

    render: function() {
        return (
            <div ref="map" className="fullscreenmap">
            </div>
        );
    }
});

module.exports = CesiumVC;