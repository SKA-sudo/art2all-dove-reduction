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

Sprint R4.x – Semantic Adapter Migration

Objective

Complete the migration of the remaining engineering algorithms to the Semantic Translation Layer.

Goals

Migrate the remaining engineering algorithms using the established adapter pattern.
Ensure that every Semantic Extractor depends only on an Adapter.
Ensure that every Adapter depends only on Engineering algorithms.
Keep Semantic Observations and the Perception State unchanged.

Architecture Rule

Engineering Algorithm
        │
        ▼
Engineering Adapter
        │
        ▼
Semantic Extractor
        │
        ▼
Semantic Observation
        │
        ▼
Perception State

Definition of Done

All existing Extractors use Adapters.
No Extractor imports Engineering algorithms directly.
Engineering remains independent from the Perception Layer.
The Semantic Translation Layer is consistently applied across the pipeline.

Expected Outcome

The semantic migration architecture becomes fully consistent and serves as the stable foundation for future perception research, semantic relationships, and higher-level reasoning.

Research is therefore always evaluated against one additional question:

**Does this discovery bring the visual Art2all prototype closer to a Peace Dove that organically grows from children's drawings?**

Only validated knowledge with a clear visual application should leave the Reduction Lab and become part of the product.

