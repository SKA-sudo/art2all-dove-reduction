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
# NEXT SESSION – Sprint R4.8
Animated Semantic Extraction
################################################################

## Current Status

The Perception Laboratory now supports reproducible perception
experiments.

Implemented

✓ Reference Model ON/OFF

✓ Animation ON/OFF

✓ Semantic Regions

✓ Outline Layer

✓ Stable coordinate system

✓ Standardized experiment controls

---

## Important Observation

The Outline Layer follows the animated dove automatically because it
renders the animated SkinnedMesh.

The Semantic Point Cloud remains static because it is extracted from the
original geometry.

The current extractor therefore represents geometry instead of animated
perception.

---

## Sprint Goal

Develop the first Animated Semantic Extractor.

The objective is not to animate points.

The objective is to extract semantic information directly from the
animated SkinnedMesh.

---

## Research Goal

Determine whether motion itself represents semantic information.

The implementation should establish whether animated semantic extraction
improves perception experiments compared to static semantic extraction.

---

## AI Collaboration Rule

Do not implement animation effects.

Implement semantic extraction from the animated perception state.

The objective is scientific validation rather than visual appearance.

Every implementation must produce

- one reproducible experiment

- one observable result

- one documented perception insight.