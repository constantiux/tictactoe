function AI(state, max, depth, alpha, beta) {
	let win = isWin(state);
	if (win === "X") {
		return [-10, state, depth];
	} else if (win === "O") {
		return [10, state, depth];
	} else if (win === "TIE") {
		return [0, state, depth];
	}
	if (max) {
		let maxState;
		let maxScore = -9999;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (state[i][j] == null) {
					state[i][j] = "O";
					if (beta <= alpha) {
						state[i][j] = null;
						continue;
					}
					let temp = AI(
						state,
						false,
						depth + 1,
						alpha,
						beta
					);
					if (temp[0] - temp[2] > maxScore) {
						maxScore = temp[0] - temp[2];
						alpha = maxScore;
						maxState = JSON.parse(JSON.stringify(state));
					}
					state[i][j] = null;
				}
			}
		}
		return [maxScore, maxState, depth];
	} else {
		let minState;
		let minScore = 9999;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (state[i][j] == null) {
					state[i][j] = "X";
					if (beta <= alpha) {
						state[i][j] = null;
						continue;
					}
					let temp = AI(
						state,
						true,
						depth + 1,
						alpha,
						beta
					);
					if (temp[0] + temp[2] < minScore) {
						minScore = temp[0] + temp[2];
						beta = minScore;
						minState = JSON.parse(JSON.stringify(state));
					}
					state[i][j] = null;
				}
			}
		}
		return [minScore, minState, depth];
	}
}
