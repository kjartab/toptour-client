
import ToptourMenuItem from './ToptourMenuItems.jsx';
import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {blue500, red500, greenA200,yellow500} from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';

const itemStyle = {
    width:50
}

const drawerStyle = {
    width: 50
}

const iconStyles = {
    marginLeft: "auto",
    marginRight: "auto"
};

import HomeIcon from 'material-ui/svg-icons/action/home';
import LayersIcon from 'material-ui/svg-icons/maps/layers';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true}; 
    this.handleToggle = this.handleToggle.bind(this); 
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }


  render() {
    return (
      <div>
        <Drawer width={50} open={this.state.open}>

          <ToptourMenuItem id="home" icon={HomeIcon} onItemClick={this.props.setActiveMenu} />
          <ToptourMenuItem id="layers" icon={LayersIcon} onItemClick={this.props.setActiveMenu} />
          <ToptourMenuItem id="toptourfilter" icon={FilterIcon} onItemClick={this.props.setActiveMenu} />   
          <ToptourMenuItem id="account" icon={AccountIcon} onItemClick={this.props.setActiveMenu} />
          

        </Drawer>
      </div>
    );
  }
}