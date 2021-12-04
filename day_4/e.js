const fs = require("fs");

const isFalsy = v => typeof v !== "number" && !v;
const checkBoardCompletion = (board) => board.reduce((state, row, idx) => (
    state || row.every(isFalsy) || row.every((_, i) => isFalsy(board[i][idx]))
), false);
const sumResult = (board) => board.reduce((acc, row) => acc + row.filter(v => !isFalsy(v)).reduce((a,v) => a + v, 0), 0);

const exercise_1 = (randomNumbers, boards) => {
    let minSteps = randomNumbers.length - 1;
    let latestResult = 0;
    boards.forEach(board => {
        for (const drawnIdx in randomNumbers) {
            board = board.map((row) => row.map(v => v === randomNumbers[drawnIdx] ? null : v));
            if (checkBoardCompletion(board)) {
                if(minSteps > drawnIdx) {
                    minSteps = drawnIdx;
                    latestResult = sumResult(board) * randomNumbers[drawnIdx];
                }
                break;
            }
        }
    });
    return latestResult;
}

const exercise_2 = (randomNumbers, boards) => {
    let maxStep = -1;
    let latestResult = 0;
    boards.forEach(board => {
        for (const drawnIdx in randomNumbers) {
            board = board.map((row) => row.map(v => v === randomNumbers[drawnIdx] ? null : v));
            if (checkBoardCompletion(board)) {
                if(maxStep < drawnIdx) {
                    maxStep = drawnIdx;
                    latestResult = sumResult(board) * randomNumbers[drawnIdx];
                }
                break;
            }
        }
    });
    return latestResult;
}

const input = fs.readFileSync("input.txt", {encoding: "utf-8"});
const inputs = input.trim().split("\n");
const randomNumbers = inputs[0].split(",").map(Number);
const boards = inputs.slice(1).reduce((acc, next) => {
    if (next === "") {
        // A new board
        return [
            ...acc,
            []
        ];
    }
    // Update current board
    acc[acc.length - 1].push(
        next.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(Number)
    );
    return acc;
}, []);

console.log("Exercise 1:", exercise_1(randomNumbers, boards));
console.log("Exercise 2:", exercise_2(randomNumbers, boards));
