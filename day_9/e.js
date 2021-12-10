const fs = require("fs");

const isLowestPoint = (inputs, i, j) => {
    return (i < 1 || inputs[i-1][j] > inputs[i][j])
        && (j < 1 || inputs[i][j-1] > inputs[i][j])
        && (i === inputs.length - 1 || inputs[i+1][j] > inputs[i][j])
        && (j === inputs[0].length - 1 || inputs[i][j+1] > inputs[i][j])
}

const exercise_1 = (inputs) => {
    return inputs.reduce((sum, row, i) => row.reduce((acc, value, j) => isLowestPoint(inputs, i, j) ? acc + value + 1 : acc, sum), 0);
}

const exercise_2 = (inputs) => {
    const computeBasin = (set, i, j) => {
        if (set.has(`${i}-${j}`) || inputs[i][j] === 9) {
            return set.size;
        }
        set.add(`${i}-${j}`) ;

        let checkXMin = i > 0;
        let checkYMin = j > 0;
        let checkXMax = i < inputs.length - 1;
        let checkYMax = j < inputs[0].length - 1;

        if(checkXMin && inputs[i-1][j] > inputs[i][j]) {
            computeBasin(set, i-1, j);
        }
        if (checkYMin && inputs[i][j-1] > inputs[i][j]) {
            computeBasin(set, i, j-1);
        }
        if (checkXMax && inputs[i+1][j] > inputs[i][j]) {
            computeBasin(set, i+1, j);
        }
        if (checkYMax && inputs[i][j+1] > inputs[i][j]) {
            computeBasin(set, i, j+1);
        }

        return set.size;
    }
    const maxBasins = inputs.reduce((basins, row, i) => {
        row.forEach((_, j) => {
            if (isLowestPoint(inputs, i , j)) {
                basins.push(computeBasin(new Set(), i, j));
                if (basins.length > 3) {
                    basins = basins.sort((a, b) => a-b).slice(1);
                }
            }
        });
        return basins;
    }, []);
    return maxBasins.reduce((pv, cv) => pv * cv, 1);
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").map(row => [...row].map(Number));

console.log("Exercise 1:", exercise_1(inputs))
console.log("Exercise 2:", exercise_2(inputs))
