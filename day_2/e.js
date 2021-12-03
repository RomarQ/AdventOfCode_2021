const fs = require("fs");

const exercise_1 = (inputs) => {
    let depth = 0;
    let distance = 0;
    for (const row of inputs) {
        const matches = row.match(/(\w+) (\d+)/);
        switch(matches[1]) {
            case "forward":
                distance += Number(matches[2]);
                break;
            case "up":
                depth -= Number(matches[2]);
                break;
            case "down":
                depth += Number(matches[2]);
                break;
            default:
                console.error("ERROR")
        }
    }
    return depth * distance;
}

const exercise_2 = (inputs) => {
    depth = 0;
    distance = 0;
    let aim = 0;
    for (const row of inputs) {
        const matches = row.match(/(\w+) (\d+)/);
        switch(matches[1]) {
            case "forward":
                distance += Number(matches[2]);
                depth += aim * Number(matches[2]);
                break;
            case "up":
                aim -= Number(matches[2]);
                break;
            case "down":
                aim += Number(matches[2]);
                break;
            default:
                console.error("ERROR")
        }
    }
    return depth * distance;
}


const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const inputs = input.trim().split("\n");

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
