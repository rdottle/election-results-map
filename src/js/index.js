'use strict';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
// import { geoPath } from 'd3-geo';
import { Map } from '../../src/js/election-map.js';
const us = require('../../src/data/us.topo.json');

var year = '2008';
var url = `https://raw.githubusercontent.com/TimeMagazine/presidential-election-results/master/data/results_${year}.json`;

console.log(us);
const mapContainer = select('.map');
console.log(mapContainer);
json(url).then(function (data) {
    const electionMap = new Map({
	    year: year,
	    data: data,
	    us: us,
	    parent: mapContainer 
    });

    electionMap.init();
});



