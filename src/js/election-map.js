
class Map {
	constructor(opts) {
		this.year = opts.year;
	}

	init () {
		this.draw();
	}

	draw () {
		console.log(this.year);
	}
}

export { Map }; 