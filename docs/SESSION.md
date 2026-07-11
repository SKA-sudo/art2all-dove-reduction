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
Sprint: R5.3c – Head Priority Coordinate Validation
################################################################

Sprint Goal

Continue the Visual Priority implementation by resolving the first
regional priority model.

The Head distribution currently calls headPriority(), but the visible
priority maximum appears in the tail-feather region of the reference
model.

The visual observation is considered authoritative regardless of the
function name or intended implementation.

Current Reproducible Observation

Visual Priority: ON
Distribution: Head

Expected result:

The highest priority should appear in the semantic head region.

Actual result:

The orange/red priority maximum appears in the tail-feather region.

The radial priority gradient itself is rendered correctly.

The cause of the incorrect spatial location has not yet been identified.

Current Research Question

Why does the normalized headCenter used by headPriority() map to the
tail-feather region of the rendered reference model?

Current Task

Trace the complete coordinate path used by the Head priority model:

1. Confirm the point coordinate space generated inside
   VisualPriorityLayer.

2. Confirm the coordinate space of the calculated bounds.

3. Confirm how normalized coordinates are converted into the
   headPriority distance calculation.

4. Visualize or log the relevant coordinates before changing further
   priority values.

5. Identify the exact reason why the intended Head center corresponds
   visually to the tail-feather region.

Do not continue tuning headCenter by trial and error.

Do not implement Wing or Body priority yet.

Do not redesign the Perception Engine or introduce new semantic
architecture.

Files Currently Involved

src/components/debug/VisualPriorityLayer.jsx

src/core/perception/PriorityModels.js

Current Implementation State

uniformPriority()

Status:
Validated technical visualization.

silhouettePriority()

Status:
Validated technical visualization.

headPriority()

Status:
First radial regional PoC implemented.
Spatial mapping is not yet understood or validated.

wingPriority()

Status:
Placeholder returning 0.

bodyPriority()

Status:
Placeholder returning 0.

Success Criterion

The sprint is complete when the reason for the incorrect Head priority
location has been identified and reproduced.

After the cause is understood, headPriority() must visibly place its
highest priority inside the actual semantic head region.

The result must remain stable from the same reproducible camera view.

Important Rule

Visible observation takes precedence over intended code meaning.

Do not interpret the highlighted region from memory.

Always compare the Visual Priority rendering directly with the reference
model from the identical camera perspective.

One coordinate problem.

One explanation.

One corrected Head priority result.

One commit.