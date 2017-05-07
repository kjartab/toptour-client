import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

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

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};


const style = {
  'marginLeft' : 50,
  'minHeight' : 400,
  'zIndex': 1250,
  paddingLeft: 15
}

export default class MapLayerMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      layers: [
        {
          id: "snow",
          name: "Snølag",
          versions: [
            { 
              "datetime" : "",
              "" : "predicted"
            },
            {
              "datetime" : "",
            }
          ]
        },
        {
          id: "satellite",
          name: "Satellite",
          dates: []
        },
        {
          id: "",
          name: "",
          dates: []
        }
      ]
    };
  }


  render() {

    return (

        <Drawer containerStyle={style} width={300} open={this.state.open}>
          <h3>Kart</h3>

          <Checkbox
            id="kk"
            label="Snølag"
            onCheck={this.props.toggleSnow}
            checked={this.props.activeSnow}
            style={styles.checkbox}
          />
          
          <Checkbox
            label="Satellitt"
            style={styles.checkbox}
          />

          <Checkbox
            label="Veikamera"
            style={styles.checkbox}
          />

        </Drawer>
      
    );
  }
}