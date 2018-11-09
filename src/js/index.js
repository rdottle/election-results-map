'use strict';
import { json } from 'd3-fetch';
import { Map } from '../../src/js/election-map.js';


var year = '2008';
var url = `https://raw.githubusercontent.com/TimeMagazine/presidential-election-results/master/data/results_${year}.json`;

console.log('this is working');

json(url).then(function (data) {
    console.log(data);
    const electionMap = new Map({
	    year: year
    });

    electionMap.init();
});



