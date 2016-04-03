'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var LeafletMap = require('./components/LeafletMap.jsx');
var Search = require('./components/Search.jsx');
var _ = require('underscore');

require('bootstrap_css');

ReactDOM.render(<LeafletMap />, document.getElementById('map'));

ReactDOM.render(<Search />, document.getElementById('search-container'));