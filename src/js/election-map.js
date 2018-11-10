import { feature } from 'topojson-client';
import { select, append } from 'd3-selection';
import { transition } from 'd3-transition';
import { geoPath, geo } from 'd3-geo';
import * as d3 from 'd3'; 

class Map {
	constructor(opts) {
		this.year = opts.year;
		this.data = opts.data;
		this.topo = opts.us;
		this.parent = opts.parent;

		this.projection = d3.geoAlbers()
				.translate([1400/2, 700/2])    
				.scale([1000]);

		this.path = d3.geoPath();          
	}

	init () {
		this.draw();
	}

	draw () {
		this.addMap();
	}

	addMap () {
		this.svg = this.parent.append('svg')
		 				.attr('width', 1400)
		 				.attr('height', 700)
		this.states = feature(this.topo, this.topo.objects.us);

		console.log(this.states.features);

	    this.svg.selectAll("path")
				.data(this.states.features)
				.enter()
					.append("path")
					.attr('class', d => {
						return d.properties.STUSPS
					})
					.attr("d", this.path)
					.attr("transform", "scale(" + 0.0007 + ")")
					.style("stroke", "#fff")
					.style("stroke-width", "1");
	}

}

export { Map }; 