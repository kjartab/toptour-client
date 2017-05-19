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
        snowActive : false
      }
      this.setActiveMenu = this.setActiveMenu.bind(this);
      this.toggleSnow = this.toggleSnow.bind(this);
      this.onSelectRoute = this.onSelectRoute.bind(this);
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
    
    toggleSnow(event, isChecked) {

        this.setState({ snowActive : isChecked ? true : false });
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