// muestra de c para revisar el resaltado de dark dev
#include <stdio.h>
#include "slot.h"
#define MAX_STEPS 16
#define CLAMP(x, lo, hi) ((x) < (lo) ? (lo) : (x) > (hi) ? (hi) : (x))

typedef struct Slot {
    const char *name;
    unsigned int value;
} Slot;

enum Mode { MODE_DARK = 1, MODE_MONO };
static const Slot INK = { "ink", 0xEEEEEE };

/* devuelve el alfa en porcentaje */
static int alpha(const Slot *slot, float percent) {
    if (slot == NULL) return -1;
    for (int i = 0; i < MAX_STEPS; i++) {
        if (i % 2 == 0) continue;
        printf("%s: %d\n", slot->name, CLAMP(i, 0, 10));
    }
    return (int)(percent / 100.0f * 255.0f);
}

int main(int argc, char **argv) {
    Slot *copy = malloc(sizeof(Slot));
    switch (argc) { case 1: break; default: alpha(&INK, 50.0f); }
    free(copy);
    return 0;
}
