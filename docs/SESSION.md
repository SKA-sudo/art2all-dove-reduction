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
################################################################
# Sprint R5.1 – Semantic Validation Framework
################################################################

Status:
Ready

Goal:
Transform the Semantic Validator into a reusable validation framework
for the Perception Engine.

Problem:
The first semantic validator has been successfully validated.
Future validation rules should no longer be hardcoded inside
SemanticValidator.js.

Scope:

✔ Introduce rule-based validation.
✔ Create the first reusable validation rule.
✔ Validate complete dove structures.
✔ Keep the validator independent from PerceptionModel.

Tasks:

1.
Create Validation Rule interface.

2.
Move HEAD_STRUCTURE_VALID
into its own validation rule.

3.
Implement DOVE_STRUCTURE_VALID.

4.
Refactor SemanticValidator
to iterate over validation rules.

5.
Validate output using console.table().

Out of Scope:

✖ No new Extractors
✖ No new Inference Rules
✖ No Builder implementation
✖ No rendering changes

Definition of Done:

✔ Validation is fully rule based.

✔ SemanticValidator contains no
hardcoded semantic knowledge.

✔ HEAD_STRUCTURE_VALID is produced
by a validation rule.

✔ DOVE_STRUCTURE_VALID is successfully inferred.

✔ Architecture remains:

Extractors
    ↓
Inference Rules
    ↓
Semantic Knowledge Graph
    ↓
Validation Rules
    ↓
Validated Knowledge Graph