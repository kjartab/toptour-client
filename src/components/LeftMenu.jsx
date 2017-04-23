
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

// const HomeIcon = (props) => (
//   <SvgIcon {...props}>
//     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//   </SvgIcon>
// );


export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true}; 
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    console.log(e);    
    this.props.setActiveMenu("home");

  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }
  // handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <Drawer width={50} open={this.state.open}>
          <ToptourMenuItem id="home" icon={HomeIcon} onItemClick={this.props.setActiveMenu} />
          <ToptourMenuItem id="layers" icon={LayersIcon} onItemClick={this.props.setActiveMenu}/>
          <ToptourMenuItem id="" icon={HomeIcon} onItemClick={this.props.setActiveMenu} />
        </Drawer>
      </div>
    );
  }
}