################################################################
# Art2all – RESEARCH LOGFILE
################################################################

 Research Logfile

Status: Living Document

Repository:
art2all-dove-reduction

Author:
Stephan Kästner
with support from ChatGPT

################################################################
# Purpose
################################################################

The Reduction Lab does not search for a better Peace Dove.
It searches for the minimal perceptual and semantic knowledge required for a human observer to still recognize one.


The Art2all Reduction Lab is the scientific research environment of the
Art2all project.

Its purpose is not to develop product features.

Its purpose is to discover the minimal perceptual and semantic structures
required for stable human recognition.

Every validated research result is intended to improve the visual
construction of the Art2all Peace Dove.

The Reduction Lab therefore serves as the bridge between

human perception,

semantic understanding,

and

the visual construction of the final artwork.

The Reduction Lab does not attempt to invent perception.

It attempts to discover the perceptual principles that already exist within a completed reference model and to transform them into validated semantic knowledge.

□ Enthält der Extractor einen Engineering-Import?
    → Dann gehört dieser in einen Adapter.

□ Erzeugt der Adapter Semantic Observations?
    → Dann gehört diese Logik in den Extractor.

□ Kennt der Engineering-Code SemanticObservation?
    → Das darf niemals passieren.

□ Kann der Engineering-Algorithmus ersetzt werden,
  ohne den Extractor anzufassen?
    → Dann ist die Trennung gelungen.


################################################################
Research Log

Sprint R6.3

Body / Wing Boundary

Status

Experimental Observation

Objective

Investigate whether the perpendicular distance of surface faces
to the Longitudinal Axis is sufficient to distinguish the semantic
Body Region from the Wing Region.

Method

The existing Body Region algorithm was extended for experimental
visualization only.

Instead of displaying a binary Body Region, every face within the
longitudinal body range was assigned its measured distance to the
Longitudinal Axis.

The measured distances were visualized as a continuous color gradient:

Green
→ small distance to the axis

Yellow
→ medium distance

Orange / Red
→ large distance

No semantic classification rules were modified.

The experiment only visualized an already existing geometric
relationship.

Observation

The resulting visualization revealed a stable radial gradient around
the Longitudinal Axis.

Faces located close to the central body volume appeared green,
while faces located further away gradually transitioned through
yellow towards orange and red.

The visualization therefore demonstrated that the distance to the
Longitudinal Axis contains meaningful semantic information.

However, the experiment also revealed that this measurement alone
does not separate Body and Wing.

Outer wing regions, tail extremities and legs all produce large
axis distances despite representing different semantic structures.

Result

Axis Distance successfully represents geometric centrality.

Axis Distance does not uniquely represent the semantic Body/Wing
Boundary.

Conclusion

The hypothesis that perpendicular axis distance alone can determine
the Body Region is only partially supported.

The experiment validates that Axis Distance is an important semantic
observation, but not a sufficient criterion for body classification.

Future body segmentation will therefore require additional semantic
observations beyond longitudinal position and axis distance.

Research Impact

This experiment provides the first quantitative evidence that the
Body/Wing Boundary cannot be derived from a single geometric
relationship.

Instead, semantic body recognition is likely to emerge from the
combination of multiple independent observations.

Current Research Status

Experimental observation completed.

Future work:

- investigate additional semantic observations
- compare local surface orientation
- analyse neighbourhood relationships
- evaluate multi-observation body classification

################################################################

Research Log
Sprint R6.3 — Body / Wing Boundary
Status

Completed

Objective

Investigate whether the semantic Body/Wing Boundary can be derived from a single geometric observation.

Experiments

Experiment R6.3a — Axis Distance

Observation:

The perpendicular distance to the Longitudinal Axis produces a stable representation of geometric centrality.

Result:

Axis Distance alone does not separate Body and Wing.

Experiment R6.3b — Surface Orientation

Observation:

Surface orientation visualizes local geometric curvature.

Result:

Surface Orientation alone does not produce a stable Body/Wing Boundary.

Research Conclusion

Both experiments demonstrate that individual geometric observations contain meaningful semantic information but are insufficient to determine semantic body membership independently.

The current evidence suggests that semantic regions emerge from the interaction of multiple observations rather than from any single geometric property.

Strategic Decision

The Reduction Laboratory intentionally returns its focus to the primary project objective.

The purpose of the Reduction Lab is not to develop a complete scientific theory of perception.

Its purpose is to discover only the perceptual knowledge that directly improves the visual construction of the Art2all Peace Dove.

Future research will therefore continue to follow the principle:

Project First. Science Second.

Research serves the product.

It is not the product itself.

#####################################################################


################################################################
Research Log

Sprint R6.4

Visual Organization Grammar

Status

Research Direction

Background

Sprint R6.3 demonstrated that individual geometric observations
such as Axis Distance or Surface Orientation contain meaningful
semantic information, but are not sufficient to explain the
perceptual organization of the Peace Dove.

This shifted the research focus away from isolated geometric
properties towards the organization of children's drawings.

Research Question

Which visual organization principles transform thousands of
independent children's drawings into one coherent Peace Dove?

Observation

The reference model demonstrates that perception is preserved
not only through geometry, but through the organization of
individual paper elements.

Current observations indicate that several independent
organization principles cooperate simultaneously.

Preliminary Organization Principles

Flow

The children's drawings follow a common local movement.

Flow does not describe identical orientation.

Flow describes a shared visual direction.

------------------------------------------------------------

Overlap

Paper overlap creates continuous feather-like structures.

The overlap is not constant.

It adapts to the semantic region of the dove.

------------------------------------------------------------

Density

Visual density is not globally uniform.

Each semantic region appears to possess its own characteristic
visual density.

Examples include:

- Head
- Body
- Wing
- Tail

Density therefore represents semantic visual weight rather than
simple element count.

------------------------------------------------------------

Research Hypothesis

Perception of the Art2all Peace Dove emerges from the interaction
between Semantic Observations and Visual Organization Rules.

Neither semantic observations alone nor geometric placement alone
appear sufficient.

Current Working Model

Reference Model
        │
        ▼
Semantic Observations
        │
        ▼
Visual Organization Grammar
        │
        ▼
Paper Placement
        │
        ▼
Art2all Peace Dove

Current Status

Active Research

Future Work

Continue identifying additional organization principles and
validate each independently before transferring them into the
future Organization Engine.

Research Principle

Project First.
Science Second.

Research serves the visual construction of the Art2all Peace Dove.