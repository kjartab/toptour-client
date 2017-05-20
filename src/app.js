import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import LeftMenu from './components/menus/LeftMenu.jsx'
import SearchBox from './components/Search.jsx'
import MenuBox from './components/menus/MenuBox.jsx'

import MapboxVC from './components/map/MapboxVC.jsx'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as name from "./module1";
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import FloatingActionButtonExampleSimple from './components/Floatingbutton.jsx'
injectTapEventPlugin();


const leftPad = (num) => {
  var str = "" + num
  var pad = "00"
  return pad.substring(0, pad.length - str.length) + str;
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
          },
          {
            id: "tourview"
          }
        ],
        selectedMenu : "home",
        snowActive : false,
        activeSnowLayer: null
      }
      this.setActiveMenu = this.setActiveMenu.bind(this);
      this.toggleSnow = this.toggleSnow.bind(this);
      this.onSelectRoute = this.onSelectRoute.bind(this);
      this.changeSnowLayerDate = this.changeSnowLayerDate.bind(this);
      this.getLayers();
    }
    
    getLayers() { 
      var context = this;
      fetch("https://maps.trd.toptour.no/geoserver/rest/workspaces/snow/coveragestores.json",
      {
          headers: {
            'Authorization' : 'Basic YWRtaW46Z2Vvc2VydmVy' 
          },
          method: "GET"
      })
      .then(function(response) { 
        return response.json()
      }).then(function(json) { 

        context.setState({'snowLayers' : json.coverageStores.coverageStore });
        console.log(json);
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
    }

    onSelectRoute(data) { 
        this.setState({selectedRoute: data});
        if (data) {
          this.setActiveMenu('tourview')
        }
    }
    
    changeSnowLayerDate(event, date) {
      console.log(event, date);
      console.log(date.getYear());
      console.log(date.getDay());
      console.log(date.getMonth());
      console.log()
      var n = "nve_sd_" + (date.getUTCFullYear()) + "-" + leftPad(date.getUTCMonth()+1) + "-" + leftPad(date.getUTCDate());
      console.log(n);
      for (var i=0; i<this.state.snowLayers.length; i++) {
        console.log(i, this.state.snowLayers[i],this.state.snowLayers[i].name==n, n, );
        if (n === this.state.snowLayers[i].name) {
          console.log("settings tate");
          this.setState({
            activeSnowLayer : this.state.snowLayers[i]
          })
        }
      }
    }

    toggleSnow(event, isChecked) {

        var stateAdd = {
          snowActive : isChecked ? true : false
        }
        if (!this.state.activeSnowLayer) {
          stateAdd.activeSnowLayer = this.state.snowLayers[19]
        }
        
        this.setState(stateAdd);

    }

    setActiveMenu(id) { 
      this.setState({ selectedMenu : id}); 
    }
    
    render() {
      console.log(this.state);
        return (
          <div>
            <MapboxVC 
              snowLayers={this.state.snowLayers}
              snowActive={this.state.snowActive}
              activeSnowLayer={this.state.activeSnowLayer}
            />
            <LeftMenu 
              menus={this.state.menus} 
              selectedMenu={this.state.selectedMenu}
              setActiveMenu={this.setActiveMenu}
            />
            <SearchBox onSelectRoute={this.onSelectRoute} /> 
            <MenuBox 
              selectedMenu={this.state.selectedMenu} 
              toggleSnow={this.toggleSnow}
              snowLayers={this.state.snowLayers}
              activeSnow={this.state.snowActive} 
              activeSnowLayer={this.state.activeSnowLayer}
              changeSnowLayerDate={this.changeSnowLayerDate}
              selectedRoute={this.state.selectedRoute}
            />
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