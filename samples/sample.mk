# muestra de makefile para revisar el resaltado de dark dev
CC := gcc
CFLAGS ?= -Wall -O2
SRC = $(wildcard src/*.c)
OBJ = $(SRC:.c=.o)

.PHONY: all clean

all: app

app: $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	@echo "compilando $<"
	$(CC) -c $< -o $@

clean:
ifeq ($(OS),Windows_NT)
	del /q $(OBJ)
else
	rm -f $(OBJ) app
endif
