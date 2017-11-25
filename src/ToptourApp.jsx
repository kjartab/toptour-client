import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LeftMenu from './components/menus/LeftMenu.jsx'
import SearchBox from './components/Search.jsx'
import MenuBox from './components/menus/MenuBox.jsx'

export default class ToptourApp extends Component {

    constructor() {
      super();
      this.state = {

        menus : [
          {
            id : "home"
          },
          {
            id : "layers"
          },
          {
            id: "tours"
          },
          {
            id: "tourview"
          }
        ],
        selectedMenu : "home",
        snowActive : false,
        activeSnowLayer: null
      }
      this.setActiveMenu = this.setActiveMenu.bind(this);
      
    }

    setActiveMenu(id) { 
      if (id === "home") {
        this.setState({
          selectedRoute : null
        })
      }
      this.setState({ selectedMenu : id}); 
    }
    
    render() {
        return (
          <div>
            <LeftMenu 
              menus={this.state.menus} 
              selectedMenu={this.state.selectedMenu}
              setActiveMenu={this.setActiveMenu}
            />            
             <Link to='/login'>Login</Link> 
          </div>
        )
      }
}
