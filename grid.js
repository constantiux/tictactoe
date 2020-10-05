class Cell {
	constructor(i, j) {
		this.r = i;
		this.c = j;
		this.x = j * size;
		this.y = i * size;
		this.status = null; //possible values are X or O
	}
	show() {
		stroke(0);
		noFill();
		rect(this.x, this.y, size, size);
		textSize(110);
		fill(0);
		textAlign(CENTER, CENTER);
		if (this.status)
			text(this.status, this.x + size / 2, this.y + size / 2);
	}
}

class Board {
	constructor() {
		this.cells = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.cells.push(new Cell(i, j));
			}
		}
	}
	show() {
		for (let i in this.cells) this.cells[i].show();
	}
}
