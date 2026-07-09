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

## Research Observation – Semantic Knowledge emerges from Implementation

### Status

During the semantic migration of the Perception Engine, a significant observation emerged.

The objective of the current sprint was not to design a semantic architecture, but simply to migrate existing engineering algorithms into truthful `SemanticObservation` objects.

The resulting observations are now:

* WholeDove → HAS_OBSERVATION
* WholeDove → HAS_FACE_CENTERS
* WholeDove → HAS_BODY_CENTER
* WholeDove → HAS_PRIMARY_GESTURE
* WholeDove → HAS_OUTLINE
* WholeDove → HAS_SURFACE_NORMALS
* PaperField → HAS_RELATIONSHIP_FORCES
* LeftWing → HAS_WING_FINGER_CURVES

### Observation

The collection of semantic observations no longer behaves like a flat list of extracted properties.

Instead, it naturally begins to form a structured semantic knowledge representation consisting of multiple semantic entities (WholeDove, PaperField, LeftWing) and their validated semantic properties.

This behavior was not designed in advance.

It emerged directly from the implementation process.

### Research Hypothesis

Future evaluation should investigate whether the semantic migration process naturally evolves into a semantic knowledge graph rather than requiring an explicitly designed ontology.

This is currently a research hypothesis and not yet a validated architectural decision.

### Project Reminder

The Reduction Lab is not the final product.

Its purpose is to discover validated semantic rules that can later be transferred into the Art2all Engine.

Research is therefore always evaluated against one additional question:

**Does this discovery bring the visual Art2all prototype closer to a Peace Dove that organically grows from children's drawings?**

Only validated knowledge with a clear visual application should leave the Reduction Lab and become part of the product.

