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

int fromBinary(const char *s) {
  return (int) strtol(s, NULL, 2);
}

// - Helpers

char ** clone_inputs(char ** inputs, size_t inputs_count) {
    char ** cloned = malloc(inputs_count * sizeof(*inputs));
    for (int i = 0; i < inputs_count; i++) {
        cloned[i] = malloc(strlen(inputs[i]) * sizeof(char));
        strcpy(cloned[i], inputs[i]);
    }
    return cloned;
}

int count_bit1_occurrences(char ** inputs, int inputs_count, int idx) {
    int occurrences = 0;
    for (int i = 0; i < inputs_count; i++) {
        if (inputs[i][idx] == '1') {
            occurrences++;
        }
    }
    return occurrences;
}

char ** filter(char ** inputs, int * size, int idx, char c) {
    float inputs_size = *size;
    (*size) = 0;
    char ** new_array = malloc(sizeof(* inputs));
    for (int i = 0; i < inputs_size; i++) {
        if (inputs[i][idx] == c) {
            new_array = realloc(new_array, (*size+1) * sizeof(*inputs));
            new_array[*size] = malloc(strlen(inputs[i]) * sizeof(char));
            new_array[*size] = inputs[i];
            (*size)++;
        }
    }
    return new_array;
}

int exercise_1(char ** inputs, size_t inputs_count) {
    char gammaRate[512] = "";
    char epsilonRate[512] = "";

    for (int i = 0; i < strlen(inputs[0]); i++) {
        int bit1_occurrences = count_bit1_occurrences(inputs, inputs_count, i);

        if (bit1_occurrences > inputs_count / 2) {
            gammaRate[strlen(gammaRate)] = '1';
            epsilonRate[strlen(epsilonRate)] = '0';
        } else {
            gammaRate[strlen(gammaRate)] = '0';
            epsilonRate[strlen(epsilonRate)] = '1';
        }
    }

    return fromBinary(gammaRate) * fromBinary(epsilonRate);
}

int exercise_2(char ** inputs, size_t inputs_count) {
    char ** oxygen_generator_rating = clone_inputs(inputs, inputs_count);
    char ** co2_scrubber_rating = clone_inputs(inputs, inputs_count);
    int oxygen_generator_rating_size, co2_scrubber_rating_size = oxygen_generator_rating_size = inputs_count;

    for (int i = 0; i < strlen(inputs[0]); i++) {
        if (oxygen_generator_rating_size > 1) {
            int bit1_occurrences = count_bit1_occurrences(oxygen_generator_rating, oxygen_generator_rating_size, i);
            if (bit1_occurrences < oxygen_generator_rating_size / 2) {
                oxygen_generator_rating = filter(oxygen_generator_rating, &oxygen_generator_rating_size, i, '1');
            } else {
                oxygen_generator_rating = filter(oxygen_generator_rating, &oxygen_generator_rating_size, i, '0');
            }
        }

        if (co2_scrubber_rating_size > 1) {
            int bit1_occurrences = count_bit1_occurrences(co2_scrubber_rating, co2_scrubber_rating_size, i);
            if (bit1_occurrences < (float)co2_scrubber_rating_size / 2) {
                co2_scrubber_rating = filter(co2_scrubber_rating, &co2_scrubber_rating_size, i, '0');
            } else {
                co2_scrubber_rating = filter(co2_scrubber_rating, &co2_scrubber_rating_size, i, '1');
            }
        }
    }

    return fromBinary(oxygen_generator_rating[0]) * fromBinary(co2_scrubber_rating[0]);
}

int main() {
    size_t lines_no = 0;
    char ** inputs = get_inputs(&lines_no);

    printf("Exercise 1: %d\n", exercise_1(inputs, lines_no));
    printf("Exercise 2: %d\n", exercise_2(inputs, lines_no));
}
