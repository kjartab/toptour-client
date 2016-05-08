'use strict';
// var ol = require('openlayers');
var ol = require('openlayers');
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
// contextualWMSLegend=0&crs=EPSG:32633&dpiMode=7&featureCount=10&format=image/png&layers=Kart&styles=&url=http://waapi.webatlas.no/wms-vektor-standard/?apitoken%3D7f9b6f4d-ee6e-4891-a18c-0e4bdf17f197%26
        var norkart = new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
              url: "http://www.webatlas.no/wms-std-forsikring-orto/",
              params: {'LAYERS': 'ortofoto', 'TILED': true, 'CRS' : "epsg:32633"  },
              serverType: 'geoserver'
            }))
          });


        var skiKart = new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
              url: "http://gridwms.nve.no/WMS_server/wms_server.aspx?time=2016-05-08&custRefresh=0.9774090043590655&SERVICE=WMS&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&STYLES=&VERSION=1.1.1&LAYERS=ski&SRS=EPSG:32633&",
              params: {'LAYERS': 'ski', 'TILED': true, 'CRS' : "epsg:32633"},
              serverType: 'geoserver'
            }))
          });

        var projection = new ol.proj.Projection({
            code: 'EPSG:32633',
            units: 'm'
        });
        var map = new ol.Map({
        layers: [
            norkart,
            // new ol.layer.Tile({
            //     source: new ol.source.OSM()
            // }),
            skiKart

        ],
        controls: [],
        target: this.refs.map,
        view: new ol.View({
            center: [0, 0],
            projection: projection,
            zoom: 2
        })
        });

        this.map = map;

        this.source = new ol.source.Vector();
        this.vectorLayer = new ol.layer.Vector({
            source: this.source
        });

        this.map.addLayer(this.vectorLayer);

        this.map.addLayer(skiKart);


        // var snokartSki = L.tileLayer.wms("http://gridwms.nve.no/WMS_server/wms_server.aspx?time=2016-05-08", {
        //     layers: 'ski',
        //     format: 'image/png',
        //     transparent: true,
        //     attribution: "NVE"
        // }).addTo(map);



        if (this.props.selectedToptour) {
        
            var geojsonFormat = new ol.format.GeoJSON();
            var features = geojsonFormat.readFeatures(this.getGeojson(this.props.selectedToptour.geojson), {

              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'}
              );

            this.source.addFeatures(features);

        }

        if (this.props.camera) {
            this.setView();
        }

        
    },

    setView: function() {

        var position = this.props.camera.center;

        // var extent = []
        // this.map.fit(extent, map.getSize()); 


        this.map.getView().setCenter(ol.proj.transform([position.lng, position.lat], 'EPSG:4326', 'EPSG:3857'));
        this.map.getView().setZoom(12);
        
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
                    console.log("clearing");
                    ;
                }
            if (this.props.selectedToptour) {
                var geojsonFormat = new ol.format.GeoJSON();
                var features = geojsonFormat.readFeatures(this.getGeojson(this.props.selectedToptour.geojson), {
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'}
                  );

                this.source.addFeatures(features);

                
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