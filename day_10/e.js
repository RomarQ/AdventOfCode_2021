const fs = require("fs");

const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
};
const reversedPair = Object.entries(pairs).reduce((pv, [key, value]) => ({ ...pv, [value]: key }), {});

const exercise_1 = (inputs) => {
    const points = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137
    };
    let score = 0;
    inputs.forEach(line => {
        let stack = [];
        for (const char of line) {
            if (Object.keys(pairs).includes(char)) {
                stack.push(char)
            } else if (reversedPair[char] === stack[stack.length-1]) {
                stack.pop();
            } else {
                score += points[char]
                break;
            }
        }
    });
    return score;
}

const exercise_2 = (inputs) => {
    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    };
    let scores = [];
    inputs.forEach(line => {
        let stack = [];
        let corrupted = false;
        for (const char of line) {
            if (Object.keys(pairs).includes(char)) {
                stack.push(char)
            } else if (reversedPair[char] === stack[stack.length-1]) {
                stack.pop();
            } else {
                corrupted = true;
                break;
            }
        }
        if (!corrupted) {
            scores.push(stack.reverse().reduce((pv, cv) => (pv*5) + (points[pairs[cv]]), 0));
        }
    });
    return scores.sort((a,b) => a - b)[Math.floor(scores.length/2)];
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").map(row => [...row]);

console.log("Exercise 1:", exercise_1(inputs))
console.log("Exercise 2:", exercise_2(inputs))
