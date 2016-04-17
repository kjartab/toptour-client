'use strict';
// var ol = require('openlayers');
var ol = require('../../node_modules/openlayers/dist/ol-debug.js');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('openlayers_css');


var OpenlayersVC = React.createClass({
   

    componentDidMount: function () {
        // var map = new L.map(this.refs.map, {zoomControl: false}).setView([61.3999272955946,5.7503078840252], 8);

        // L.tileLayer('http://www.webatlas.no/maptiles/tiles/webatlas-gray-vektor/wa_grid/{z}/{x}/{y}.png', {
        //     maxZoom: 20,
        //     zIndex: 0,
        //     attribution: '<a target=_blank href="http://www.norkart.no">Norkart AS</a>'
        // }).addTo(map);

        var map = new ol.Map({
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

        this.source = new ol.source.Vector();
        this.vectorLayer = new ol.layer.Vector({
                source: this.source
              });

                // vector.getSource().addFeature(k);

        this.map.addLayer(this.vectorLayer);

        if (this.props.selectedToptour) {
            
            // var geojson = this.getGeojson(this.props.selectedToptour.geojson);
            // this.vectorSource = new ol.source.Vector({
            //     features: (new ol.format.GeoJSON()).readFeatures(geojson)
            // });
        }
        // this.adde();
        // if (this.props.camera) {
        //     this.setView();
        // }

        
    },

    setView: function() {

        var position = this.props.camera.center;
        this.map.setView([position.lat, position.lng], 12);
        
    },

    getGeojson: function(geojsonFeature) {

        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326'
            }
            },
            'features': [
                {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'GeometryCollection',
                   'geometries': [
                      geojsonFeature
                    ]
                }
            }

            ]
        };
        return geojsonObject;
    },

    componentDidUpdate: function (prevProps, prevState) {
        

        if (prevProps.selectedToptour != this.props.selectedToptour) {
            if (this.source.getFeatures().length > 0) {
                    this.source.clear();
                    // this.map.removeLayer(this.layer);
                    console.log("clearing");
                    ;
                }
            if (this.props.selectedToptour) {

                // var geojson = this.getGeojson(this.props.selectedToptour.geojson);
                // var vectorSource = new ol.source.Vector({
                //     features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
                // // });
                // var gjsonObject = new ol.layer.Vector({
                //     source: new ol.source.GeoJSON(geojsonObject)
                // });
                var geojsonFormat = new ol.format.GeoJSON();
                var features = geojsonFormat.readFeatures(this.getGeojson(this.props.selectedToptour.geojson), {

                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'}
                  );

                this.source.addFeatures(features);

                this.vectorLayer.get
                
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