

import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class ToptourView extends React.Component {

  constructor(props) {
    super(props); 
  } 
  
  render() {
    return (
      <div>
        <Drawer width={500} open={this.state.open}>
             
        </Drawer>
      </div>
    );
  }
}