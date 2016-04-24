'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
window.CESIUM_BASE_URL = './public/CesiumUnminified';
// require('cesium_js');

require("script!../../public/CesiumUnminified/Cesium.js");
// require('./public/CesiumUnminified/Cesium.js');
require('cesium_widgets_css');
var _ = require('underscore');
var Cesium = window.Cesium;


// require('leaflet_css');
// require('leaflet_marker');
// require('leaflet_marker_2x');
// require('leaflet_marker_shadow');



var CesiumVC = React.createClass({

    componentDidMount: function () {

        var config = {
            timeline: false, 
            baseLayerPicker: false,     
            geocoder : false, 
            animation: false,
            orderIndependentTranslucency: false,
            fullscreenButton: false,
            babseLayerPicker: false,
            infoBox: false,
            homeButton:false,
            sceneModePicker:false,
            navigationHelpButton: false,
            creditContainer: 'attribution'
        }


        var viewer = new Cesium.Viewer(this.refs.map, config);

        var cesiumTerrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world',
            requestVertexNormals : true,
            requestWaterMask: false
        });
        viewer.terrainProvider = cesiumTerrainProvider;


        viewer.scene.globe.depthTestAgainstTerrain = true;

        this.viewer = viewer;

        if (this.props.selectedToptour) {
            this.addGeojson(this.props.selectedToptour.geojson);
        }

        if (this.props.camera) {
            this.setView();
        }

    },

    setView: function() {
        var position = this.props.camera.center;
        this.viewer.camera.setView({
            destination : Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 15000.0)
        });
    },

    addGeojson: function(geojson) {

        var positions = _.map(geojson.coordinates, function(pos) {
            return Cesium.Cartographic.fromDegrees(pos[0], pos[1]);
        });

        var promise = Cesium.sampleTerrain(this.viewer.terrainProvider, 11, positions);
        var that = this;

        Cesium.when(promise, function(updatedPositions) {

            geojson.coordinates = _.map(updatedPositions, function(pos) {
                return [ Cesium.Math.toDegrees(pos.longitude), Cesium.Math.toDegrees(pos.latitude), pos.height+20];
            });

            that.addGeojsonDataSource(geojson);
        });

    },

    removeToptourLayer: function() {
        this.viewer.dataSources.remove(this.toptourLayer);
    },

    addGeojsonDataSource: function(geojson) {

        var promise = Cesium.GeoJsonDataSource.load(geojson, {
            stroke: Cesium.Color.HOTPINK,
            fill: Cesium.Color.PINK,
            strokeWidth: 3,
            markerSymbol: '?'
        });
        var that = this;
        promise.then(function(dataSource) {
            that.toptourLayer = dataSource;
            that.viewer.dataSources.add(that.toptourLayer);
        });

    },

    componentDidUpdate: function (prevProps, prevState) {

        if (prevProps.selectedToptour != this.props.selectedToptour) {

            if (this.toptourLayer) {
                this.removeToptourLayer();
            }            

            if (this.props.selectedToptour) {
                this.addGeojson(this.props.selectedToptour.geojson);
            }
        } else {

            if (!this.props.selectedToptour) {
                this.removeToptourLayer();
            }
        }

    },

    render: function() {
        return (

            <div ref="map" className="fullscreenmap">
                <div id="attribution" style={{display:"none"}}></div>
            </div>
        );
    }
});

module.exports = CesiumVC;