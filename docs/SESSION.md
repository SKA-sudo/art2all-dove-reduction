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
3. ../art2all-dove-reduction/RESEARCH.md
4. ../art2all-dove-reduction/DECISIONS.md
5. ../art2all-dove-reduction/PERCEPTION_API.md
5. ../art2all-dove-reduction/PERCEPTION_ENGINE.md


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

---

## Session Goal

Continue the semantic migration of the Perception Engine.

The architecture has been cleaned up and the semantic migration process is now the primary implementation focus.

Current State

AI_START documentation is authoritative.
Semantic pipeline is operational.
SemanticObservation is established as the canonical semantic unit.
PerceptionState has been introduced.
Duplicate extractor implementation has been removed.
The former Region/BodyWingTransition implementation was analysed.
The algorithm does not detect semantic regions.
Its actual semantic responsibility is:
WholeDove
HAS_FACE_CENTERS
FaceCenterExtractor has been introduced successfully.
The pipeline currently produces five Semantic Observations:
HAS_OBSERVATION
HAS_FACE_CENTERS
HAS_BODY_CENTER
HAS_PRIMARY_GESTURE
HAS_OUTLINE

Working Principle

Do not introduce new architecture.

Do not speculate.

Before implementing anything:

Read the relevant implementation.
Determine the current semantic responsibility.
Produce exactly one SemanticObservation.
Validate it in the Perception Monitor.
Commit.

The objective is to migrate existing engineering capabilities into the Perception Engine one semantic responsibility at a time.

Immediate Next Goal

Continue the semantic migration from the current implementation.

Read the next existing engineering algorithm and determine:

"What semantic statement can this algorithm truthfully produce today?"

Only after that create the next Semantic Extractor.

Success Criterion

The Perception Monitor must display one additional validated Semantic Observation.

One implementation step.

One measurable result.

One commit.