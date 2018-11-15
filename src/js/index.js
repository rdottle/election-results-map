'use strict';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { Map } from '../../src/js/election-map.js';

const us = require('../../src/data/us.topo.json');

document.addEventListener("DOMContentLoaded", function(){
	drawMap(2012);
	document.querySelector('label[for="2012"]').classList.add('is-selected');
	document.querySelector('form.inputs').addEventListener('change', function (e) {
		var year = e.target.value;
		document.querySelector('.is-selected').classList.remove('is-selected');
		document.querySelector(`label[for="${year}"]`).classList.add('is-selected');
		var elem = document.querySelector('svg');
		elem.parentNode.removeChild(elem);
		drawMap(year);
	});


// To return form submissions check for valid element and values
const isValidElement = element => {
  return element.name && element.value;
};

const isValidValue = element => {
  return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};
const formToJSON = elements => [].reduce.call(elements, (data, element) => {

  if (isValidElement(element) && isValidValue(element)) {
      data[element.name] = element.value;
  }
  return data;
}, {});

// Output JSON format of submit
const handleFormSubmit = event => {
    event.preventDefault();
    const data = formToJSON(form.elements);
	const dataContainer = document.getElementsByClassName('results')[0];
    dataContainer.textContent = JSON.stringify(data, null, "  ");
};

// Event listener to add results to page
const form = document.getElementsByClassName('submits')[0];
form.addEventListener('submit', handleFormSubmit);

});

// init map
function drawMap (year) {
		var url = `https://raw.githubusercontent.com/TimeMagazine/presidential-election-results/master/data/results_${year}.json`;

		json(url).then(function (data) {
		    const electionMap = new Map({
			    year: year,
			    data: data,
			    us: us,
			    parent: select('.map'),
			    height: 900, 
			    width: 600
			});

    		electionMap.init();
		});
}




