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

    getInitialState: function () {
        return {
            selectedBrewery: null
        };
    },

    componentDidMount: function () {
        var map = createMap(ReactDOM.findDOMNode(this));

        // var breweriesLayer = L.geoJson(this.state.breweries, {
        //     pointToLayer: function (feature, latlng) {
        //         return L.marker(latlng);
        //         }
        // }).addTo(map);

        // // start the map in South-East England
        // map.fitBounds(breweriesLayer.getBounds());
        
        // breweriesLayer.on('click', this.clicked, this);
        this.map = map;
        // this.breweriesLayer = breweriesLayer;
        // this.allLayers = breweriesLayer.getLayers();
    },



    componentDidUpdate: function () {
        if (this.selectedFeature) {
            if (this.selectedFeature.setIcon) {
                this.selectedFeature.setIcon(new L.Icon.Default());
                this.selectedFeature.setZIndexOffset(0);
            }
        }
        var newSelected = _.find(this.breweriesLayer.getLayers(), function (layer) {
            return (layer.feature.id === this.state.selectedBrewery);
        }, this);
        if (newSelected) {
            if (newSelected.setIcon) {
                newSelected.setIcon(selectedIcon);
                newSelected.setZIndexOffset(100);
            }
        }
        this.selectedFeature = newSelected;
    },

    render: function () {
        return (
            <div className="fullscreenmap">

            </div>
        );
    }
});

module.exports = LeafletMap;
