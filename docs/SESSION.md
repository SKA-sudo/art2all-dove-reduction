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
Sprint:
R8.0 – Semantic Paper Skin

################################################################

## Sprint Goal

Transform the semantic body region into a convincing paper surface.

The objective is no longer to investigate new perception hypotheses,
but to improve the visible result step by step.

Every sprint must produce a screenshot that is visually closer to
the target image.

################################################################

## Current State

Completed

✓ Papers are placed directly on the semantic body surface.

✓ Artificial paper rows have been removed.

✓ Paper size now varies depending on body position.

✓ Initial local paper orientation has been evaluated.

Observation

The largest remaining limitation is no longer paper placement,
but paper selection.

The current implementation still selects papers using mesh index
order.

This produces visible bands because mesh topology does not reflect
visual perception.

################################################################
Sprint R8.1 – Semantic Surface Orientation
################################################################

Status:
Completed

Goal

Validate whether semantic regions can provide surface orientation
to the Production Engine.

Result

The semantic pipeline was extended so that semantic regions now
preserve local face normals in addition to semantic centers.

Validated Regions

✓ Head Region
✓ Body Region
✓ Tail Region

Validated Semantic Contract

Semantic Region

↓

faces

↓

center

↓

normal

↓

surface orientation

Findings

The previous implementation only transported semantic positions.

Surface orientation had to be reconstructed inside the
Production Engine.

After exposing semantic normals through the Perception State,
BodySurfaceOrientationDebug immediately became capable of
visualizing semantic surface orientation.

Conclusion

Semantic regions are no longer point collections.

They represent semantic surface information.

This establishes the first direct semantic contract between
the Perception Engine and the Production Engine.