'use strict';
var L = require('leaflet');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('leaflet_css');
require('leaflet_marker');
require('leaflet_marker_2x');
require('leaflet_marker_shadow');

// var createMap = require('./createMap');

L.Icon.Default.imagePath = 'bundles/images/';


var LeafletVC = React.createClass({

    componentDidMount: function () {
        var map = new L.map(this.refs.map, {zoomControl: false}).setView([61.3999272955946,5.7503078840252], 8);

        L.tileLayer('http://www.webatlas.no/maptiles/tiles/webatlas-standard-vektor/wa_grid/{z}/{x}/{y}.png', {
            maxZoom: 20,
            zIndex: 0,
            attribution: '<a target=_blank href="http://www.norkart.no">Norkart AS</a>'
        }).addTo(map);

        // var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+config.mapboxToken, {
        //     attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }).addTo(map);

        var toptourWms = L.tileLayer.wms(config.geodata.server + '/toptour ',
             {
                layers : 'tur',
                format: 'image/png',
                transparent: true
             }
            ).addTo(map);

        this.map = map;
        var that = this;

        this.map.on('moveend', function(e) {
            var latLng = that.map.getCenter();
            that.props.updateCamera({
                    center : { 
                        lat : latLng.lat,
                        lng : latLng.lng
                    }
            });
        });


        if (this.props.selectedToptour) {
            this.layer = L.geoJson(this.props.selectedToptour.geojson).addTo(this.map);
        }

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

module.exports = LeafletVC;