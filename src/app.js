import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import LeftMenu from './components/menus/LeftMenu.jsx'
import SearchBox from './components/Search.jsx'
import MenuBox from './components/menus/MenuBox.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
      "tiles": ["https://maps.trd.toptour.no/geoserver/gwc/service/tms/1.0.0/toptour:sane_turer5@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
  });

  map.addLayer({
      "id": "terrain-data",
      "type": "line", 
      "source":  "geoserver",
      "source-layer" : "sane_turer5",
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#454545",
          "line-width": 3
      }
  });

  map.addSource("snowraster", {
    'type': 'raster',
    'tiles': [
        'https://maps.trd.toptour.no/geoserver/toptour/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=toptour:sd2'
    ],
    'tileSize': 256
  });


});

function addSnowLayer() {

    map.addLayer({
        'id': 'wms-test-layer',
        'type': 'raster',
        'source': 'snowraster',
        'paint': {}
    }, 'aeroway-taxiway');
}

function removeSnowLayer() {
  map.removeLayer('wms-test-layer');
}



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

    constructor() {
      super();
      this.state = {

        menus : [
          {
            id : "home"
          },
          {
            id : "layers"
          },
          {
            id: "tours"
          }
        ],
        selectedMenu : "home",
        snowActive : false
      }
      this.setActiveMenu = this.setActiveMenu.bind(this);
      this.toggleSnow = this.toggleSnow.bind(this);
    }

    toggleSnow(event, isChecked) {

        this.setState({ snowActive : isChecked ? true : false })
        console.log("set state", isChecked,this.state);
        console.log("toggle")
        if (this.state.snowActive) {
          removeSnowLayer();
        } else {
          addSnowLayer();
        }

    }


    setActiveMenu(id) { 
      this.setState({ selectedMenu : id}); 
    }
    
    render() {
      console.log(this.state);
        return (
          <div>
            <LeftMenu 
              menus={this.state.menus} 
              selectedMenu={this.state.selectedMenu}
              setActiveMenu={this.setActiveMenu}
            />
            <SearchBox onSelectRoute={onSelectRoute} /> 
            <MenuBox selectedMenu={this.state.selectedMenu} toggleSnow={this.toggleSnow} activeSnow={this.state.snowActive} />
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