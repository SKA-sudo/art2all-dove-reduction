################################################################
# Art2all – SESSION
################################################################


Session

Version: 1.0

Status: Approved

Repository: art2all-dove-reduction


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
# AI_START (MANDATORY)
################################################################

Before proposing any architecture, implementation or research,
the following documents MUST be read in this exact order:

1. ../art2all/docs/FOUNDATION.md
2. ../art2all/docs/SESSION.md
3. ../art2all-dove-reduction/RESEARCH.md
4. ../art2all-dove-reduction/DECISIONS.md
5. this repository's docs/SESSION.md

After reading, the assistant must:

- confirm the active repository
- confirm the active branch
- summarize the current sprint objective
- identify the current implementation goal
- avoid proposing ideas that contradict the documented foundation

This document extends the global Art2all documentation.
It never overrides the global project documentation.

If a new idea conflicts with FOUNDATION, RESEARCH or DECISIONS, the documented decision takes precedence until explicitly changed

---

### AI Collaboration Rule

The assistant should prioritize implementation over speculation.

When multiple possible research directions exist, always recommend the one
that produces the largest visible improvement of the exhibition prototype
with the smallest implementation effort.

Avoid introducing new architectural concepts unless the current
implementation demonstrates a clear limitation that cannot be solved within
the existing foundation.


# Repository

Repository:
art2all-dove-reduction

Purpose:

The Reduction Lab is a dedicated research environment for perceptual reduction experiments.

Its purpose is to identify the minimal semantic relationship network required for stable human perception.

The repository never contains product features.

The repository never modifies the Art2all product.

Only validated perception rules are transferred back into the product repository.

---

# Current Sprint

# Session Update

################################################################
# NEXT SESSION – Sprint R4.5 Continuation
################################################################

## Current Status

The Perception Laboratory has evolved from a visualization tool into the
foundation of the future Perception Engine.

Completed

✓ Stable layer system
✓ First computed Body Center landmark
✓ Body Center validated during animation
✓ First Perception Extractor architecture introduced
✓ First perception experiment completed
✓ Semantic Regions connected to real perception data
✓ First Perception Point Cloud generated
✓ Configurable point reduction implemented
✓ First perceptual reduction experiment completed

---

## Current Observation

Uniform reduction demonstrates that perceptual stability is not determined
solely by the amount of remaining information.

Initial observations indicate that recognition also depends on:

- spatial information distribution
- overall silhouette
- viewpoint

These observations are documented in RESEARCH and require further
validation before becoming perception rules.

---

## Current Architecture

PerceptionModel

↓

Renderer Layers

↓

Perception Extractors

↓

Perception Point Cloud

↓

Mesh

The renderer contains no perception logic.

All perception algorithms operate on the shared Perception Point Cloud.

---

## Next Goal

Continue the first Region-based perception experiment.

Objective

Identify which regions of the Perception Point Cloud preserve the semantic
Body–Wing Transition.

Do not invent new landmarks.

Do not introduce new architecture.

Instead determine which perceptual information is essential for stable
recognition.

---

## Working Principle

Maintain the Evidence-Driven Development workflow.

Every implementation must produce:

- one visible result
- one documented observation
- one reproducible experiment

Only validated observations become perception rules.