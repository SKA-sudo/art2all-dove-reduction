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
################################################################


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

# Session Update

## Sprint R4.2 – Toggle First Information Layer

### Status

▶ Ready

### Goal

Replace the temporary full-model visibility toggle with a toggle for the first real visual information layer.

The objective is to prove that a specific perception-relevant layer can be shown or hidden without changing the technical dove model.

---

### Scope

This sprint toggles only one layer:

**Primary Axis**

No additional relationship types are introduced.

No experiment profiles are created.

No reduction engine is built.

---

### Tasks

#### 1. Restore technical model visibility

The technical wireframe model remains visible by default.

It is no longer controlled by the current toggle button.

#### 2. Activate Primary Axis debug rendering

Enable rendering of the existing Primary Axis debug line through `GDLDebug`.

#### 3. Connect the toggle to Primary Axis visibility

The existing button controls only the Primary Axis visibility.

#### 4. Verify visual result

Confirm that:

- the red technical model remains visible,
- the Primary Axis can be shown and hidden,
- no model geometry is changed,
- no additional information layers are affected.

---

### Definition of Done

- The red technical dove model stays visible at all times.
- The Primary Axis can be toggled on and off.
- The toggle affects only the Primary Axis layer.
- The implementation remains minimal.
- No general toggle engine or experiment profile system is introduced.