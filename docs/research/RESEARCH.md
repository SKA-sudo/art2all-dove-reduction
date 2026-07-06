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


################################################################
## Research Methodology – Project-driven Research
################################################################

### Fundamental Principle

The Reduction Lab does not conduct research for its own sake.

Research questions emerge directly from concrete implementation problems
encountered during the development of the Art2all Perception Engine.

The preferred workflow is therefore:

Project Goal

↓

Implementation

↓

Observation

↓

Experimental Validation

↓

Scientific Insight

↓

Perception Rule

↓

Algorithm

↓

Art2all Engine

This methodology ensures that every scientific result has immediate value
for the project and that every implementation contributes to the
understanding of visual perception.

---

## Product First

The primary objective of the Reduction Lab is to advance the Art2all
Perception Engine.

Scientific investigation serves the project.

Research is only pursued when it directly supports implementation or
improves the understanding of perception required by the engine.

The laboratory therefore follows a Product-driven Research approach rather
than Research-driven Development.

---

## Experimental Strategy

Every implementation represents a perception experiment.

Each experiment follows four steps:

1. Implement the smallest possible perceptual hypothesis.
2. Observe the visual result.
3. Validate whether the hypothesis improves perception.
4. Derive a reproducible perception rule.

Validated perception rules become candidates for the Art2all
Perception Engine.

Rejected hypotheses remain valuable because they define the boundaries of
the perceptual model.


## Sprint R4.5 — Perception Point Cloud
# Objective

Continue the first Region-based Perception Experiment.

Instead of visualizing estimated semantic regions, generate a perception dataset directly from the existing dove geometry.

# Implementation

The BodyWingTransitionExtractor was modified to extract the center point of every mesh face.

These face centers are rendered through the existing Semantic Regions layer.

No perceptual filtering or heuristics are applied.

The visualization therefore represents the complete extracted perception dataset.

# Observation

The resulting point cloud is not perceived as random geometric data.

Instead, the complete dove remains immediately recognizable.

Natural visual clusters emerge automatically, including:

head
neck
body
wings
tail

No explicit region detection algorithm was required.

Insight

The extracted face centers appear to form a coherent perceptual representation of the dove.

This suggests that the face-center cloud may serve as a common perception dataset for future extractors.

Current extractors such as:

Body Center
Flow
Body–Wing Transition

may therefore operate on the same perception dataset rather than directly on the mesh.

This is currently an observation and requires further validation.

Next Step

Investigate whether controlled filtering of the perception point cloud reveals stable perceptual regions.

Research workflow remains:

Implementation

↓

Observation

↓

Validation

↓

Scientific Insight

↓

Perception Rule