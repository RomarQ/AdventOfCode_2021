const fs = require("fs");

const getAdjacent = (xMax, yMax, x, y) => {
    const adjacent = [];
    x > 0 && adjacent.push([x - 1, y]);
    y > 0 && adjacent.push([x, y - 1]);
    x < xMax && adjacent.push([x + 1, y]);
    y < yMax && adjacent.push([x, y + 1]);
    return adjacent;
}

const getKnownShortest = (table) => {
    return Object.values(table).reduce((pv, cell) => {
        return (!pv || (pv.risk != null && cell.risk !== null && cell.risk < pv.risk)) ? cell : pv;
    }, null)
}

const findLowestRiskLevel = (inputs, xMax = inputs.length - 1, yMax = inputs[0].length - 1) => {
    const visited = new Set();
    const table = {
        "0-0": {
            x: 0,
            y: 0,
            distance: 0,
            risk: 0,
        }
    };

    for(
        let next = getKnownShortest(table);
        next !== null;
        next = getKnownShortest(table)
    ) {
        getAdjacent(xMax, yMax, next.x, next.y).forEach(([x, y]) => {
            if (!visited.has(`${x}-${y}`)) {
                const cell = table[`${x}-${y}`] || {
                    x,
                    y,
                    distance: inputs[x][y],
                    risk: null
                };
                if (!cell.risk || (cell.distance + next.risk) < cell.risk) {
                    cell.risk = cell.distance + next.risk;
                }
                table[`${x}-${y}`] = cell;
            }
        });

        // Target Found
        if (xMax === next.x && yMax === next.y)
            return table[`${next.x}-${next.y}`].risk;

        visited.add(`${next.x}-${next.y}`);
        delete table[`${next.x}-${next.y}`];
    }
}

const exercise_1 = findLowestRiskLevel;

const exercise_2 = (inputs) =>  {
    const addOneToCells = (m) => m.map(row => row.map(cell => cell === 9 ? 1 : cell + 1));
    let latestMatrix = inputs;
    for (let i = 0; i < 4; i++) {
        latestMatrix = addOneToCells(latestMatrix);
        inputs = inputs.reduce((pv, row, rowIdx) => {
            pv[rowIdx] = [...row, ...latestMatrix[rowIdx]];
            return pv;
        }, []);
    }
    latestMatrix = inputs;
    for (let i = 0; i < 4; i++) {
        latestMatrix = addOneToCells(latestMatrix);
        inputs = [...inputs, ...latestMatrix];
    }
    return exercise_1(inputs);
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").map(row => [...row].map(Number));

console.log("Exercise 1:", exercise_1(inputs));
// Takes a few seconds
console.log("Exercise 2:", exercise_2(inputs));
