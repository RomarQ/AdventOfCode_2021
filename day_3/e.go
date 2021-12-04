package main

import (
	"os"
	"strconv"
	"strings"
)

func countBit1OccurrencesAtIndex(rows []string, index int) int {
	if len(rows) == 0 {
		return 0
	}
	return (int(rows[0][index]) - '0') + countBit1OccurrencesAtIndex(rows[1:], index)
}

func exercise_1(inputs []string) int64 {
	gammaRate, epsilonRate := "", ""

	for idx := range inputs[0] {
		bit1Counter := countBit1OccurrencesAtIndex(inputs, idx)

		if bit1Counter > len(inputs)/2 {
			gammaRate += "1"
			epsilonRate += "0"
		} else {
			gammaRate += "0"
			epsilonRate += "1"
		}
	}

	gammaRateD, err := strconv.ParseInt(gammaRate, 2, 0)
	if err != nil {
		panic(err)
	}
	epsilonRateD, err := strconv.ParseInt(epsilonRate, 2, 0)
	if err != nil {
		panic(err)
	}
	return gammaRateD * epsilonRateD
}

func exercise_2(inputs []string) int64 {
	oxygenGeneratorRatingValues, CO2ScrubberRatingValues := inputs, inputs

	filter := func(slice []string, index int, char string) []string {
		newSlice := make([]string, 0)
		for _, row := range slice {
			if string(row[index]) == char {
				newSlice = append(newSlice, row)
			}
		}
		return newSlice
	}

	for idx := range inputs[0] {
		if len(oxygenGeneratorRatingValues) > 1 {
			bit1Counter := countBit1OccurrencesAtIndex(oxygenGeneratorRatingValues, idx)
			if float32(bit1Counter) < float32(len(oxygenGeneratorRatingValues))/2. {
				oxygenGeneratorRatingValues = filter(oxygenGeneratorRatingValues, idx, "1")
			} else {
				oxygenGeneratorRatingValues = filter(oxygenGeneratorRatingValues, idx, "0")
			}
		}

		if len(CO2ScrubberRatingValues) > 1 {
			bit1Counter := countBit1OccurrencesAtIndex(CO2ScrubberRatingValues, idx)
			if float32(bit1Counter) < float32(len(CO2ScrubberRatingValues))/2. {
				CO2ScrubberRatingValues = filter(CO2ScrubberRatingValues, idx, "0")
			} else {
				CO2ScrubberRatingValues = filter(CO2ScrubberRatingValues, idx, "1")
			}
		}
	}

	oxygenGeneratorRating, err := strconv.ParseInt(oxygenGeneratorRatingValues[0], 2, 0)
	if err != nil {
		panic(err)
	}
	CO2ScrubberRating, err := strconv.ParseInt(CO2ScrubberRatingValues[0], 2, 0)
	if err != nil {
		panic(err)
	}
	return oxygenGeneratorRating * CO2ScrubberRating
}

func main() {
	data, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	inputs := strings.Split(strings.Trim(string(data), "\n "), "\n")

	println("Exercise 1:", exercise_1(inputs))
	println("Exercise 2:", exercise_2(inputs))
}
