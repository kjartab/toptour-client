'use strict';
var L = require('leaflet');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('leaflet_css');
require('../style/map.css');
require('leaflet_marker');
require('leaflet_marker_2x');
require('leaflet_marker_shadow');

var createMap = require('./createMap');


L.Icon.Default.imagePath = 'bundles/images/';

var LeafletMap = React.createClass({


    shouldComponentUpdate() {
        return false;
    },

    componentDidMount: function () {
        this.viewer = new CesiumViewer(this.refs.cesium, cesiumViewerOptions);
    },

    componentDidUpdate: function () {

        if (this.layer) {
            this.layer.clearLayers();
        }

        this.layer = L.geoJson(this.props.selectedToptour.geojson).addTo(this.map);
        this.map.fitBounds(this.layer.getBounds());
    },

    render() {
        return (
            <div ref="cesium" className="fullscreenmap">
            </div>
        );
    }
});

module.exports = LeafletMap;
