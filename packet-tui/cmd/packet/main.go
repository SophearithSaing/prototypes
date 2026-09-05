package main

import (
	"fmt"
	"os"

	tea "charm.land/bubbletea/v2"

	"packet/internal/packet"
	"packet/internal/tui"
)

func main() {
	var collections []packet.Collection
	for _, path := range os.Args[1:] {
		collection, err := packet.ImportPostmanFile(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "packet: %v\n", err)
			continue
		}
		collections = append(collections, collection)
	}

	program := tea.NewProgram(tui.New(collections, packet.NewClient()))
	if _, err := program.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "packet: %v\n", err)
		os.Exit(1)
	}
}
