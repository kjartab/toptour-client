import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import mapboxgl from 'mapbox-gl';  


mapboxgl.accessToken = 'pk.eyJ1Ijoia2phcnRhYiIsImEiOiJjajFhaDJjeWYwMDM2MzNuNW9qaHY1Y2ljIn0.GXGL6PYl_oEw4kRmQw5uCQ';




export default class AccountMenu extends React.Component {


    constructor(props) {
      super(props);
      this.refreshLayers = this.refreshLayers.bind(this);
      this.refreshRoute = this.refreshRoute.bind(this);
      this.addLayers = this.addLayers.bind(this);
      this.setSelectedRoute = this.setSelectedRoute.bind(this);
      // this.map = this.map.bind(this);
      
    }


    addLayers() {
        console.log(this.state);
        // this.map.addLayer({
        //     'id': 'wms-test-layer',
        //     'type': 'raster',
        //     'source': 'snowraster',
        //     'paint': {}
        // }, 'aeroway-taxiway');

    } 



    setSelectedRoute(route) {
      console.log(route);
      if (route) {

        this.map.addLayer({
            "id": "selectedRoute",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": JSON.parse(route.geom)
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
      } else {
        if (this.map.getLayer("selectedRoute")) {
          this.map.removeLayer("selectedRoute");
        }
      }
    }


    componentDidMount() {
      var map = new mapboxgl.Map({
        container: this.refs.map,
        style: 'mapbox://styles/kjartab/cj1t888ks002y2rpft8wv3d3w'
      }); 
       map.on('load', function() {
        console.log("loaded")
        
        map.addSource("toptour:eturer",{
                "type" : "vector",
                "scheme" : "tms",
                "tiles": ["https://maps.trd.toptour.no/geoserver/gwc/service/tms/1.0.0/toptour:eturer@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
            });

        map.addLayer({
            "id": "test",
            "type": "line", 
            "source":  "toptour:eturer",
            "source-layer" : "eturer",
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#454545",
                "line-width": 3
            }
        }) 
      });
      this.map = map;
      console.log("mounted")
    }


    componentDidUpdate() {
        console.log(this.props, "update");
        this.refreshLayers();
        this.setSelectedRoute(this.props.selectedRoute);
    }

    refreshLayers() {
        console.log("changes")
        if (this.props.snowActive && this.props.activeSnowLayer) {

            if (!this.map.getSource(this.props.activeSnowLayer.name)) {
                this.map.addSource(this.props.activeSnowLayer.name, {
                  'type': 'raster',
                  'tiles': [
                        'https://maps.trd.toptour.no/geoserver/snow/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=snow:' + this.props.activeSnowLayer.name + '&transparent=true'
                        // this.props.activeSnowLayer.href
                      // 'https://maps.trd.toptour.no/geoserver/snow/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=snow:workfile_sd_2016-05-19&transparent=true'
                  ],
                  'tileSize': 256
                });
            }
            console.log("should render");
            if (!this.map.getLayer("snowlayer")) {
                 console.log("adding");
                this.map.addLayer({
                    'id': "snowlayer",
                    'type': 'raster',
                    'source': this.props.activeSnowLayer.name,
                    'paint': {}
                }, 'aeroway-taxiway');
            } else {
                console.log(this.map.getLayer("snowlayer"));
                console.log(this.map.getLayer("snowlayer").source, this.props.activeSnowLayer.name)
                if (this.map.getLayer("snowlayer").source !== this.props.activeSnowLayer.name) {
                    this.map.removeLayer("snowlayer")
                    this.map.addLayer({
                        'id': "snowlayer",
                        'type': 'raster',
                        'source': this.props.activeSnowLayer.name,
                        'paint': {}
                    }, 'aeroway-taxiway');
                }
            }
        } else if (this.props.activeSnowLayer) {
            if (this.map.getLayer(this.props.activeSnowLayer.name)) {
                this.map.removeLayer(this.props.activeSnowLayer.name)
            }
        }
    }

    refreshRoute() {

    }
    // componentDidUpdate() {
    //   console.log(this.props);
    // }


    render() { 
        return (
            <div ref="map" className="fullscreenmap">
            </div>
        );
    }


    // render() {
    //   var map = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/kjartab/cj1t888ks002y2rpft8wv3d3w'
    //   });

    //   map.on('load', function () {

    //     map.addSource("geoserver",{
    //         "type" : "vector",
    //         "scheme" : "tms",
    //         "tiles": ["https://maps.trd.toptour.no/geoserver/gwc/service/tms/1.0.0/toptour:sane_turer7@EPSG:900913@pbf/{z}/{x}/{y}.pbf"]
    //     });

    //     map.addLayer({
    //         "id": "terrain-data",
    //         "type": "line", 
    //         "source":  "geoserver",
    //         "source-layer" : "sane_turer7",
    //         "layout": {
    //             "line-join": "round",
    //             "line-cap": "round"
    //         },
    //         "paint": {
    //             "line-color": "#454545",
    //             "line-width": 3
    //         }
    //     });

    //     map.addSource("snowraster", {
    //       'type': 'raster',
    //       'tiles': [
    //           'https://maps.trd.toptour.no/geoserver/toptour/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=toptour:sd2'
    //       ],
    //       'tileSize': 256
    //     });

    //   });

    //   this.map = map;
    // }

}

