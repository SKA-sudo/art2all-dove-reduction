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

## Sprint R4.3 – Visualize Primary Axis

### Status

▶ Ready

### Goal

Improve the debug visualization of the Primary Axis so it can be clearly seen and evaluated from normal camera perspectives.

The Primary Axis already exists and can be toggled on and off.

This sprint does not change the Primary Axis calculation.

---

### Problem

The Primary Axis toggle works, but the axis line is only visible from certain camera angles because it lies inside or behind the technical wireframe model.

This makes visual evaluation unreliable.

---

### Scope

This sprint improves only the visual representation of the existing Primary Axis.

No new perception experiment is started.

No new relationship layers are added.

No changes are made to the GDL calculation.

---

### Tasks

#### 1. Keep the existing toggle

The current button continues to control Primary Axis visibility.

#### 2. Improve Primary Axis visibility

Render the Primary Axis in a way that is clearly visible from normal viewing angles.

Allowed minimal improvements:

- stronger line width
- `depthTest={false}`
- clear color
- visible marker spheres at axis points

#### 3. Do not change axis data

The underlying points from `gdl.axis.points` remain unchanged.

#### 4. Verify result

Confirm that:

- the red technical dove remains visible,
- the Primary Axis can be toggled on and off,
- the Primary Axis is clearly visible from normal camera angles,
- no new information layer is introduced.

---

### Definition of Done

- Primary Axis is visibly understandable without searching for a special camera angle.
- Toggle still works.
- Technical model remains unchanged.
- Only debug visualization was improved.