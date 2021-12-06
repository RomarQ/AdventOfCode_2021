const fs = require("fs");

const input = fs.readFileSync("input.txt", {encoding: "utf-8"});
const fishes = input.trim().split(",").map(Number);

const exercise = (inputs, days) => {
    let population = inputs.reduce((state, next) => {
        state[next] = (state[next] || 0) + 1;
        return state;
    }, Array.from(new Array(9)).map(_ => 0));
    for (let i = 0; i < days; i++) {
        let elders = population[0];
        for (let j = 0; j < population.length; j++) {
            population[j] = population[j+1];
            if (j === 6) {
                population[j] += elders
            }
        }
        population[population.length-1] = elders;
    }
    return population.reduce((acc, next) => acc + next, 0)
}

console.log("Exercise 1:", exercise(fishes, 80))
console.log("Exercise 2:", exercise(fishes, 256))
