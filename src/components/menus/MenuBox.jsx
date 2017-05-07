import React, { Component } from 'react';
import FilterToursMenu from './FilterToursMenu.jsx'
import MapLayerMenu from './LayersMenu.jsx'
import AccountMenu from './AccountMenu.jsx'

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
  // handleToggle = () => this.setState({open: !this.state.open});

  render() {
    var comp = null;
        console.log(this.props.selectedMenu);
        switch(this.props.selectedMenu) {

            case 'layers':
                comp = <MapLayerMenu 
                  toggleSnow={this.props.toggleSnow}
                  activeSnow={this.props.activeSnow}
                  />;
                break;
            
            case 'toptourfilter':
                comp = <FilterToursMenu />;
                break;

            case 'account':
                comp = <AccountMenu />;
                break;
        }
      
    return comp;
  }
}