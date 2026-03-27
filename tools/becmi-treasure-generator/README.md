# BECMI Treasure Table Generator

Static browser-based generator for BECMI treasure tables A-V, including both treasure in lairs (A-O) and treasure carried (P-V).

The tool rolls concrete treasure results from the Rules Cyclopedia treasure tables and expands gems, jewelry, special treasure, and magic items into specific outcomes.

## Features

- Roll any treasure type from `A` to `V`
- Run multiple rolls in one batch
- See a combined summary and a per-roll log
- Export generated treasure as Markdown
- Review embedded verification notes and checklist data

## Running Locally

No build step is required.

1. Open `index.html` in a browser
2. Choose a treasure type
3. Set the number of rolls
4. Click `Roll`

## Project Structure

- `index.html`: UI shell
- `styles.css`: layout and visual styling
- `app.js`: rolling logic, rendering, and Markdown export
- `data.js`: treasure tables, verification notes, and lookup data
- `progress.md`: development notes

## Data Source

The treasure table data is based on the Rules Cyclopedia treasure tables referenced in the project data metadata and verification notes.

## Notes

- The project is plain HTML, CSS, and JavaScript
- There is no package manager or build pipeline in the current repository state
- Browser cache-busting query strings are used for the JS files in `index.html`

## License

This repository is `All rights reserved`.

It is an unofficial, non-commercial fan project and is not affiliated with or
endorsed by Wizards of the Coast.
