package main

import (
	"os"
	"strconv"
	"strings"
)

func exercise_1(inputs []string) uint {
	stringToUint := func(value string) uint {
		n, err := strconv.Atoi(value)
		if err != nil {
			panic(err)
		}
		return uint(n)
	}
	counter := uint(0)
	for idx := 1; idx < len(inputs); idx++ {
		if stringToUint(inputs[idx]) > stringToUint(inputs[idx-1]) {
			counter++
		}
	}
	return counter
}

func exercise_2(inputs []string) uint {
	sum3 := func(inputs []string) uint {
		sum := uint(0)
		for _, value := range inputs {
			n, err := strconv.Atoi(value)
			if err != nil {
				panic(err)
			}
			sum += uint(n)
		}
		return sum
	}

	counter := uint(0)
	for idx := range inputs {
		if idx+4 <= len(inputs) && sum3(inputs[idx+1:idx+4]) > sum3(inputs[idx:idx+3]) {
			counter++
		}
	}
	return counter
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
