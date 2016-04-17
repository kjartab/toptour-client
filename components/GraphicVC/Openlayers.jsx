'use strict';
var L = require('leaflet');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('leaflet_css');



var OpenlayersVC = React.createClass({

    componentDidMount: function () {
        // var map = new L.map(this.refs.map, {zoomControl: false}).setView([61.3999272955946,5.7503078840252], 8);

        // L.tileLayer('http://www.webatlas.no/maptiles/tiles/webatlas-gray-vektor/wa_grid/{z}/{x}/{y}.png', {
        //     maxZoom: 20,
        //     zIndex: 0,
        //     attribution: '<a target=_blank href="http://www.norkart.no">Norkart AS</a>'
        // }).addTo(map);

        var map = var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: this.refs.map,
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
        });

        this.map = map;


        if (this.props.camera) {
            this.setView();
        }

        
    },

    setView: function() {

        var position = this.props.camera.center;
        this.map.setView([position.lat, position.lng], 12)
        

    },

    componentDidUpdate: function (prevProps, prevState) {
        
        if (prevProps.selectedToptour != this.props.selectedToptour) {
            if (this.layer) {
                    this.layer.clearLayers();
                }
            if (this.props.selectedToptour) {

                this.layer = L.geoJson(this.props.selectedToptour.geojson).addTo(this.map);
                this.map.fitBounds(this.layer.getBounds());
            }
        }
    },

    render: function() {
        return (
            <div ref="map" className="fullscreenmap">
            </div>
        );
    }
});

module.exports = OpenlayersVC;