'use strict';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { Map } from '../../src/js/election-map.js';

const us = require('../../src/data/us.topo.json');

document.addEventListener("DOMContentLoaded", function(){
	document.querySelector('form').addEventListener('change', function (e) {
		var elem = document.querySelector('svg');
		elem.parentNode.removeChild(elem);
		var year = e.target.value;
		var url = `https://raw.githubusercontent.com/TimeMagazine/presidential-election-results/master/data/results_${year}.json`;

		json(url).then(function (data) {
		    const electionMap = new Map({
			    year: year,
			    data: data,
			    us: us,
			    parent: select('.map'),
			    height:900, 
			    width: 600
			});

    		electionMap.init();
		});

	});
});

