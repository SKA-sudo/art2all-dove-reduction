################################################################
# Art2all – Perception API
################################################################

Version: 1.0

Status: Draft

Author:
Stephan Kästner
with support from ChatGPT

################################################################

# Purpose

The Perception API defines the canonical contract between the
Perception Engine architecture and its implementation.

The API does not define algorithms.

The API does not define implementation details.

The API defines semantic responsibilities and communication between
the canonical concepts of the Perception Engine.

Architecture defines the concepts.

The API defines how those concepts collaborate.

Implementation follows the API.

---

# Canonical Pipeline

Reference Model
        │
        ▼
Observation
        │
        ▼
Perception Extractor(s)
        │
        ▼
Semantic Observation(s)
        │
        ▼
Perception State
        │
        ▼
Reduction Experiment
        │
        ▼
Perception Rule
        │
        ▼
Production Engine

---

# API Principles

The API is semantic.

It never exposes implementation details.

Every concept has exactly one responsibility.

Every concept communicates only with the next layer.

No concept bypasses another concept.

Everything follows.

---

# Canonical Concepts

## Reference Model

### Purpose

Represents a visual reference used for perception research.

### Receives

Nothing.

It is the entry point of the pipeline.

### Produces

Observation

### Public API

createObservation()

### Never

Interpret visual information.

Know perception rules.

Know production logic.

---

## Observation

### Purpose

Represents an objective visual observation.

### Receives

Reference Model

### Produces

Perception State

### Public API

createPerceptionState()

### Never

Interpret observations.

Contain semantic knowledge.

Perform extraction.

---

## Perception State

### Purpose

Represents the current perceptual situation.

Acts as the canonical semantic data model shared by all extractors.

### Receives

Observation

### Produces

Semantic state data.

### Public API

None.

The Perception State is a semantic data object.

### Never

Know extractors.

Know production logic.

Contain perception rules.

Run experiments.

---

## Extractor Pipeline

### Purpose

Coordinate the execution order of perception extractors.

### Receives

Perception State

### Produces

Updated Perception State

### Public API

run(state)

### Never

Interpret observations.

Contain perception knowledge.

Perform production tasks.

---

## Perception Extractor

### Purpose

Extract exactly one perceptual aspect.

### Receives

Perception State

### Produces

Updated Perception State

### Public API

extract(state)

### Never

Modify observations.

Know production logic.

Validate hypotheses.

Run other extractors.

---

## Reduction Experiment

### Purpose

Validate a perceptual hypothesis.

### Receives

Perception State

### Produces

Experiment Result

### Public API

run(state)

### Never

Generate artwork.

Modify the Production Engine.

---

## Perception Rule

### Purpose

Represent validated perceptual knowledge.

### Receives

Experiment Result

### Produces

Validated Rule

### Public API

createRule()

### Never

Contain hypotheses.

Perform extraction.

Generate geometry.

---

## Production Engine

### Purpose

Transform validated perception knowledge into the final artwork.

### Receives

Validated Perception Rules

### Produces

Final Artwork

### Public API

applyRules()

### Never

Perform perception research.

Execute reduction experiments.

Create new perception rules.

## Engineering Principles
Reuse Existing Knowledge

The Perception Engine does not replace existing algorithms.

It provides a semantic architecture that integrates them.

Research produces knowledge.

Engineering makes knowledge reusable.

Algorithms remain independent from the Perception Engine.

Extractors adapt existing algorithms to the semantic API.

The Perception Engine coordinates semantic processing.

The Production Engine consumes validated perceptual knowledge.


Research
        │
        ▼
Algorithms
        │
        ▼
Extractors
        │
        ▼
Extractor Pipeline
        │
        ▼
Perception Engine
        │
        ▼
Production Engine

Each layer has exactly one responsibility.

Knowledge is never duplicated.

Existing algorithms are reused whenever possible.

New research should extend the architecture rather than replace it.

The Perception State represents the aggregated semantic understanding produced from multiple Semantic Observations.