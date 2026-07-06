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
✓ BodyWingTransitionExtractor implemented
✓ First Perception Point Cloud generated
✓ Configurable point reduction implemented

---

## Current Observation

The first reduction experiments demonstrated that the Perception Point
Cloud preserves the semantic identity of the dove over a surprisingly
large reduction range.

Initial observations suggest that perception depends not only on the
amount of remaining information, but also on

- spatial information distribution
- global silhouette
- viewing direction

An additional observation was made during evaluation:

The visualization itself influences perception.

Large point clouds cannot always be perceived as a complete object,
making perceptual evaluation unreliable.

Future perception experiments therefore require standardized viewing
conditions.

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

Identify which regions of the Perception Point Cloud preserve the
semantic Body–Wing Transition.

Before evaluating perception thresholds, establish a reproducible
observation setup.

The visualization should provide a standardized view in which the
complete dove can be perceived without camera-dependent bias.

Only after standardizing the observation conditions should further
reduction experiments be evaluated.

---

## Research Workflow

Project Goal

↓

Implementation

↓

Observation

↓

Validation

↓

Scientific Insight

↓

Perception Rule

---

## AI Collaboration Rule

Continue implementing within the existing extractor architecture.

Do not introduce new architecture.

Each implementation must produce

- one visible improvement
- one reproducible experiment
- one documented observation

Only validated observations become perception rules.