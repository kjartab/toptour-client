import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 
import mapboxgl from 'mapbox-gl';  


mapboxgl.accessToken = 'pk.eyJ1Ijoia2phcnRhYiIsImEiOiJjajFhaDJjeWYwMDM2MzNuNW9qaHY1Y2ljIn0.GXGL6PYl_oEw4kRmQw5uCQ';




export default class AccountMenu extends React.Component {


    constructor(props) {
      super(props);
      this.refreshLayers = this.refreshLayers.bind(this);
      this.refreshRoute = this.refreshRoute.bind(this); 
      this.setSelectedRoute = this.setSelectedRoute.bind(this);
      this.cleanSelectedRoutes = this.cleanSelectedRoutes.bind(this);
      this.state = {
        "routeId" : null
      }
    }

    componentDidUpdate(data) {
      console.log(data, this.props);

    }

    setSelectedRoute(route) {

      console.log("do something once") 

      if (route) {

        var routeId = route._id;

        if (routeId != this.state.routeId) {
          if (routeId) {
            this.cleanSelectedRoutes();
          }
          var geom = JSON.parse(route.geom);

          this.map.addLayer({
            "id": routeId,
            "type": "line",
            "source": {
                "type": "geojson",
                "data": geom
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

          this.setState({
            "routeId" : routeId
          });

          var coordinates = geom.coordinates;
          var bounds = coordinates.reduce(function(bounds, coord) {
              return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          this.map.fitBounds(bounds, {
              padding: 50
          });
        }
 
      } else {
        this.cleanSelectedRoutes();
      }
    }

    cleanSelectedRoutes() {
      var routeId = this.state.routeId;  
      if (this.map.getLayer(routeId)) {
        this.map.removeLayer(routeId);
        this.setState({
          "routeId" : null
        });
      } 
    }


    componentDidMount() {
      var map = new mapboxgl.Map({
        container: this.refs.map,
        style: 'mapbox://styles/kjartab/cj1t888ks002y2rpft8wv3d3w',
        center: [12, 64], // starting position
        zoom: 4 // starting zoom
      }); 
       map.on('load', function() {
        // console.log("loaded")
        
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

    }


    componentDidUpdate() {
        console.log(this.props, "update");
        this.refreshLayers();
        this.refreshRoute();

        this.setSelectedRoute(this.props.selectedRoute);
    }

    refreshLayers() {

        if (this.props.snowActive) {

            if (this.props.activeSnowLayer) {

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

                if (!this.map.getLayer("snowlayer")) {
                    this.map.addLayer({
                        'id': "snowlayer",
                        'type': 'raster',
                        'source': this.props.activeSnowLayer.name,
                        'paint': {}
                    }, 'aeroway-taxiway');
                } else {
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
            }

        } else if (this.map.getLayer("snowlayer")) {
            this.map.removeLayer("snowlayer")
        }
    }

    refreshRoute() {
        // console.log(this);
        // var layer = this.map.getLayer("selectedRoute");

        // console.log(data);
        // if (data) {
        //     this.map.getLayer("selectedRoute");
        // } else {
        //     if (this.map.getLayer(data.id)) {
        //         this.map.removeLayer(data.id);
        //     } else {

        //     }

        // }
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

