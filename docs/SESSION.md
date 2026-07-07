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
NEXT SESSION – Sprint R5.0
Perception Engine V2
################################################################

## Current Status

The Perception Laboratory has reached an important architectural milestone.

During the Animated Semantic Perception experiments it became clear that
semantic extraction should no longer operate directly on scene geometry.

The first PerceptionState abstraction has been introduced.

The first extractor already consumes the new PerceptionState instead of
direct scene access.

This validates the new architectural direction.

---

## Sprint Goal

Design the canonical architecture of the Art2all Perception Engine.

The objective is not to implement new algorithms.

The objective is to establish a stable architectural foundation that will
support future perception research and the Production Engine.

---

## Deliverables

Define the canonical concepts of the Perception Engine.

- Reference Model

- Observation

- Perception State

- Perception Extractor

- Reduction Experiment

- Perception Rule

- Production Engine

Create the first version of

docs/PERCEPTION_ENGINE.md

This document becomes the architectural foundation of the complete
Perception Engine.

---

## Important Principle

Every core class represents a perception concept.

Never an implementation concept.

The architecture grows from perception.

The API grows from the architecture.

Implementation grows from the API.

---

## Collaboration Rule

Project First.

Science Second.

The Peace Dove defines the project.

The project drives the research.

Research refines the architecture.

Architecture enables implementation.

The objective remains unchanged:

Preserve stable human perception while visual complexity continuously grows.