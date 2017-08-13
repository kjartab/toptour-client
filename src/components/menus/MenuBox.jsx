import React, { Component } from 'react';
import FilterToursMenu from './FilterToursMenu.jsx'
import MapLayerMenu from './LayersMenu.jsx'
import AccountMenu from './AccountMenu.jsx'
import ToptourSidebarView from './ToptourSidebarView.jsx'

export default class MenuBox extends Component {

  constructor(props) {
    super(props);
    this.state = {open: true}; 
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    var comp = null;
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
                comp = <AccountMenu getUser={this.props.getUser} />;
                break;

            case 'tourview':
                comp = <ToptourSidebarView selectedRoute={this.props.selectedRoute} />;

        }
      
    return comp;
  }
}