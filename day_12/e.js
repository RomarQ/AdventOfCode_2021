const fs = require("fs");

const flatten = (paths) => paths
    .filter(p => p.length > 0)
    .reduce((pv, cv) => typeof cv[0] !== "string" ? [...pv, ...cv] : [...pv, cv], []);

const getPaths = (inputs, cave = "start", path = [], allowTwice = false) => {
    if (cave === "end") {
        return [...path, cave]
    }

    const hasTwoSmallCaveOccurrences = cave === cave.toLowerCase() && path.includes(cave);

    return flatten(inputs[cave]
        .filter(c => c !== "start")
        .filter(c => (allowTwice && !hasTwoSmallCaveOccurrences) || !path.includes(c) || c === c.toUpperCase() )
        .map(c => flatten(getPaths(inputs, c, [...path, cave], allowTwice && !hasTwoSmallCaveOccurrences))));
}

const exercise_1 = (inputs) => {
    return getPaths(inputs).length;
}

const exercise_2 = (inputs) => {
    return getPaths(inputs, "start", [], true).length;
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").reduce((pv, cv) => {
    const [source, dest] = cv.split("-");
    return {
        ...pv,
        [dest]: [
            ...(pv[dest] || []),
            source
        ],
        [source]: [
            ...(pv[source] || []),
            dest
        ]
    }
}, {});

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
