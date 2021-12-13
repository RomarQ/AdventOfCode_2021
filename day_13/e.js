const fs = require("fs");

const fold = (paper, folds) => {
    return folds.reduce((pv, [axis, value]) => {
        switch (axis) {
            case "x":
                pv = pv.map((row, yIdx) => {
                    row ||= [];
                    return row.reduce((nRow, _, xIdx) => {
                        if (xIdx > value) {
                            const foldIndex = value - (xIdx - value);
                            if (foldIndex >= 0) {
                                nRow[foldIndex] ||= pv[yIdx][xIdx];
                            }
                        }
                        return nRow;
                    }, row.slice(0, value));
                });
                break;
            case "y":
                pv = pv.reduce((matrix, row, yIdx) => {
                    if (yIdx < value) {
                        matrix.push(row);
                    } else {
                        row.forEach((_, xIdx) => {
                            const foldIndex = value - (yIdx - value);
                            if (foldIndex >= 0) {
                                matrix[foldIndex][xIdx] ||= pv[yIdx][xIdx];
                            }
                        });
                    }
                    return matrix;
                }, []);
        }
        return pv;
    }, paper)
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [coordSection, foldsSection] = input.trim().split("\n\n");
const paper = coordSection.split("\n").map(row => row.split(",").map(Number)).reduce((pv, [x, y]) => {
    pv[y] = pv[y] || [];
    pv[y][x] = "#"
    return pv;
}, []);
const folds = foldsSection.split("\n").map(row => {
    const match = row.match(/.*(y|x)=(\d+)/);
    return [match[1], Number(match[2])]
});

const clone = (v) => JSON.parse(JSON.stringify(v));

console.log("Exercise 1:", fold(clone(paper), folds.slice(0, 1)).reduce((acc, row) => acc + row.reduce((acc2, v) => acc2 + (v === "#" ? 1 : 0), 0), 0));
console.log("Exercise 2:");
console.log(fold(clone(paper), folds).map(row => row.map(c => c || " ").join(" ")).join("\n"));
