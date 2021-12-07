const fs = require("fs");

const input = fs.readFileSync("input.txt", {encoding: "utf-8"});
const inputs = input.trim().split(",").map(Number);

const exercise_1 = (min, max, inputs) => {
    let minCost = null;
    let pos = null;
    for(let i = min; i < max; i++) {
        let sum = 0;
        inputs.forEach((v2) => {
            sum += (i > v2 ? i - v2 : v2 - i)
        });
        if (!minCost || sum < minCost) {
            minCost = sum;
            pos = i;
        }
    }
    return minCost;
}

const exercise_2 = (min, max, inputs) => {
    const fac = (n) => n > 0 ? n + fac(n-1) : 0

    let minCost = null;
    let pos = null;
    for(let i = min; i < max; i++) {
        let sum = 0;
        inputs.forEach((v2) => {
            sum += i > v2 ? fac(i - v2) : fac(v2 - i)
        });
        if (!minCost || sum < minCost) {
            minCost = sum;
            pos = i;
        }
    }

    return minCost;
}

const [min, max] = inputs.reduce(([min, max], cv) => [!min || min > cv ? cv : min, !max || max < cv ? cv : max] , [])

console.log("Exercise 1:", exercise_1(min, max, inputs));
console.log("Exercise 2:", exercise_2(min, max, inputs));
