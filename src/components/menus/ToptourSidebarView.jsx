import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  'marginLeft' : 50,
  'minHeight' : 400,
  'zIndex': 1250
}

class TourDescription extends React.Component {

  render() {
    return (<p>{this.props.text}</p>)
  }
}

class TourTitle extends React.Component {
  render() {
    return (<h4>{this.props.title}</h4>);
  }
}

class TourImageSlide extends React.Component {
  render() {
    return (<p>Images</p>)
  }
}

class TourShortInfo extends React.Component {
  render () { return (<p>Tourinfo</p>) }
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
    console.log(this.props);
    return (
        <Drawer containerStyle={style} width={450} open={this.state.open}>
          
          <TourTitle title={this.props.selectedRoute.navn}></TourTitle>
          <TourImageSlide images={this.props.selectedRoute.beskrivelse}></TourImageSlide>
          <TourShortInfo selectedRoute={this.props.selectedRoute}></TourShortInfo>
          <TourDescription text={this.props.selectedRoute.beskrivelse}></TourDescription>


        </Drawer>
      
    );
  }
}