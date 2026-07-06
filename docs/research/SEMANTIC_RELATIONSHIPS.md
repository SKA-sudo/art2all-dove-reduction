################################################################
# Art2all – ## SEMANTIC RELATIONSHIPS
################################################################


SEMANTIC_RELATIONSHIPS


Version: 1.0

Status: Living Document

Repository: art2all-dove-reduction


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################

## Perception Point Cloud
# Observation

The current Perception Laboratory generates a point cloud by extracting the center of every mesh face.

Although this dataset contains no semantic information, humans immediately perceive meaningful structures.

The point cloud already preserves the overall identity of the dove.

# Proposed Relationship

Current observation suggests the following perception hierarchy.

GLB Mesh
      ↓
Perception Point Cloud
      ↓
Perception Extractors
      ├── Body Center
      ├── Flow
      ├── Outline
      ├── Gesture
      ├── Transition Regions
      └── Future Perception Rules
# Interpretation

The Perception Point Cloud is not considered a new rendering representation.

Instead, it is a shared perceptual dataset from which multiple perception extractors may derive their observations.

Each extractor analyzes the same dataset from a different perceptual perspective.

# Status

Current status:

# Research Observation

The Perception Point Cloud has not yet been accepted as part of the canonical architecture.

Further validation is required before promoting this concept to a design decision.