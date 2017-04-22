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
  // var bbox = [[-79, 43], [-73, 45]];
  // map.fitBounds(bbox, {
  //   padding: {top: 10, bottom:25, left: 15, right: 5}
  // });
  // console.log(geojson);
  // map.addSource('some id', {
  //   type: 'geojson',
  //   data: {
  //      "type": "FeatureCollection",
  //      "features": [geojson]
  //   }
  // }); 
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

//   map.addSource('some id', {
//    type: 'geojson',
//    data: {
//        "type": "FeatureCollection",
//        "features": [{
//            "type": "Feature",
//            "properties": {},
//            "geometry": {
//                "type": "LineString",
//                "coordinates":  [
//                 [8.6353609332732, 62.7500070775828],
//                 [8.63209936698663, 62.7470987619946],
//                 [8.62926695415885, 62.7447797644738],
//                 [8.62660620271458, 62.7426178230226],
//                 [8.62385962057858, 62.7394728982314],
//                 [8.62343046711983, 62.7382934650554],
//                 [8.62265799089408, 62.7370353510664],
//                 [8.62179968397658, 62.7360130939747],
//                 [8.62437460472907, 62.7334966180376],
//                 [8.62609121856405, 62.7316877684886],
//                 [8.62858030862485, 62.7295445316008],
//                 [8.63227102837017, 62.7262212237598],
//                 [8.63690588572477, 62.7222484954017],
//                 [8.63982412924424, 62.719652166457],
//                 [8.64291403414725, 62.7168195473954],
//                 [8.64063952081585, 62.7154228088812],
//                 [8.63939497578546, 62.7141833940772],
//                 [8.63724920849168, 62.713042299573],
//                 [8.63553259465669, 62.7121766122846],
//                 [8.6345026263557, 62.7111534946176],
//                 [8.63467428773919, 62.7098155180779],
//                 [8.6360475788072, 62.7083200608633],
//                 [8.64016745201127, 62.7048566063189],
//                 [8.64171240446275, 62.703597067702],
//                 [8.64360067968131, 62.7023374754294],
//                 [8.64531729351632, 62.7008416399132],
//                 [8.64566061628332, 62.6999755952923],
//                 [8.64634726181733, 62.6987945844801],
//                 [8.64566061628332, 62.6972985697439],
//                 [8.64463064798233, 62.6955662476128]
//               ],
//            }
//        }]
//    }
// });

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