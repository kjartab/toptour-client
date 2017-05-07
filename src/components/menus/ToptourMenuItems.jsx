import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import LayersIcon from 'material-ui/svg-icons/maps/layers';
import HomeIcon from 'material-ui/svg-icons/maps/layers';

export default class ToptourMenuItem extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onItemClick(this.props.id);
  }

  render() {
    const Icon = this.props.icon
    return (
      <MenuItem style = {{width: 50}} onClick={this.onClick}><Icon/></MenuItem>
    );
  }
}