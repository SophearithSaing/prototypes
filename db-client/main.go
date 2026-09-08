package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"os"
	"time"

	tea "github.com/charmbracelet/bubbletea"
)

type options struct {
	configPath string
	maxRows    int
	timeout    time.Duration
}

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, "db-client:", err)
		os.Exit(1)
	}
}

func run(args []string) error {
	var opts options
	flags := flag.NewFlagSet("db-client", flag.ContinueOnError)
	flags.StringVar(&opts.configPath, "config", "", "connection profile file (default: OS config directory/db-client/connections.json)")
	flags.IntVar(&opts.maxRows, "max-rows", 1000, "maximum displayed rows across a SQL batch")
	flags.DurationVar(&opts.timeout, "timeout", 30*time.Second, "query timeout, for example 30s or 2m")
	if err := flags.Parse(args); err != nil {
		if errors.Is(err, flag.ErrHelp) {
			return nil
		}
		return err
	}
	if flags.NArg() != 0 {
		return errors.New("unexpected arguments; use --help for usage")
	}
	if opts.maxRows < 1 || opts.timeout <= 0 {
		return errors.New("--max-rows and --timeout must be greater than zero")
	}
	if opts.configPath == "" {
		var err error
		opts.configPath, err = defaultConfigPath()
		if err != nil {
			return err
		}
	}
	cfg, err := loadConfig(opts.configPath)
	if err != nil {
		return err
	}
	if p, present, err := environmentProfile(); err != nil {
		return err
	} else if present {
		// Keep the environment connection separate from any similarly named profile.
		for i := 0; i < len(cfg.Connections); i++ {
			if cfg.Connections[i].Name == p.Name {
				p.Name += " (env)"
				i = -1
			}
		}
		cfg.Connections = append([]profile{p}, cfg.Connections...)
	}

	ctx, cancel := context.WithCancel(context.Background())
	db := &database{}
	defer func() {
		// Cancel background work before waiting for the pgx connection lock.
		cancel()
		db.close()
	}()
	_, err = tea.NewProgram(newModel(ctx, db, cfg, opts), tea.WithAltScreen(), tea.WithContext(ctx)).Run()
	return err
}
