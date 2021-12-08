const fs = require("fs");

const input = fs.readFileSync("input.txt", {encoding: "utf-8"});

const inputs = input.trim().split("\n").map(l => l.split(" | ").map(p => p.split(" ")));

const digitsWithUniqueSegments = {
    1: 2,
    4: 4,
    7: 3,
    8: 7
}
const digitOfSegments = Object.entries(digitsWithUniqueSegments).reduce((pv, [digit, segments]) => ({...pv, [segments]: digit}), {})

const exercise_1 = (inputs) => {
    const occurrences = {};
    inputs.forEach(([_, outs]) => {
        outs.forEach(out => {
            occurrences[out.length] = (occurrences[out.length] || 0) + 1
        });
    });
    return Object.keys(digitsWithUniqueSegments)
        .reduce((pv, digit) => pv + (occurrences[digitsWithUniqueSegments[digit]] || 0), 0);
};

const exercise_2 = (inputs) => {
    let sum = 0;
    inputs.forEach(([ins, outs]) => {
        // Split unique from non unique
        const [unique, not_unique] = ins.reduce(([unique, not_unique], cv) => {
            if (digitOfSegments[cv.length]) {
                unique[digitOfSegments[cv.length]] = cv;
            } else {
                not_unique[cv.length] = [
                    ...(not_unique[cv.length] || []),
                    cv,
                ]
            }
            return [unique, not_unique];
        }, [{},{}]);
        unique[6] = not_unique[6].find(str => Array.from(unique[8]).every(c => str.includes(c) || unique[1].includes(c)));
        const _8_minus_1 = Array.from(unique[8]).filter(c => !unique[1].includes(c));
        unique[3] = not_unique[5].find(str => Array.from(unique[8]).every(c => str.includes(c) || _8_minus_1.includes(c)));
        unique[9] = not_unique[6].find(str => Array.from(str).every(c => unique[4].includes(c) || unique[3].includes(c)));
        const _8_minus_3 = Array.from(unique[8]).filter(c => !unique[3].includes(c));
        unique[5] = not_unique[5].find(str => Array.from(str).every(c => unique[6].includes(c) || _8_minus_3.includes(c)));
        unique[0] = not_unique[6].filter(str => !Object.values(unique).includes(str))[0];
        unique[2] = not_unique[5].filter(str => !Object.values(unique).includes(str))[0];
        let encoding = "";
        outs.forEach(out => {
            Object.entries(unique).forEach(([digit, segments]) => {
                if (segments.length === out.length && Array.from(segments).every(c => out.includes(c))) {
                    encoding += digit;
                }
            });
        });
        console.error(encoding)
        sum += Number(encoding);
    });
    return sum;
};

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
