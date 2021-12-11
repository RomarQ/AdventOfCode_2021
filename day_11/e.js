const fs = require("fs");

const update_adjacent = (inputs, i, j) => {
    const xMin = i > 0 ? i - 1 : i;
    const yMin = j > 0 ? j - 1 : j;
    const xMax = i < inputs.length - 1 ? i + 1 : inputs.length - 1;
    const yMax = j < inputs[0].length - 1 ? j + 1 : inputs[0].length - 1;

    for (let i2 = xMin; i2 <= xMax; i2++) {
        for (let j2 = yMin; j2 <= yMax; j2++) {
            // Skip current position
            if (!(i === i2 && j === j2)) {
                if (++inputs[i2][j2] === 10) {
                    update_adjacent(inputs, i2, j2);
                }
            }
        }
    }
}

const exercise_1 = (inputs, steps) => {
    let flashes = 0;
    for (let i = 0; i < steps; i++) {
        inputs.forEach((row, rowIdx) => row.forEach((_, colIdx) => {
            if (++inputs[rowIdx][colIdx] === 10) {
                update_adjacent(inputs, rowIdx, colIdx);
            }
        }));
        inputs.forEach((row, rowIdx) => row.forEach((value, colIdx) => {
            if (value > 9) {
                flashes++;
                inputs[rowIdx][colIdx] = 0;
            }
        }));
    }
    return flashes;
}

const exercise_2 = (inputs) => {
    let flashes = 0;
    let step = 0;
    while(flashes !== 100) {
        flashes = 0;
        step++;
        inputs.forEach((row, rowIdx) => row.forEach((_, colIdx) => {
            if (++inputs[rowIdx][colIdx] === 10) {
                update_adjacent(inputs, rowIdx, colIdx);
            }
        }));
        inputs.forEach((row, rowIdx) => row.forEach((value, colIdx) => {
            if (value > 9) {
                flashes++;
                inputs[rowIdx][colIdx] = 0;
            }
        }));
    }
    return step;
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").map(row => [...row].map(Number));

const clone = arr => JSON.parse(JSON.stringify(arr))

console.log("Exercise 1:", exercise_1(clone(inputs), 100));
console.log("Exercise 2:", exercise_2(clone(inputs)));
