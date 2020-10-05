let size = 100;
let board;
let turn = "X";
let game = true;
function setup() {
    let canvas = createCanvas(300, 300);
    var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	canvas.position(x, y);
    canvas.mousePressed(play);
	board = new Board();
}
function draw() {
	background(255);
	board.show();
}
function play() {
	if (!game) {
		return;
	}
	let validClick = false;
	for (let i in board.cells) {
		if (
			collidePointRect(
				mouseX,
				mouseY,
				board.cells[i].x + 5, // offset to avoid lines
				board.cells[i].y + 5, // offset to avoid lines
				size - 5, // offset to avoid lines
				size - 5 // offset to avoid lines
			) &&
			!board.cells[i].status
		) {
			board.cells[i].status = turn;
			validClick = true;
		}
	}
	if (!validClick) {
		return;
    }
	let newState = AI(getState(), true, 0, -99999, 99999)[1];
	let index = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			board.cells[index].status = newState[i][j];
			index++;
		}
	}
	let state = getState();
    win = isWin(state);
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    resultP.style('text-align', 'center');
	if (win === "X") {
		resultP.html(`You win!`);
		noLoop();
		game = false;
		return;
	} else if (win === "O") {
		resultP.html(`You lose!`);
		noLoop();
		game = false;
		return;
	} else if (win === "TIE") {
		resultP.html(`Tie!`);
		noLoop();
		game = false;
		return;
	}
}
function isWin(state) {
	if (
		(state[0][2] == "X" && state[1][1] == "X" && state[2][0] == "X") ||
		(state[0][0] == "X" && state[1][1] == "X" && state[2][2] == "X") ||
		(state[0][0] == "X" && state[0][1] == "X" && state[0][2] == "X") ||
		(state[1][0] == "X" && state[1][1] == "X" && state[1][2] == "X") ||
		(state[2][0] == "X" && state[2][1] == "X" && state[2][2] == "X") ||
		(state[0][0] == "X" && state[1][0] == "X" && state[2][0] == "X") ||
		(state[0][1] == "X" && state[1][1] == "X" && state[2][1] == "X") ||
		(state[0][2] == "X" && state[1][2] == "X" && state[2][2] == "X")
	) {
		return "X";
	} else if (
		(state[0][2] == "O" && state[1][1] == "O" && state[2][0] == "O") ||
		(state[0][0] == "O" && state[1][1] == "O" && state[2][2] == "O") ||
		(state[0][0] == "O" && state[0][1] == "O" && state[0][2] == "O") ||
		(state[1][0] == "O" && state[1][1] == "O" && state[1][2] == "O") ||
		(state[2][0] == "O" && state[2][1] == "O" && state[2][2] == "O") ||
		(state[0][0] == "O" && state[1][0] == "O" && state[2][0] == "O") ||
		(state[0][1] == "O" && state[1][1] == "O" && state[2][1] == "O") ||
		(state[0][2] == "O" && state[1][2] == "O" && state[2][2] == "O")
	) {
		return "O";
	}
	if (isBoardFilled(state)) {
		return "TIE";
	}
	return false;
}
function isBoardFilled(state) {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (state[i][j] == null) return false;
		}
	}
	return true;
}
function getState() {
	let state = [];
	let index = 0;
	for (let i = 0; i < 3; i++) {
		let temp = [];
		for (let j = 0; j < 3; j++) {
			temp.push(board.cells[index].status);
			index++;
		}
		state.push(temp);
	}
	return state;
}
