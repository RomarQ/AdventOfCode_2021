package main

import (
	"os"
	"regexp"
	"strconv"
	"strings"
)

func convertToInt(value string) int {
	n, err := strconv.Atoi(value)
	if err != nil {
		panic(err)
	}
	return n
}

func convertStringsToInts(values []string) []int {
	intValues := make([]int, len(values))
	for i, v := range values {
		intValues[i] = convertToInt(v)
	}
	return intValues
}

func makeBoardsNullable(boards [][][]int) [][][]*int {
	newBoards := make([][][]*int, len(boards))
	for boardIdx, board := range boards {
		newBoards[boardIdx] = make([][]*int, len(board))
		for rowIdx, row := range board {
			newBoards[boardIdx][rowIdx] = make([]*int, len(row))
			for colIdx, v := range row {
				newBoards[boardIdx][rowIdx][colIdx] = new(int)
				*newBoards[boardIdx][rowIdx][colIdx] = v
			}
		}
	}
	return newBoards
}

func sumResult(board [][]*int) int {
	sum := 0
	for _, row := range board {
		for _, v := range row {
			if v != nil {
				sum += *v
			}
		}
	}
	return sum
}

func checkBoardCompletion(board [][]*int) bool {
	for rowIdx, row := range board {
		completedHorizontaly, completedVertically := true, true
		for colIdx, v := range row {
			if v != nil {
				completedHorizontaly = false
			}
			if board[colIdx][rowIdx] != nil {
				completedVertically = false
			}
		}
		if completedHorizontaly || completedVertically {
			return true
		}
	}
	return false
}

func exercise_1(randomNumbers []int, boards [][][]int) int {
	clonedBoards := makeBoardsNullable(boards)
	minSteps := len(randomNumbers) - 1
	latestResult := 0
	for _, board := range clonedBoards {
		for drawnIdx, drawn := range randomNumbers {
			for _, row := range board {
				for j, v := range row {
					if v != nil && *v == drawn {
						row[j] = nil
					}
				}
			}
			if checkBoardCompletion(board) {
				if minSteps > drawnIdx {
					minSteps = drawnIdx
					latestResult = sumResult(board) * drawn
				}
				break
			}
		}
	}
	return latestResult
}

func exercise_2(randomNumbers []int, boards [][][]int) int {
	clonedBoards := makeBoardsNullable(boards)
	maxStep := -1
	latestResult := 0
	for _, board := range clonedBoards {
		for drawnIdx, drawn := range randomNumbers {
			for _, row := range board {
				for j, v := range row {
					if v != nil && *v == drawn {
						row[j] = nil
					}
				}
			}
			if checkBoardCompletion(board) {
				if maxStep < drawnIdx {
					maxStep = drawnIdx
					latestResult = sumResult(board) * drawn
				}
				break
			}
		}
	}
	return latestResult
}

func main() {
	data, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	inputs := strings.Split(strings.Trim(string(data), "\n "), "\n")
	randomNumbers := convertStringsToInts(strings.Split(inputs[0], ","))
	getBoards := func(inputs []string) [][][]int {
		re := regexp.MustCompile("[\\s]+")
		boards := make([][][]int, 0)
		for _, input := range inputs {
			if input == "" {
				// A new board
				boards = append(boards, make([][]int, 0))
			} else {
				// Update current board
				boards[len(boards)-1] = append(boards[len(boards)-1], convertStringsToInts(re.Split(strings.Trim(input, " "), -1)))
			}
		}
		return boards
	}
	boards := getBoards(inputs[1:])

	println("Exercise 1:", exercise_1(randomNumbers, boards))
	println("Exercise 2:", exercise_2(randomNumbers, boards))
}
