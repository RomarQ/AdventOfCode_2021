const fs = require("fs");

const getPackage = (inputs) =>  {
    const version = inputs.splice(0, 3).join("");
    const typeID = inputs.splice(0, 3).join("");
    let package = {
        version: parseInt(version, 2),
        typeID: parseInt(typeID, 2),
        length: inputs.length + 6,
        subPackages: []
    }
    if (parseInt(typeID, 2) === 4) {
        // It is a literal
        let sequence = "";
        while (inputs.length > 4) {
            const headBit = inputs.shift();
            sequence += inputs.splice(0, 4).join("");
            if (headBit === "0") {
                break;
            }
        }
        package.literal = parseInt(sequence, 2);
    } else {
        const lengthTypeID = inputs.splice(0, 1).join("");
        let totalPackages = 0, res = 0;
        if (lengthTypeID === "0") {
            const length = parseInt(inputs.splice(0, 15).join(""), 2);
            let bitsUsed = 0;
            while (bitsUsed !== length) {
                const subPackage = getPackage(inputs);
                bitsUsed += subPackage.length;
                package.subPackages = [...package.subPackages, subPackage];
            }
        } else {
            totalPackages = parseInt(inputs.splice(0, 11).join(""), 2);
            for (let i = 0; i < totalPackages; i++) {
                package.subPackages = [...package.subPackages, getPackage(inputs)];
            }
        }
    }

    return {
        ...package,
        length: package.length - inputs.length
    }
}

const exercise_1 = (inputs) =>  {
    const sum = (pkg = getPackage(inputs)) => {
        return pkg.subPackages.reduce((acc, subPkg) => acc + sum(subPkg), pkg.version);
    }
    return sum();
}

const exercise_2 = (inputs) =>  {
    const package = getPackage(inputs);
    const calc = (package) => {
        switch (package.typeID) {
            case 0:
                return package.subPackages.reduce((acc, package) => acc + calc(package), 0);
            case 1:
                return package.subPackages.reduce((acc, package) => acc * calc(package), 1);
            case 2:
                return package.subPackages.reduce((min, package) => {
                    const res = calc(package);
                    if (!min || min > res)
                        return res;
                    return min;
                }, null);
            case 3:
                return package.subPackages.reduce((max, package) => {
                    const res = calc(package);
                    if (!max || max < res)
                        return res;
                    return max;
                }, null);
            case 4:
                return package.literal;
            case 5: {
                const [pkg1, pkg2] = package.subPackages;
                return calc(pkg1) > calc(pkg2) ? 1 : 0;
            }
            case 6: {
                const [pkg1, pkg2] = package.subPackages;
                return calc(pkg1) < calc(pkg2) ? 1 : 0;
            }
            case 7: {
                const [pkg1, pkg2] = package.subPackages;
                return calc(pkg1) === calc(pkg2) ? 1 : 0;
            }
        }
    }
    return calc(package);
}

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });
const inputs = [...input.trim()].map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join("");

console.log("Exercise 1:", exercise_1([...inputs]));
console.log("Exercise 2:", exercise_2([...inputs]));
