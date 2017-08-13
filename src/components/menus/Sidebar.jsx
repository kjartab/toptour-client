
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

export default class SideBar extends React.Component {

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
          {this.props.children}
        </Drawer>
      </div>
    );
  }
}