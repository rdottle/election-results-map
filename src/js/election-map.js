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
		this.width = opts.width;
		this.height = opts.width;
		this.states = feature(this.topo, this.topo.objects.us); 
		this.div = document.getElementById('map');
		this.parentHeight = this.div.clientHeight;
		this.parentWidth = this.div.clientWidth;
	}

    init () {
        this.draw();
	}

	draw () {
		this.addMap();
	}

	addMap () {

		const bounds = d3.geoPath().projection(this._geoScale(1)).bounds(this.states);
    	const scale = Math.min(this.width / (bounds[1][0] - bounds[0][0]), this.height / (bounds[1][1] - bounds[0][1]));
    	const tf = [(this.width - scale * (bounds[1][0] + bounds[0][0])) / 2, (this.height - scale * (bounds[1][1] + bounds[0][1])) / 2];

		this.path = d3.geoPath().projection(this._geoScale(scale));    
		this.svg = this.parent.append('svg')
		 				.attr('width', this.width)
		 				.attr('height', this.height);

		this.g = this.svg.append('g');
		this.tooltip = this.parent.append("div")
				.attr("class", "tooltip")
				.style("opacity", 0);

	    this.g.selectAll("path")
				.data(this.states.features)
				.enter()
					.append("path")
					.attr('class', d => {
						return this.getWinningParty(`${this.year}_${d.properties.STUSPS}`);
					})
					.attr("d", this.path)
                    .attr('transform', `translate(${tf[0]},${tf[1]})`)
					.style("stroke", "#fff")
					.style("stroke-width", "1")
					.on("mouseover", (d) => {
						let state = d.properties.STUSPS;
						let candidate = this.getCandidate(`${this.year}_${d.properties.STUSPS}`);
						let votes = this.getVotes(`${this.year}_${d.properties.STUSPS}`);
            			this.tooltip.transition()	
                			.duration(200)
                			.style("opacity", .9);		
                		this.tooltip.html(d => {
                			return `${state} ${candidate} ${votes.toLocaleString()}`;
                		})	
	                .style("top", (d3.event.layerY + 15) + "px")
	                .style("left", (d3.event.layerX + 15) + "px");
            			})					
					.on("mouseout", (d) => {		
            			this.tooltip.transition()		
                			.duration(500)		
                		.style("opacity", 0);	
        });
	}

	_geoScale (scaleFactor) {
	    return d3.geoTransform({
	      point: function (x, y) {
	        this.stream.point(x * scaleFactor, y * scaleFactor *-1);
	      }
   		});
    }

    getWinningParty (state) {
    	let state_obj = this.data[state];
    	let max = 0;
    	let winning_party;
    	Object.keys(state_obj).forEach(function(key) {
    		if (max < state_obj[key].votes) {
    			max = state_obj[key].votes;
    			winning_party = state_obj[key].parties[0];
    			return winning_party;
    		}
    		else {
    			return winning_party;
    		}
    	});
    	return winning_party;
    }

    getCandidate (state) {
    	let state_obj = this.data[state];    	
    	let max = 0;
    	let candidate;
    	Object.keys(state_obj).forEach(function(key) {
    		if (max < state_obj[key].votes) {
    			max = state_obj[key].votes;
    			candidate = state_obj[key];
    			return candidate;
    		}
    		else {
    			return candidate;
    		}
    	});
    	return candidate.name;
    }

    getVotes (state) {
    	let state_obj = this.data[state];    	
    	let max = 0;
    	Object.keys(state_obj).forEach(function(key) {
    		if (max < state_obj[key].votes) {
    			max = state_obj[key].votes;
    			return max;
    		}
    		else {
    			return max;
    		}
    	});
    	return max;
    }
}

export { Map }; 