// window.CESIUM_BASE_URL = './';
// require('./lib/CesiumUnminified/Cesium.js');
// require('./lib/Cesium/Widgets/widgets.css');
require('underscore')
require('./node_modules/cesium/Build/Cesium/Cesium.js')
var Cesium = window.Cesium;
// require("./test.js");
console.log("ok");
console.log("K")
var viewer = new Cesium.Viewer('cesiumContainer');
