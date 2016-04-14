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

    componentDidMount: function () {
        var map = new L.map(this.refs.map, {zoomControl: false}).setView([61.3999272955946,5.7503078840252], 12);

        L.tileLayer('http://www.webatlas.no/maptiles/tiles/webatlas-gray-vektor/wa_grid/{z}/{x}/{y}.png', {
            maxZoom: 20,
            zIndex: 0,
            attribution: '<a target=_blank href="http://www.norkart.no">Norkart AS</a>'
        }).addTo(map);
        this.map = map;
    },


    componentDidUpdate: function () {
        console.log(this.props, "map");
        console.log(this.props.selectedToptour);
        // this.layer.clearLayers();
        // this.layer.addLayer(this.props.selectedToptour.geojson);
        if (this.layer) {
        this.layer.clearLayers();
            
        }
        this.layer = L.geoJson(this.props.selectedToptour.geojson).addTo(this.map);
        this.map.fitBounds(this.layer.getBounds());
    },

    render: function() {
        return (
            <div ref="map" className="fullscreenmap">
            </div>
        );
    }
});

module.exports = LeafletMap;