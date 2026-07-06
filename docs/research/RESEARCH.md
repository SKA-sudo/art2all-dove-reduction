################################################################
# Art2all – ## RESEARCH
################################################################


Research 


Version: 1.0

Status: Living Document

Repository: art2all-dove-reduction


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################



## Research Note – Perception Landmarks (Sprint R4.3)

### New Hypothesis

The Primary Axis should **not** be the first perceptual structure.

Instead, perception begins by identifying a small set of stable semantic landmarks.
All higher-level perception structures are derived from these landmarks.

Current hypothesis for a dove:

- Head
- Beak
- Neck Base
- Body Center
- Left Wing Root
- Right Wing Root
- Tail Center

### Perceptual Importance

Landmarks are **species-dependent**.

Example:

Peace Dove
- Body ★★★★★
- Wings ★★★★★
- Tail ★★★★☆
- Head ★★★★☆
- Beak ★★★☆☆
- Feet ★☆☆☆☆

Eagle
- Beak ★★★★★
- Eyes ★★★★★
- Claws ★★★★★
- Wings ★★★★★
- Tail ★★★☆☆

Therefore the perception engine should not only detect landmarks,
but also assign perceptual importance depending on the species.

### Proposed Architecture

Target Image

↓

Perception Landmarks

↓

Perception Structures
(Primary Axis, Dove Space, Wing Space, Gesture, Flow, ...)

↓

Construction Engine



################################################################
## Research Note – Perceptual Organization Theory (Sprint R4.3)
################################################################

### New Hypothesis

Semantic recognition is not the first stage of visual perception.

Before semantic landmarks can emerge, the visual system first organizes
the incoming visual information into stable perceptual structures.

Semantics is therefore considered the result of perceptual organization,
not its starting point.

---

## Proposed Perception Hierarchy

Target Image

↓

Visual Signal

↓

Presence

↓

Perceptual Organization

↓

Semantic Organization

↓

Construction Engine

---

## Current Working Model

The current research suggests the following perceptual hierarchy:

Target Image

↓

Presence

↓

Primary Perceptual Region (PPR)

↓

Primary Perceptual Anchor (PPA)

↓

Semantic Landmarks

↓

Perception Structures

- Primary Axis
- Wing Space
- Gesture
- Flow
- Outline

↓

Construction Engine

---

## Definitions

### Presence

The immediate recognition that a coherent object exists.

No semantic interpretation is performed.

---

### Primary Perceptual Region (PPR)

The dominant coherent visual region perceived immediately after Presence.

The PPR is not a mathematical point.

It represents the primary visual region that organizes further perception.

---

### Primary Perceptual Anchor (PPA)

A stable spatial reference derived from the Primary Perceptual Region.

The PPA serves as the reference point for all higher perceptual structures.

---

### Semantic Landmarks

Semantic object parts derived relative to the Primary Perceptual Anchor.

Examples for a Peace Dove:

- Head
- Beak
- Neck Base
- Left Wing Root
- Right Wing Root
- Tail Center

Semantic landmarks are considered secondary perceptual structures.

---

## Research Principle

Every newly introduced perception layer must explain why the next layer
can emerge.

Example:

Presence
→ enables Perceptual Organization

Perceptual Organization
→ enables Semantic Organization

Semantic Organization
→ enables Construction Structures

Construction Structures
→ enable Algorithmic Generation

---

## Scientific Status

Current status:

Research Hypothesis

The proposed hierarchy has not yet been experimentally validated.

Future Reduction Lab experiments will investigate whether the existence of
Primary Perceptual Regions and Primary Perceptual Anchors can be observed
consistently across different object categories.

Only after successful validation may these concepts become official
Perception Rules.

Die Art2all Perception Engine beginnt nicht mit Geometrie und nicht mit Semantik. Sie beginnt mit den Organisationsprinzipien der menschlichen Wahrnehmung. Erst aus diesen Organisationsprinzipien entstehen stabile semantische Strukturen, aus denen anschließend Algorithmen abgeleitet werden.

---

## Motivation

Traditional computer graphics and most geometry-based algorithms begin with
mathematical representations of an object.

Typical processing pipelines start from:

Mesh
→ Vertices
→ Faces
→ Geometry
→ Algorithms

The Reduction Lab follows a fundamentally different research direction.

The objective is not to reconstruct geometry.

The objective is to reconstruct the perceptual organization that allows
humans to recognize meaningful structures.

Geometry is considered an implementation detail.

Perception is considered the primary source of structure.

---

## Research Vision

The long-term objective of the Reduction Lab is to identify the smallest
possible set of perceptual organization principles required for stable
semantic recognition.

These principles should be:

- independent of a specific species,
- independent of a specific mesh,
- independent of rendering technology,
- experimentally reproducible,
- transferable into algorithms.

The resulting perception rules form the foundation for future construction
engines.

---

## Working Hypothesis

Visual perception is organized hierarchically.

Each layer reduces complexity while increasing semantic stability.

The proposed hierarchy is:

Visual Signal

↓

Perceptual Organization

↓

Semantic Organization

↓

Construction Organization

↓

Algorithmic Construction

Every layer depends on the successful organization performed by the
previous layer.

No higher layer should bypass lower perceptual layers.

---

## Validation Strategy

Every newly proposed perception layer must satisfy three conditions.

### 1. Perceptual Evidence

The layer must correspond to an observable perceptual phenomenon.

---

### 2. Experimental Validation

The layer must be testable through Reduction Lab experiments.

The hypothesis must be falsifiable.

---

### 3. Algorithmic Transfer

The validated perception rule must be transferable into a deterministic
algorithm.

Only after satisfying all three conditions may a perception layer become
part of the Art2all Perception Engine.

---

## Long-Term Vision

The Reduction Lab is not intended to teach a computer what a dove is.

Its purpose is to understand how visual information becomes organized
before semantic meaning emerges.

If successful, the resulting perception principles should be applicable
far beyond birds and may serve as the perceptual foundation for future
construction engines.