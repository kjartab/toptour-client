import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import SearchBox from './components/Search.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as name from "./module1";
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import FloatingActionButtonExampleSimple from './components/Floatingbutton.jsx'
injectTapEventPlugin();

import mapboxgl from 'mapbox-gl';  
mapboxgl.accessToken = 'pk.eyJ1Ijoia2phcnRhYiIsImEiOiJjajFhaDJjeWYwMDM2MzNuNW9qaHY1Y2ljIn0.GXGL6PYl_oEw4kRmQw5uCQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kjartab/cj1t888ks002y2rpft8wv3d3w',
});

map.on('load', function () {

  map.addSource("geoserver",{
      "type" : "vector",
      "scheme" : "tms",
      "tiles": ["https://maps.trd.toptour.no/geoserver/gwc/service/tms/1.0.0/toptour:toptour_sane@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
  });

  map.addLayer({
      "id": "terrain-data",
      "type": "line", 
      "source":  "geoserver",
      "source-layer" : "toptour_sane",
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#454545",
          "line-width": 3
      }
  });

});


var i = 0;

const onSelectRoute = function(geojson) {

  map.addLayer({
        "id": "route"+i++,
        "type": "line",
        "source": {
            "type": "geojson",
            "data": JSON.parse(geojson)
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    });
  
}

class App extends Component {
    render() {
        return (
          <div>
            <SearchBox onSelectRoute={onSelectRoute} /> 
            <FloatingActionButtonExampleSimple/>
          </div>
        )
      }
}

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  ,
  document.getElementById('root')
);