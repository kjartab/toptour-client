import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  'marginLeft' : 50,
  'minHeight' : 400,
  'zIndex': 1250
}

export default class ToptourSidebarView extends React.Component {

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
        <Drawer containerStyle={style} width={450} open={this.state.open}>
          <h4>{this.props.selectedRoute.navn}</h4>
          <p>{this.props.selectedRoute.beskrivelse}</p>
        </Drawer>
      
    );
  }
}