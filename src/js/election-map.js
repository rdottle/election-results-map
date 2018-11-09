import { feature } from 'topojson-client';

class Map {
	constructor(opts) {
		this.year = opts.year;
		this.data = opts.data;
		this.topo = opts.us;
		this.parent = opts.parent;
	}

	init () {
		this.draw();
	}

	draw () {
		console.log(this.year);
		console.log(this.data);
	}

	addMap () {
		this.svg = this.parent.append('svg');
		this.states = feature(this.topoUS, this.topoUS.objects.us);
	}
}

export { Map }; 