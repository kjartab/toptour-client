import React, { Component } from 'react';
import FilterToursMenu from './FilterToursMenu.jsx'
import MapLayerMenu from './LayersMenu.jsx'
import AccountMenu from './AccountMenu.jsx'
import ToptourSidebarView from './ToptourSidebarView.jsx'

export default class MenuBox extends Component {

  constructor(props) {
    console.log("constructor")
    super(props);
    console.log("props", props);
    this.state = {open: true}; 
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleToggle() {
    console.log("toggle")
    this.setState({open: !this.state.open});
  }

  render() {
    var comp = null;
        console.log(this.props.selectedMenu);
        switch(this.props.selectedMenu) {

            case 'layers':
                comp = <MapLayerMenu 
                  toggleSnow={this.props.toggleSnow}
                  updateSnowDate={this.props.updateSnowDate}
                  activeSnow={this.props.activeSnow}
                  snowLayers={this.props.snowLayers}
                  changeSnowLayerDate={this.props.changeSnowLayerDate}
                  />;
                break;
            
            case 'toptourfilter':
                comp = <FilterToursMenu />;
                break;

            case 'account':
                comp = <AccountMenu />;
                break;

            case 'tourview':
                comp = <ToptourSidebarView selectedRoute={this.props.selectedRoute} />;

        }
      
    return comp;
  }
}