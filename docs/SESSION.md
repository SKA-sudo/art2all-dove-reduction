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
Perception Principle Progress
################################################################

PP-001  ✓ Hierarchical Perception

PP-002  ✓ Distance Dependent Perception

PP-003  ✓ Semantic Meaning emerges from Relationships

PP-004  ✓ Semantic Regions instead of Polygons

PP-005  ✓ Research discovers. Production applies.

---------------------------------------------

PP-006  ☐ Semantic Head Region

PP-007  ☐ Eye Priority

PP-008  ☐ Beak Priority

PP-009  ☐ Body Relationship

PP-010  ☐ Wing Salience

PP-011  ☐ Tail Confirmation

PP-012  ☐ Dynamic Attention


################################################################
Sprint R5.6

Perception Principle PP-006

Semantic Head Region Validation

Goal

Validate that the generated Semantic Head Region
is consistently perceived by humans as the head
of the Peace Dove.

The objective is not improving the algorithm.

The objective is validating perceptual stability.

Implementation Goal

The Perception Laboratory now provides an isolated
Head Region View.

This sprint focuses exclusively on observation,
comparison and validation.

No new semantic extractors shall be implemented.

Research Tasks

- Validate different Head Region thresholds.

- Compare perceptual stability.

- Document the observed semantic boundaries.

- Identify the minimal stable Head Region.

Success Criterion

Independent observers consistently identify
the isolated semantic region as the visual head
of the Peace Dove.

After successful validation:

PP-006 becomes validated.

The resulting semantic rule becomes eligible
for transfer into the Art2all Production Engine.

################################################################