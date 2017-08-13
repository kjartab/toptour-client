import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ToptourApp extends Component {

    constructor() {
      super();
    }
    
    render() {
        return (
          <div>
            APPs
             <Link to='/login'>Login</Link> 
          </div>
        )
      }
}
