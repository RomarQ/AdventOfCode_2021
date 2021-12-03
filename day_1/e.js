const fs = require("fs");

const exercise_1 = (inputs) => {
    let counter = 0;
    for (const rowIdx in inputs.slice(1)) {
        if (inputs[Number(rowIdx) + 1] > inputs[rowIdx]) {
            counter++;
        }
    }
    return counter
}

const exercise_2 = (inputs) => {
    const sum3 = (slice) => slice.reduce((acc, i) => acc + i, 0)

    let counter = 0;
    for (let rowIdx in inputs.slice(1)) {
        rowIdx = Number(rowIdx)
        if (rowIdx + 4 <= inputs.length && sum3(inputs.slice(rowIdx + 1, rowIdx + 4)) > sum3(inputs.slice(rowIdx, rowIdx + 3))) {
            counter++;
        }
    }

    return counter;
}

const input = fs.readFileSync("./input.txt", {encoding: "utf-8"});

const inputs = input.trim().split("\n").map(Number);

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
