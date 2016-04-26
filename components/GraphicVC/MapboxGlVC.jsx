'use strict';
var mapboxgl = require('mapbox-gl');
var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

require('mapboxgl_css');

var MapboxGlVC = React.createClass({
   

    componentDidMount: function () {


        mapboxgl.accessToken = 'pk.eyJ1Ijoia2phcnRhYiIsImEiOiJCR3VPNVlVIn0.0kqmR1Dg7bcnGpXqwuxqVQ';
        var map = new mapboxgl.Map({
            container: this.refs.map,
            style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
            center: [-74.50, 40], // starting position
            zoom: 9 // starting zoom
        });



    },

    setView: function() {

    },


    componentDidUpdate: function (prevProps, prevState) {
        

        if (prevProps.selectedToptour != this.props.selectedToptour) {
            if (this.source.getFeatures().length > 0) {

                    console.log("clearing");

                }
            if (this.props.selectedToptour) {

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


module.exports = MapboxGlVC;