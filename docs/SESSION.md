# AI_START (MANDATORY)

Read first:

1. ../art2all/docs/FOUNDATION.md
2. ../art2all/docs/SESSION.md
3. this repository's docs/SESSION.md

This document extends the global Art2all documentation.
It never overrides the global project documentation.

---

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

## Sprint R1 – Reference Baseline

### Status

▶ Ready

### Goal

Create the reference implementation of the Spatial Grid from the Art2all product repository.

This implementation becomes the fixed baseline for every future reduction experiment.

No redesign, interpretation or optimisation is allowed.

---

### Scientific Principle

Every reduction experiment must start from exactly the same reference implementation.

Only then can perceptual changes be attributed to the performed reduction.

---

### Tasks

#### 1. Identify the complete implementation

Locate the complete Spatial Grid implementation inside the Art2all product repository.

This includes the complete rendering chain:

- data generation
- builders
- rendering components
- materials
- camera setup
- dependencies
- configuration
- assets
- rendering order

Nothing may be recreated from memory.

---

#### 2. Reproduce the implementation

Transfer the complete implementation into `art2all-dove-reduction`.

Rules:

- Product repository is the single source of truth.
- No redesign.
- No optimisation.
- No interpretation.
- Only import paths may be adjusted when required.

---

#### 3. Validate the baseline

The sprint is completed only if the visual result is indistinguishable from the product repository.

Validation criteria:

- identical visual appearance
- identical behaviour
- identical rendering structure

A successful build alone is **not** sufficient.

---

### Definition of Done

The Reduction Lab contains an exact visual reproduction of the Spatial Grid from the product repository.

This implementation becomes the reference baseline for every future reduction experiment.

Only after this milestone is completed may Reduction Sprint R2 begin.