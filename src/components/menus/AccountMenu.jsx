import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  'marginLeft' : 50,
  'minHeight' : 400,
  'zIndex': 1250,
  paddingLeft: 15
}

export default class AccountMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true, username : "Kjartan Bjørset"}; 
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
        <Drawer containerStyle={style} width={300} open={this.state.open}>
          <h3>{this.state.username}</h3>

          <p></p>
          
          <p>Kontoer</p>

        </Drawer>
      
    );
  }
}