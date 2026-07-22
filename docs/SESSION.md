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
Primary Goal

Build the Art2all Peace Dove.

Research is only performed when it directly enables the next
production milestone.

Current Production Pipeline

Perception
↓
Semantic Graph
↓
Semantic Surface
↓
Paper Placement
↓
Peace Dove



Before proposing any architecture, implementation or research,
the following documents MUST be read in this exact order:

1. ../art2all/docs/FOUNDATION.md
2. ../art2all-dove-reduction/docs/SESSION.md
3. ../art2all-dove-reduction/docs/RESEARCH.md
4. ../art2all-dove-reduction/docs/DECISIONS.md
5. ../art2all-dove-reduction/docs/PERCEPTION_API.md
5. ../art2all-dove-reduction/docs/PERCEPTION_ENGINE.md


Before implementing anything:

1. Does this move the Peace Dove forward?
2. Does an implementation already exist?
3. Would this create duplicate architecture?
4. If unsure, inspect the repository first.

Temporary / Legacy

- Experimental PoCs are allowed.
- Replace them only after the production path works.
- Do not introduce parallel architectures.
- confirm the active repository
- confirm the active branch
- summarize the current sprint objective
- identify the current implementation goal
- avoid proposing ideas that contradict the documented foundation

This document extends the global Art2all documentation.
It never overrides the global project documentation.

If a new idea conflicts with FOUNDATION, RESEARCH or DECISIONS, the documented decision takes precedence until explicitly changed

# Architecture Rule

Prefer extending the current production pipeline over creating
new builders, adapters or data models.

Before introducing a new component, inspect existing
implementations and reuse them whenever possible

###########################################
## Current Sprint Goal
###########################################
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
################################################################
Sprint R5.3 – Semantic Surface
################################################################

Status:
✅ COMPLETED

Objective
---------

Transform the Semantic Graph into a semantic surface representation
that can be rendered independently from the underlying mesh.

Result
------

The Semantic Surface Builder has been successfully implemented.

The builder transforms semantic graph components into semantic
surface components while preserving:

- semantic identity
- spatial organization
- neighbourhood relationships
- associated surface elements

A dedicated DebugSemanticSurface renderer was implemented and
integrated into the Perception Laboratory.

The visualization confirms that semantic regions can now be rendered
independently from the original mesh processing pipeline.

Pipeline
--------

Perception

↓

Semantic Observations

↓

Semantic Graph

↓

Semantic Surface

↓

Debug Visualization

Validated
---------

✔ Semantic Graph successfully transformed into Semantic Surface

✔ Semantic Surface rendered inside the Perception Laboratory

✔ Surface components preserve semantic structure

✔ Rendering is independent from mesh extraction logic

Research Outcome
----------------

This sprint introduces a new abstraction layer.

The system no longer operates only on geometric mesh faces.

Instead, semantic components now exist as explicit semantic surfaces
which can be analysed, visualised and processed independently.

This represents an important architectural step towards a
Perception Engine that operates on meaningful structures instead of
raw geometry.

Next Sprint
-----------

Sprint R5.4 – Perceptual Surface

Goal:

Investigate how semantic surfaces merge into perceptual surfaces and
which regions are actually required for stable object recognition.

Target pipeline:

Semantic Surface

↓

Perceptual Surface

↓

Visual Recognition