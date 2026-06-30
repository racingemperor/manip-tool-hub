# Manip Tool Hub

An interactive research-engineering hub for embodied-AI and robotics tools.

[Live demo](https://racingemperor.github.io/manip-tool-hub/) | [GitHub profile](https://github.com/racingemperor)

## Positioning

Manip Tool Hub is a public project for browsing, comparing, and documenting
tools used in embodied AI systems. It focuses on the practical layer between
papers and agents: what a tool does, what it takes as input, what it returns,
where the official implementation lives, and what benchmark evidence is
available.

The current version is a static, inspectable tool registry and documentation
interface. The next stage is to add runnable validation examples with input
samples, output artifacts, logs, screenshots, and failure cases.

## What It Does

- Browse a searchable catalog of embodied AI, robot manipulation, perception,
  planning, mapping, and control tools.
- Filter tools by capability category, readiness status, and resource type.
- Open tool detail pages with task summaries, input/output contracts, preset
  examples, parameter notes, benchmark rows, demo media, and official links.
- Compare tools across perception and grounding, cognition/state modeling,
  reasoning/planning, and execution/control.
- Maintain entries through typed data files instead of hand-wiring pages.
- Ship as a static GitHub Pages site for simple public review.

## Why This Project Exists

Embodied agents often need external tools: object detectors, segmenters,
mapping systems, planners, dynamics libraries, navigation stacks, and robot
control modules. For a student or research engineer, the hard part is not only
finding these tools, but checking whether each one has:

- a clear task boundary,
- usable inputs and outputs,
- official code or model links,
- reported benchmark evidence,
- deployment notes,
- and enough documentation to be discussed or reproduced.

Manip Tool Hub turns that information into a structured interface.

## Current Evidence

- Public Next.js application deployed through GitHub Pages.
- Tool catalog, detail pages, dataset pages, leaderboard pages, and exploration
  routes.
- Typed content registry under `data/` for tools, datasets, and benchmark rows.
- Source figures, demos, and media organized under `public/assets/tools/`.
- Real README screenshots under `public/assets/readme/`.
- Static export workflow suitable for GitHub Pages.

## Technical Stack

- Framework: Next.js App Router
- UI: React, Tailwind CSS
- Language: TypeScript
- Deployment: static export, GitHub Pages
- Content model: typed registries in `data/`
- Supporting utilities: shared asset paths, capability labels, search helpers,
  and tool-document generation helpers

## Quick Start

```bash
git clone https://github.com/racingemperor/manip-tool-hub.git
cd manip-tool-hub
npm install
npm run dev
```

Open `http://localhost:3000/tools`.

Build the static site:

```bash
npm run build
```

The export is written to `out/` and can be deployed to GitHub Pages.

## Project Structure

```text
app/
  page.tsx
  datasets/page.tsx
  explore/page.tsx
  leaderboard/page.tsx
  tools/page.tsx
  tools/[slug]/page.tsx
components/
data/
lib/
public/
  assets/
    tools/
    readme/
```

## Adding a Tool

To add a new tool entry:

1. Add the structured entry in `data/tools.ts`.
2. Place images, GIFs, videos, or screenshots under
   `public/assets/tools/<slug>/`.
3. Link official papers, official repositories, model cards, docs, or
   inspectable public resources.
4. Add benchmark rows only when the source paper, official repository, or
   public report provides real numbers.
5. Keep planned validation separate from completed validation.

## Validation Roadmap

The current site documents tools and evidence. The next stage is to make
selected entries runnable and defensible:

- choose one public perception or robotics tool,
- prepare a small input sample,
- run or wrap the official implementation,
- save output JSON/images/logs,
- document environment setup and failure cases,
- add a validation section to the tool detail page.

This keeps the project honest: documentation stays separate from verified
local execution until reproducible artifacts exist.

## Real Screenshots

### Tool Catalog

![Embodied Tools catalog page](public/assets/readme/catalog.png)

The catalog shows searchable filters, capability grouping, readiness flags, and
cards for each tool.

### Tool Detail

![AnyGrasp detail page](public/assets/readme/tool-detail.png)

The detail page shows the tool's hero banner, input/output summary, preset
example, parameters, and source links.
