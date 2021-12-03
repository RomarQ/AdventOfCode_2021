#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define INPUT_FILE "input.txt"

// + Helpers

char *trim(char *s) {
    char *ptr;
    if (!s) {
        return NULL;
    }
    if (!*s) {
        return s;
    }
    for (ptr = s + strlen(s) - 1; (ptr >= s) && isspace(*ptr); --ptr);
    ptr[1] = '\0';
    return s;
}

/**
 * This method is not optimized
 */
char ** get_inputs(size_t *lines_no) {
    FILE *fp;

    if ((fp = fopen(INPUT_FILE, "r")) == NULL){
        printf("Error when opening file!");
        exit(1);
    }

    *lines_no = 0;
    char * line = NULL;
    size_t len = 0;

    char **inputs = malloc(sizeof(*inputs));

    while (getline(&line, &len, fp) != -1) {
        inputs = realloc(inputs, (*lines_no + 1) * sizeof(*inputs));
        inputs[*lines_no] = malloc(sizeof(char) * len);
        strcpy(inputs[*lines_no], trim(line));

        (*lines_no)++;
    }

    fclose(fp);

    return inputs;
}

// - Helpers

int * parse_measurements(char **inputs, size_t lines_no) {
    int * values = malloc(lines_no * sizeof(int));

    for (int i = 0; i < lines_no; i++) {
        values[i] = atoi(trim(inputs[i]));
    }

    return values;
}

int exercise_1(int * measurements, size_t measurements_count) {
    int counter = 0;
    for (int i = 1; i < measurements_count; i++) {
        if (measurements[i] > measurements[i-1]) {
            counter++;
        }
    }
    return counter;
}

int exercise_2(int * measurements, size_t measurements_count) {
    int counter = 0;
    for (int i = 0; i < measurements_count; i++) {
        if (i + 3 < measurements_count) {
            int sum0 = measurements[i] + measurements[i+1] + measurements[i+2];
            int sum1 = measurements[i+1] + measurements[i+2] + measurements[i+3];
            if (sum1 > sum0) {
                counter++;
            }
        }
    }
    return counter;
}

int main() {
    size_t lines_no = 0;
    char ** inputs = get_inputs(&lines_no);
    int * measurements = parse_measurements(inputs, lines_no);

    printf("Exercise 1: %d\n", exercise_1(measurements, lines_no));
    printf("Exercise 2: %d\n", exercise_2(measurements, lines_no));
}
