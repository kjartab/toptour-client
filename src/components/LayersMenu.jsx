import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Slider from 'material-ui/Slider';

const slidercontainerStyle = {
  padding: 15
}

const SliderExampleSimple = () => (
  <div style={slidercontainerStyle}>
    <h1>Snølag</h1>


    <p>Dag</p>
    <Slider />
    


  </div>
);


const style = {
  'marginLeft' : 50,
  'minHeight' : 400,
  'zIndex': 1250
}

export default class FilterToursMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true}; 
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  handleToggle() {
    this.setState({open: !this.state.open});
  }
  // handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <Drawer containerStyle={style} width={300} open={this.state.open}>
          <SliderExampleSimple/>
        </Drawer>
      
    );
  }
}