import React from 'react';
// import AppBar from './AppBar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactMapboxGl from './map/mapboxComponent';
import SearchBox from './Search'
import Timer from './Timer'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'; 
import BottomNavigationExampleSimple from './BottomNav';
// import UpperSection from './UpperSection';
// import ProjectPage from './projects/ProjectPage.jsx';
// import AboutSection from './about/AboutSection.jsx';
// import ProjectSection from './projects/ProjectSection.jsx';
// import ContactSection from './contact/ContactSection.jsx';

injectTapEventPlugin();

export default class Main extends React.Component {

    getTurer(context) {
        console.log(context);   
        return fetch('http://localhost:5042/utno/turer/_search')
          .then(function(response) {
            return response.json()
          }).then(function(json) {
            console.log(json);
            context.setState({'turer': json.hits.hits});
            console.log('parsed json', json)
          }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }
    
    constructor(props) {
        super(props);
        this.state = { turer : [] };
        // this.getTurer(this);
    }

    top(data) {
        console.log(data);
    }
    
    renderStd() {
        return (
            <div className="container">
                <h3>Turer</h3>
                <SearchBox />
                <div className="counter">   
                {
                    this.state.turer.map((tur) => 
                    <p key={tur._id}>{tur._source.attribs.navn}</p>
                    )
                }
               </div> 
            </div>
          
        );

    }

    renderMap() {
        return (
            <BottomNavigationExampleSimple/>
        );
    }

    render() {
        return this.renderStd();
        // return this.renderStd();
        // return ( <Timer/>);
    }
}
