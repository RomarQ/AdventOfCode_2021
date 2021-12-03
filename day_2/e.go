package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func exercise_1(inputs []string) int {
	depth, distance := 0, 0

	for _, row := range inputs {
		tokens := strings.Split(row, " ")
		v, err := strconv.Atoi(tokens[1])
		if err != nil {
			panic(err)
		}

		switch tokens[0] {
		case "forward":
			distance += v
		case "down":
			depth += v
		case "up":
			depth -= v
		}
	}

	return depth * distance
}

func exercise_2(inputs []string) int {
	depth, distance, aim := 0, 0, 0

	for _, row := range inputs {
		tokens := strings.Split(row, " ")
		v, err := strconv.Atoi(tokens[1])
		if err != nil {
			panic(err)
		}

		switch tokens[0] {
		case "forward":
			distance += v
			depth += aim * v
		case "down":
			aim += v
		case "up":
			aim -= v
		}
	}

	return depth * distance
}

func main() {
	data, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputs := strings.Split(strings.Trim(string(data), " \n"), "\n")

	fmt.Println("Exercise 1:", exercise_1(inputs))
	fmt.Println("Exercise 2:", exercise_2(inputs))
}
