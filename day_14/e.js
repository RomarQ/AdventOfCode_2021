const fs = require("fs");

const exercise = (polymerTemplate, rules, steps = 1) => {
    let occurrences = [...polymerTemplate].reduce((pv, cv) => ({...pv, [cv]: (pv[cv] || 0) + 1}) , {});

    let polymerHashMap = [...polymerTemplate].reduce((pv, cv, idx) => {
        pv[pv.length-1] += cv;
        if (pv[pv.length-1].length === 2 && (idx + 1) < polymerTemplate.length) {
          pv.push(cv);
        }
        return pv;
    }, [""]).reduce((pv, cv) => ({...pv, [cv]: (pv[cv] || 0) + 1}), {});

    for (let i = 0; i < steps; i++) {
        polymerHashMap = Object.keys(polymerHashMap).reduce((pv, pair) => {
            return rules.reduce((pv2, [key, value]) => {
                if (pair === key) {
                    const aux = polymerHashMap[pair];
                    pv2[`${pair[0]}${value}`] = (pv2[`${pair[0]}${value}`] || 0) + aux;
                    pv2[`${value}${pair[1]}`] = (pv2[`${value}${pair[1]}`] || 0) + aux;
                    occurrences[value] = (occurrences[value] || 0) + aux;
                }
                return pv2;
            }, pv);
        }, {});
    }

    occurrences = Object.values(occurrences).sort((a,b) => a - b);
    return occurrences[occurrences.length-1] - occurrences[0];
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [polymerTemplate, pairsUnparsed] = input.trim().split("\n\n");
const rules = pairsUnparsed.split("\n").map(row => row.split(" -> "));

console.log("Exercise 1:", exercise(polymerTemplate, rules, 10));
console.log("Exercise 2:", exercise(polymerTemplate, rules, 40));
