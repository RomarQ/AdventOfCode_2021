const fs = require("fs");

const input = fs.readFileSync("input.txt", {encoding:"utf-8"});
const inputs = input.trim().split("\n");
const lines = inputs.map(line => line.split(" -> ").map(coords => coords.split(",").map(Number)));

const computeIntersections = (matrix) => {
    let intersections = 0;
    for (const col of matrix) {
        for (const cell of (col||[])) {
            if (cell > 1) {
                intersections++;
            }
        }
    }
    return intersections;
}

const exercise = (lines, accept_diagonal) => {
    const matrix = [];
    for (const line of lines) {
        let x1 = line[0][0];
        let x2 = line[1][0];
        let y1 = line[0][1];
        let y2 = line[1][1];

        xIncrement = x1 < x2 ? 1 : -1;
        yIncrement = y1 < y2 ? 1 : -1;

        // Only process horizontal, vertical or diagonal lines with exactly 45 degrees
        if (x1 !== x2 && y1 !== y2) {
            if (!accept_diagonal || x1 + y2 !== x2 + y1 && x1 + y1 !== x2 + y2) {
                continue;
            }
        }

        while (true) {
            if (!matrix[x1]) {
                matrix[x1] = [];
            }
            matrix[x1][y1] = (matrix[x1][y1] || 0) + 1;
            if (x1 === x2 && y1 === y2) {
                break;
            }
            x1 = (xIncrement < 0 ? Math.max : Math.min)(x1 + xIncrement, x2)
            y1 = (yIncrement < 0 ? Math.max : Math.min)(y1 + yIncrement, y2)
        }
    }
    return computeIntersections(matrix);
}

console.log("Exercise 1:", exercise(lines, false))
console.log("Exercise 2:", exercise(lines, true))
