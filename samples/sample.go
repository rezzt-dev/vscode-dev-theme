// muestra de go para revisar el resaltado de dark dev
package main

import (
	"fmt"
	"strings"
)

const MaxSteps = 16

type Slot struct {
	Name  string `json:"name"`
	Value uint32
}

type Ramp interface {
	At(index int) (int, error)
}

func (s *Slot) Alpha(percent float64) string {
	return fmt.Sprintf("#%06X%02X", s.Value, int(percent/100*255))
}

func worker[T any](in <-chan T, out chan<- T) {
	defer close(out)
	for v := range in {
		select {
		case out <- v:
		default:
		}
	}
}

func main() {
	ink := &Slot{Name: "ink", Value: 0xEEEEEE}
	steps := map[string]int{"a": 1, "b": 2}
	go func() { fmt.Println(strings.ToUpper(ink.Name), steps) }()
	if v, ok := steps["a"]; ok && v != 0 {
		fmt.Println(v)
	}
}
