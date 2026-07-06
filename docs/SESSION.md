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
# NEXT SESSION – Sprint R4.4 Continuation
################################################################

## Current Status

The Perception Laboratory now has functional layer controls.

Completed:
- Removed temporary BoundingBox Primary Axis.
- Added laboratory layer toggles.
- Wireframe layer can be switched on/off.
- Landmark layer can be switched on/off.
- Placeholder layers exist for:
  - Semantic Regions
  - Outline
  - Flow
  - Gesture

Important result:
The Perception Laboratory is now usable as a platform for isolated perception experiments.

---

## Next Goal

Use the Perception Laboratory for the first real experiment.

Do not introduce new architecture.

Do not add new hypotheses.

Implement the first real Landmark:

Body Center

Goal:
Replace the temporary landmark placeholder with a reproducible Body Center landmark derived from the current dove model.

Validation:
The Body Center must be visible, toggleable, and suitable as the first stable reference point for later semantic construction experiments.