const fs = require("fs");

const exercise = (xMin, xMax, yMin, yMax) =>  {
    let maxY;
    let impacts = 0;
    for(let i = 0; i <= Math.abs(xMax); i++) {
        for(let j = -Math.abs(yMin); j <= Math.abs(yMin); j++) {
            let x = 0, y = 0, speedX = i, speedY = j, max;
            while(x <= xMax && y >= yMin) {
                if (!max || y > max) {
                    max = y;
                }
                if (x >= xMin && y <= yMax) {
                    impacts++;
                    if (!maxY || max > maxY) {
                        maxY = max;
                    }
                    break;
                }

                x += speedX;
                if (speedX > 0) {
                    speedX--;
                } else if (speedX < 0) {
                    speedX++;
                }

                y += speedY--;
            }
        }
    }
    return {
        maxY,
        impacts
    };
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [xMin, xMax, yMin, yMax] = input.trim().match(/x=(-?\d+)[.]+(-?\d+),\sy=(-?\d+)[.]+(-?\d+)/).slice(1).map(Number);

console.log("Exercise 1:", exercise(xMin, xMax, yMin, yMax).maxY);
console.log("Exercise 2:", exercise(xMin, xMax, yMin, yMax).impacts);
