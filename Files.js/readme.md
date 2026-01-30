# Advanced File CLI — Pure Node.js

A powerful, demonstration-grade command-line file manager implemented in pure Node.js. It showcases Node's strengths: non-blocking I/O, streams, piping, and native modules (`fs`, `path`, `crypto`, `os`, etc.). Use it to learn and experiment with real-world file operations.

## Features
- Create, read, append, delete files and directories
- Streamed copy with progress indication
- Move/rename files
- Directory listing (optional recursive)
- Find files by RegExp pattern
- In-place text replace
- Streamed hashing (`sha256` default)
- Interactive REPL-style mode for exploration





## Quick Start

Prerequisites: Node.js (LTS recommended)

Run the help summary:

```bash
node advanced-file-cli.js help
```

Run a single command, for example create a file:

```bash
node advanced-file-cli.js create notes/todo.txt --content "Buy milk"
```

Read the file (streamed):

```bash
node advanced-file-cli.js read notes/todo.txt
```

Copy a large file with progress reporting:

```bash
node advanced-file-cli.js copy big.bin backups/big.bin
```

Start interactive mode (type `help` there as well):

```bash
node advanced-file-cli.js
```

## Commands & Options

- `help` — Show help text
- `create <file> --content <text>` — Create a file (will create parent dirs)
- `read <file> [--lines N]` — Stream file content to stdout; optional first N lines
- `append <file> --content <text>` — Append text to a file
- `delete <path>` — Delete a file or directory (directories removed recursively)
- `copy <src> <dest>` — Stream-copy a file (shows percent progress)

- `move <src> <dest>` — Move or rename a file
- `list <dir> [--recursive]` — List directory contents
- `stat <path>` — Show `fs.Stats` info for a path
- `find <dir> --pattern <regex>` — Find files by name pattern
- `replace <file> --from <a> --to <b>` — Replace text 
occurrences (simple string replace)
- `hash <file> [--algo <name>]` — Compute stream hash (default `sha256`)
-`grep <file> it is a new function to grep any word in directory`



## Interactive Mode
Run without arguments to enter a prompt (fm>). Useful for iterative exploration and quick experiments. Type `help` inside the prompt to view available commands.

## Development Notes
- The CLI demonstrates safe asynchronous patterns using `fs.promises` and streams.
- Copying uses `stream.pipeline` (promisified) to ensure backpressure and correctness for large files.
- The simple argument parser supports `--key=value` and `--key value` forms.

## Extending the CLI
- Add options for concurrency, buffered-copy chunk size, or progress bars.
- Replace the ad-hoc argument parser with a package like `yargs` for richer UX.
- Add unit tests using `mocha` or `jest`, and add CI to run smoke tests on Windows/Linux.

## Safety & Warnings
- Commands like `delete` will remove directories recursively — use with care.
- The `replace` command performs a simple global string replace; for complex transforms consider using streams or AST-based processing.

## License
This educational/demo code is intended for learning. Apply an appropriate open-source license (MIT recommended) if you plan to publish.

---
File: `advanced-file-cli.js` — see the script in the repository root for implementation details and examples.



