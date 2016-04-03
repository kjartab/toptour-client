'use strict';
var L = require('leaflet');

function createMap(element) {

    var map = new L.map(element, {zoomControl: false}).setView([61.3999272955946,5.7503078840252], 14);


    L.tileLayer('http://www.webatlas.no/maptiles/tiles/webatlas-gray-vektor/wa_grid/{z}/{x}/{y}.png', {
        maxZoom: 20,
        zIndex: 0,
        attribution: '<a target=_blank href="http://www.norkart.no">Norkart AS</a>'
    }).addTo(map);
    
    console.log("ADDED");
    return map;
}

module.exports = createMap; 