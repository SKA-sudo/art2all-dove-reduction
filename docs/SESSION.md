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
2. ../art2all-dove-reduction/docs/SESSION.md
3. ../art2all-dove-reduction/docs/RESEARCH.md
4. ../art2all-dove-reduction/docs/DECISIONS.md
5. ../art2all-dove-reduction/docs/PERCEPTION_API.md
5. ../art2all-dove-reduction/docs/PERCEPTION_ENGINE.md


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

Do not redesign the architecture.
Continue the current implementation.


# Repository

Repository:
art2all-dove-reduction

Purpose:

The Reduction Lab is a dedicated research environment for perceptual reduction experiments.

Its purpose is to identify the minimal semantic relationship network required for stable human perception.

The repository never contains product features.

The repository never modifies the Art2all product.

Only validated perception rules are transferred back into the product repository.


### Current Development Principle

Continue the semantic migration exactly as before.

One existing algorithm.

One truthful semantic responsibility.

One validated Semantic Observation.

One measurable implementation result.

One commit.

At the end of every implementation step, additionally evaluate:

**How can this semantic observation later contribute to the visual construction of the Art2all Peace Dove?**

Research supports the product.

The product remains the primary objective.


---

################################################################
Sprint R4.X
Semantic Migration – Vertical Slice
################################################################

Objective

Validate the new Perception Engine architecture by migrating one
existing implementation completely through the semantic pipeline.

This sprint does not introduce new algorithms.

It validates the architecture.

################################################################
Background
################################################################

The current architecture distinguishes between

Engineering

↓

Semantic Observation

↓

Semantic Knowledge

↓

Organisation Rules

↓

Visual Mapping

↓

Production Engine

The objective is to prove that existing implementations can be
migrated into this architecture without changing their behaviour.

################################################################
Current Task
################################################################

Select one existing implementation and migrate it completely.

Recommended candidate:

Semantic Head Surface

The implementation already works and can be validated visually.

################################################################
Implementation Goal
################################################################

The existing implementation shall

• produce one well-defined Semantic Observation

• integrate this observation into the Perception State

• be consumed by the prototype without direct Builder access

The visible result must remain unchanged.

################################################################
Success Criteria
################################################################

✓ Existing algorithm remains unchanged

✓ One Semantic Observation is produced

✓ Observation becomes part of the Perception State

✓ Prototype consumes semantic data

✓ No behavioural changes

✓ Architecture validated

################################################################
Important
################################################################

This sprint is not about discovering new perception rules.

This sprint is not about improving rendering.

This sprint validates the migration path from existing engineering
towards a perception-driven architecture.

Only after this vertical slice is completed will additional
algorithms be migrated.