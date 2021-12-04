const fs = require("fs");

const exercise_1 = (inputs) => {
    let gammaRate = "";
    let epsilonRate = "";

    for (let i = 0; i < inputs[0].length; i++) {
        let bit1Counter = inputs.reduce((acc, row) => acc + Number(row[i]), 0);

        if (bit1Counter > inputs.length / 2) {
            gammaRate += "1";
            epsilonRate += "0";
        } else {
            gammaRate += "0";
            epsilonRate += "1";
        }
    }

    return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

const exercise_2 = (inputs) => {
    let oxygenGeneratorRatingValues = [...inputs];
    let CO2ScrubberRatingValues = [...inputs];

    for (let i = 0; i < inputs[0].length; i++) {
        if (oxygenGeneratorRatingValues.length > 1) {
            let bit1Counter = oxygenGeneratorRatingValues.reduce((acc, row) => acc + Number(row[i]), 0);
            if (bit1Counter < oxygenGeneratorRatingValues.length / 2) {
                oxygenGeneratorRatingValues = oxygenGeneratorRatingValues.filter(v => v[i] === "1");
            } else {
                oxygenGeneratorRatingValues = oxygenGeneratorRatingValues.filter(v => v[i] === "0");
            }
        }
        if (CO2ScrubberRatingValues.length > 1) {
            let bit1Counter = CO2ScrubberRatingValues.reduce((acc, row) => acc + Number(row[i]), 0);
            if (bit1Counter < CO2ScrubberRatingValues.length / 2) {
                CO2ScrubberRatingValues = CO2ScrubberRatingValues.filter(v => v[i] === "0");
            } else {
                CO2ScrubberRatingValues = CO2ScrubberRatingValues.filter(v => v[i] === "1");
            }
        }
    }
    return parseInt(oxygenGeneratorRatingValues[0], 2) * parseInt(CO2ScrubberRatingValues[0], 2);
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const inputs = input.trim().split("\n");

console.log("Exercise 1:", exercise_1(inputs));
console.log("Exercise 2:", exercise_2(inputs));
