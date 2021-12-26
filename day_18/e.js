const fs = require("fs");

const split = (el) => {
    if (typeof el === "number") {
        return el >= 10 ? [Math.floor(el/2), Math.ceil(el/2)] : el;
    }
    const leftSplit = split(el[0]);
    if (JSON.stringify(el[0]) !== JSON.stringify(leftSplit)) {
        return [leftSplit, el[1]];
    }
    const rightSplit = split(el[1]);
    if (JSON.stringify(el[1]) !== JSON.stringify(rightSplit)) {
        return [leftSplit, rightSplit];
    }
    return [leftSplit, rightSplit];
}

const explode = (pair) => {
    let depth = 0;
    let deepestPair = null;
    let startIndex = null;
    let prevDepth = null;
    let p = "";
    [...pair].forEach((char, i) => {
        if (deepestPair) return;

        if (char === "[") {
            depth++;
            p = char;
        } else if (char === "]") {
            p += char;
            if (depth > 4 && prevDepth < depth && p) {
                deepestPair = JSON.parse(p);
                startIndex = i;
                prevDepth = depth;
            } else {
                p = "";
            }
            depth--;
        } else if (!isNaN(Number(char)) || (p && char === ",")) {
            p += char;
        }
    });
    if (deepestPair) {
        const [left, right] = deepestPair;
        let leftPart = pair.slice(0, startIndex-(JSON.stringify(deepestPair).length-1));
        let rightPart = pair.slice(startIndex+1);
        let p2 = "";
        [...leftPart].reverse().forEach((char2, i2) => {
            if (p2 === null) return;

            if (!isNaN(Number(char2))) {
                p2 = char2 + p2;
            } else if (p2 && !isNaN(Number(p2))) {
                const n = String(Number(p2) + left);
                leftPart = `${leftPart.slice(0,leftPart.length-i2)}${n}${leftPart.slice(leftPart.length-i2+p2.length)}`;
                p2 = null;
            }
        });
        p2 = "";
        [...rightPart].forEach((char2, i2) => {
            if (p2 === null) return;

            if (!isNaN(Number(char2))) {
                p2 += char2;
            } else if (p2 && !isNaN(Number(p2))) {
                const n = String(Number(p2) + right);
                rightPart = `${rightPart.slice(0,i2-p2.length)}${n}${rightPart.slice(i2)}`;
                p2 = null;
            }
        });
        pair = `${leftPart}0${rightPart}`;
    }
    return pair;
}

const reduce = (pair) => {
    if (explode(JSON.stringify(pair)) !== JSON.stringify(pair)) {
        return reduce(JSON.parse(explode(JSON.stringify(pair))));
    }
    if (JSON.stringify(split(pair)) !== JSON.stringify(pair)) {
        return reduce(split(pair));
    }
    return pair;
}

const magnitude = (el) => typeof el === "number" ? el : 3 * magnitude(el[0]) + 2 * magnitude(el[1]);

const exercise_1 = (inputs) => magnitude(inputs.reduce((pv, cv) => reduce(pv ? [pv, cv] : cv), null));

const exercise_2 = (inputs) => {
    let magnitudeMax = 0;
    inputs.forEach((snailfish_1, i) => {
        inputs.forEach((snailfish_2, j) => {
            if (i === j) return;

            const m = magnitude(reduce([snailfish_1, snailfish_2]));
            if (m > magnitudeMax) {
                magnitudeMax = m;
            }
        });
    });
    return magnitudeMax;
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = input.trim().split("\n").map(JSON.parse);

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
