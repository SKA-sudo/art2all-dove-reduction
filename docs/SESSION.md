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
# NEXT SESSION – Sprint R4.7 Animated Semantic Perception
################################################################

## Current Status

The Perception Laboratory now supports controlled perception experiments.

Completed

✓ Reference Model ON/OFF
✓ Animation ON/OFF
✓ Wireframe Layer
✓ Semantic Region Layer
✓ Outline Layer (prototype)
✓ Stable coordinate system
✓ Standardized experiment controls

The laboratory has evolved from a visualization tool into an interactive
perception experiment platform.

---

## Observation

The animation toggle revealed an important architectural distinction.

The Reference Model is animated.

The Semantic Perception Model remains static.

This is not a rendering bug.

It demonstrates that the current semantic representation is extracted only
once from the mesh and is therefore independent of the animated perception
state.

---

## Research Question

Should semantic perception remain static?

Or does human perception also rely on semantic motion?

The first experiments suggest that motion itself may represent semantic
information.

Therefore the semantic representation should eventually evolve together
with the animated dove.

---

## Next Objective

Implement the first Animated Semantic Perception Model.

The semantic regions should no longer represent only the initial geometry.

Instead they should continuously follow the animated perception state of
the dove.

The objective is not visual realism.

The objective is to determine whether animated semantic structures improve
human recognition during perception experiments.

---

## Success Criteria

✓ Reference Model and Semantic Model remain spatially synchronized.

✓ Animation can be switched ON/OFF independently.

✓ Semantic regions move together with the animated dove.

✓ Existing extractor architecture remains unchanged.

✓ The implementation produces one reproducible perception experiment.

---

## Expected Scientific Insight

Current hypothesis:

Human perception does not rely exclusively on spatial information.

Temporal information (motion) is likely another semantic layer of
recognition.

The Animated Semantic Model will allow future experiments to separate

- static perception
- dynamic perception

under identical experimental conditions.

Only after validation may motion become a future perception rule.