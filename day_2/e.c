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

char ** split_string(char * str) {
    char ** tokens = malloc(sizeof(*tokens));
    int init_size = strlen(str);
	char delim[] = " ";

	char *ptr = strtok(str, delim);

    size_t counter = 0;
	while (ptr != NULL) {
        tokens = realloc(tokens, (counter + 1) * sizeof(*tokens));
        tokens[counter] = ptr;
		ptr = strtok(NULL, delim);
        counter++;
	}

	return tokens;
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

typedef struct {
    char * kind;
    int value;
} movement;

movement * parse_movements(char **inputs, size_t lines_no) {
    movement * movements = malloc(lines_no * sizeof(movement));

    for (int i = 0; i < lines_no; i++) {
        char ** tokens = split_string(inputs[i]);
        movements[i].kind = tokens[0];
        movements[i].value = atoi(tokens[1]);
    }

    return movements;
}

int exercise_1(movement * movements, size_t movements_count) {
    int depth = 0;
    int distance = 0;
    for (int i = 0; i < movements_count; i++) {
        if (strcmp(movements[i].kind, "forward") == 0) {
            distance += movements[i].value;
        } else if (strcmp(movements[i].kind, "up") == 0) {
            depth -= movements[i].value;
        } else if (strcmp(movements[i].kind, "down") == 0) {
            depth += movements[i].value;
        }
    }
    return depth * distance;
}

int exercise_2(movement * movements, size_t movements_count) {
    int depth = 0;
    int distance = 0;
    int aim = 0;
    for (int i = 0; i < movements_count; i++) {
        if (strcmp(movements[i].kind, "forward") == 0) {
            distance += movements[i].value;
            depth += aim * movements[i].value;
        } else if (strcmp(movements[i].kind, "up") == 0) {
            aim -= movements[i].value;
        } else if (strcmp(movements[i].kind, "down") == 0) {
            aim += movements[i].value;
        }
    }
    return depth * distance;
}

int main() {
    size_t lines_no = 0;
    char ** inputs = get_inputs(&lines_no);
    movement * movements = parse_movements(inputs, lines_no);

    printf("Exercise 1: %d\n", exercise_1(movements, lines_no));
    printf("Exercise 2: %d\n", exercise_2(movements, lines_no));
}
