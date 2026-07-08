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

################################################################
# Current State
################################################################

The semantic pipeline is operational.

Implemented Semantic Observations:

✓ HAS_OBSERVATION
✓ HAS_BODY_CENTER
✓ HAS_PRIMARY_GESTURE
✓ HAS_OUTLINE

The Perception Monitor visualizes the current semantic understanding.

################################################################
# Working Principle
################################################################

Project First.

Science Second.

One measurable implementation step per iteration.

Do not redesign architecture unless implementation requires it.

################################################################
# Semantic Migration Principle
################################################################

Do not migrate implementations.

Migrate semantic responsibilities.

Before creating a new Extractor always determine:

"What semantic statement can this algorithm truthfully produce today?"

Only then implement the corresponding SemanticObservation.

Never migrate intended future behaviour.

Only migrate existing semantic capability.

################################################################
# Collaboration Rule
################################################################

Stay focused.

Do not jump to future architecture.

Do not discuss multiple future steps.

Always finish the current implementation before exploring new ideas.

Small measurable progress is preferred over large discussions.

################################################################
# Next Goal
################################################################

Continue migrating existing engineering algorithms into Semantic Extractors.

For every migration:

1. Read the existing implementation.
2. Determine its actual semantic responsibility.
3. Create exactly one SemanticObservation.
4. Validate it in the Perception Monitor.
5. Commit.

The Perception Monitor is the primary indicator of implementation progress.

################################################################