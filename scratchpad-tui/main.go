package main

import (
	"errors"
	"fmt"
	"io"
	"os"

	tea "github.com/charmbracelet/bubbletea"
)

func main() {
	if err := run(os.Stdin, os.Stdout); err != nil {
		fmt.Fprintf(os.Stderr, "scratchpad: %v\n", err)
		os.Exit(1)
	}
}

func run(in io.Reader, out io.Writer) error {
	store, err := newSessionStore()
	if err != nil {
		return err
	}

	session, err := store.load()
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return fmt.Errorf("load drafts: %w", err)
	}

	model := newModel(store, session)
	program := tea.NewProgram(model, tea.WithInput(in), tea.WithOutput(out), tea.WithAltScreen())
	_, err = program.Run()
	return err
}
