// import React, {Component} from 'react';
// import {render} from 'react-dom';
// import MapGL from 'react-map-gl';

// const token = 'pk.eyJ1Ijoia2phcnRhYiIsImEiOiJjajFhaDJjeWYwMDM2MzNuNW9qaHY1Y2ljIn0.GXGL6PYl_oEw4kRmQw5uCQ';

// if (!token) {
//   throw new Error('Please specify a valid mapbox token');
// }

// class Root extends Component {
// 	state = {
// 	    viewport: {
// 	      latitude: 37.785164,
// 	      longitude: -122.41669,
// 	      zoom: 16.140440,
// 	      bearing: -20.55991,
// 	      pitch: 60,
// 	    },
// 	    width: 500,
// 	    height: 500,
// 	  }


//   render() {

//     const {viewport, width, height} = this.state;

//     return (
//       <MapGL
//         {...viewport}
//         mapStyle="mapbox://styles/mapbox/dark-v9"
//         onChangeViewport={v => this.setState({viewport: v})}
//         preventStyleDiffing={false}
//         mapboxApiAccessToken={token}
//         perspectiveEnabled
//         width={width}
//         height={height}>
//       </MapGL>
//     );
//   }

// }


// export default ReactMapboxGl;
