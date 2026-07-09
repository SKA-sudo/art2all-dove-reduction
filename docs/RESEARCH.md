################################################################
# Art2all – REASEARCH
################################################################

REASEARCH

Version: 1.0

Status: Living Document


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################


1. Teil 1
- Header
- Research Methodology
- Timeline
- PoC01
- PoC02
2. Teil 2
- R4.7
- R4.8
- Perception State Hypothesis
- P-001
3. Teil 3
- Semantic Migration
- Knowledge Graph Observation
- Current Semantic Knowledge
- Project Transfer
- Schlusskapitel

1. Research Methodology

Implementation
        ↓
Observation
        ↓
Hypothesis
        ↓
Evaluation
        ↓
Architecture

Darunter kurz erklären:

Architecture is discovered through implementation.
Implementation First. Speculation Second.
Research supports the product.
The product remains the primary objective.

2. Timeline of Discoveries (Milesones)

- PoC01
- PoC02
- R4.7
- R4.8
- P-001
- Semantic Migration
- Knowledge Graph Hypothesis


3. Validated Research Results

- Outline
- Observation
- Evidence
- Conclusion
- Perception State
- Observation
- Evidence
- Conclusion
- Semantic Migration
- Observation
- Evidence
- Conclusion


## PoC 01
Hypothese

Kann die bestehende Pipeline
Paper kontrolliert auf
einem Flügel platzieren?

Ergebnis

Ja.

Erkenntnis

Das Problem ist nicht
die Orientierung.

Das Problem ist die
Organisation.

--

## PoC 02
Hypothese

Die Guide Silhouette
organisiert die Paper.

# Status
In Arbeit.

# Neues Forschungsziel
- Die Engine konstruiert die Friedenstaube nicht.
- Die Engine extrahiert die minimale Wahrnehmungsstruktur einer bereits vorhandenen Friedenstaube.
# Neue Grundannahme
- Das GLB ist keine Vorlage.
- Es ist bereits die vollständige Lösung.
Unsere Aufgabe besteht lediglich darin, die Informationen zu reduzieren.
Nicht zufällig.
Sondern entsprechend der menschlichen Wahrnehmung.
# Neue Forschungsfrage
Nicht:
- Wie erzeugen wir eine Primary Gesture?
Sondern:
- Welche Linien des Raumgitters bilden gemeinsam die Primary Gesture?
- Die Gesture wird gefunden, nicht erfunden.

Dasselbe könnte später für die Flow Curve oder andere Organisationslinien gelten.

Neue Engine-Philosophie
Statt:
Mesh
↓
Gesture erzeugen
↓
Flow erzeugen
↓
Wing Finger Curves

denken wir künftig:

GLB
↓
Perceptual Line Extraction
↓
Line Reduction
↓
Perceptual Core
↓
Organisation der Papierflächen



5. Current Semantic Knowledge

Current Status
# WholeDove
- HAS_OBSERVATION
- HAS_FACE_CENTERS
- HAS_BODY_CENTER
- HAS_PRIMARY_GESTURE
- HAS_OUTLINE
- HAS_SURFACE_NORMALS
- PaperField
- HAS_RELATIONSHIP_FORCES
- LeftWing
- HAS_WING_FINGER_CURVES


6. Emerging Semantic Structure

WholeDove
        │
        ├──── HAS_LEFT_WING ─────► LeftWing
        │
        └──── HAS_PAPER_FIELD ───► PaperField

LeftWing
        │
        └──── HAS_WING_FINGER_CURVES

PaperField
        │
        └──── HAS_RELATIONSHIP_FORCES

7. Project Transfer


Reduction Lab
↓
Validated Semantic Rule
↓
Visual Mapping
↓
Art2all Engine
↓
Peace Dove


Current implementation suggests that SemanticObservations may naturally evolve into a semantic knowledge graph.

Every validated research result must identify its future visual contribution to the Art2all prototype.

################################################################
#####################follow text need modify###########################################
################################################################
Research R4.7
Animated Semantic Perception
################################################################

## Observation

The first Perception Point Cloud experiments suggested that semantic
representation can be extracted from static mesh geometry.

During the implementation of animated perception experiments an important
observation was made.

The visual Outline Layer automatically follows the animated dove because
it operates directly on the animated SkinnedMesh.

The Semantic Point Cloud remains static because it is extracted only once
from the original mesh geometry.

This demonstrates that semantic extraction currently ignores the animated
perception state.

---

## Research Question

Should semantic perception be extracted from

- static geometry

or

- the animated SkinnedMesh?

---

## Hypothesis

Human perception does not rely exclusively on static spatial information.

Motion itself may represent semantic information.

Semantic extraction should therefore operate on the animated perception
state whenever perception experiments require temporal analysis.

---

## Expected Impact

If validated,

future perception algorithms should analyse animated semantic structures
instead of static geometry.

This would allow the Perception Engine to study

- motion
- temporal perception
- semantic stability
- recognition during movement

instead of analysing only static spatial relationships.

################################################################
Research R4.8
Perception State
################################################################

## Observation

During the implementation of the Animated Semantic Extraction experiments,
an important architectural limitation became visible.

The current extractors operate directly on scene geometry.

However, different perception layers already operate on different
representations of the same dove.

The Outline Layer follows the animated SkinnedMesh automatically.

The Semantic Extractor currently samples geometry directly.

This revealed that the current engine has no explicit representation of the
current perceptual state.

Instead, every extractor decides individually which representation it uses.

---

## New Research Question

Should semantic extractors operate directly on scene objects,

or

should they operate on a unified Perception State?

---

## Hypothesis

Human perception does not analyse isolated geometry.

It analyses the complete observable state of an object.

The engine should therefore establish a unified Perception State before any
semantic extraction takes place.

Extractors should analyse this Perception State rather than directly
accessing scene geometry.

---

## Expected Impact

If validated,

the Perception State becomes the common input for all future extractors.

Possible perception information includes

- geometry
- animated pose
- skeleton deformation
- world transformation
- future observable perception attributes

This separates

observable perception

from

semantic interpretation.

Future extractors become independent from the underlying rendering
implementation.


################################################################
Perception State Hypothesis
################################################################

Art2all entwickelt keine Engine zur Organisation von Bildern.

Art2all entwickelt eine Perception Engine, die die menschliche
Gesamtwahrnehmung auch bei massiv wachsender visueller Komplexität erhält.

Semantik könnte nicht nur aus Struktur bestehen, sondern auch aus Verhalten.

Die Friedenstaube besitzt Zustände:

Sleeping
↓
Dreaming
↓
Awakening
↓
Awake
↓
Flying

Vielleicht erkennt das Gehirn nicht nur

- Kopf
- Flügel
- Körper

sondern auch

- wie sich der Flügel öffnet
- wie der Körper ruhig bleibt
- wie der Hals führt
- wie die Silhouette atmet

Dann ist Bewegung keine Animation.

Sie ist Information.

Jede Kernklasse der Perception Engine muss einen Begriff der Wahrnehmung repräsentieren – keinen Begriff der Implementierung.

Architecture is discovered through implementation, not speculation.
Implementation First. Speculation Second.



## Perception Hypothesis P-001
# Observation

During an informal perception discussion, a semantic point representation of the dove produced uncertain recognition.

Typical responses included:

"Could be a dove."

"Maybe a pigeon, a blackbird, or a chicken."

In contrast, minimal outline representations of birds were recognized immediately despite containing significantly less visual information.

Hypothesis

The visual outline is likely one of the strongest semantic carriers of object identity.

The human visual system appears to establish object identity primarily from the outline before integrating additional semantic information such as gesture, body regions, or local details.

Proposed Validation

Future reduction experiments should compare recognition performance of:

semantic point representations
outline only
primary gesture only
outline + primary gesture
outline + semantic points
full semantic model

The objective is to determine the perceptual contribution of each semantic observation to stable object recognition.

Current Evidence

Status:
Initial observation

Evidence:

- Coffee Meeting (human observer)
- Sparse semantic point representation produced uncertain recognition.
- Minimal outline produced immediate recognition.
- Formal reduction experiments pending.


## Research Observation – Semantic Knowledge emerges from Implementation

### Status

During the semantic migration of the Perception Engine, a significant observation emerged.

The objective of the current sprint was not to design a semantic architecture, but simply to migrate existing engineering algorithms into truthful `SemanticObservation` objects.

The resulting observations are now:

* WholeDove → HAS_OBSERVATION
* WholeDove → HAS_FACE_CENTERS
* WholeDove → HAS_BODY_CENTER
* WholeDove → HAS_PRIMARY_GESTURE
* WholeDove → HAS_OUTLINE
* WholeDove → HAS_SURFACE_NORMALS
* PaperField → HAS_RELATIONSHIP_FORCES
* LeftWing → HAS_WING_FINGER_CURVES


WholeDove
        │
        ├──────── HAS_LEFT_WING ───────► LeftWing
        │
        ├──────── HAS_RIGHT_WING ─────► RightWing
        │
        └──────── HAS_PAPER_FIELD ────► PaperField

LeftWing
        │
        └──────── HAS_WING_FINGER_CURVES

PaperField
        │
        └──────── HAS_RELATIONSHIP_FORCES

### Observation

The collection of semantic observations no longer behaves like a flat list of extracted properties.

Instead, it naturally begins to form a structured semantic knowledge representation consisting of multiple semantic entities (WholeDove, PaperField, LeftWing) and their validated semantic properties.

This behavior was not designed in advance.

It emerged directly from the implementation process.

### Research Hypothesis

Future evaluation should investigate whether the semantic migration process naturally evolves into a semantic knowledge graph rather than requiring an explicitly designed ontology.

This is currently a research hypothesis and not yet a validated architectural decision.

### Project Reminder

The Reduction Lab is not the final product.

Its purpose is to discover validated semantic rules that can later be transferred into the Art2all Engine.

Research is therefore always evaluated against one additional question:

**Does this discovery bring the visual Art2all prototype closer to a Peace Dove that organically grows from children's drawings?**

Only validated knowledge with a clear visual application should leave the Reduction Lab and become part of the product.


During the semantic migration of the Perception Engine, the growing collection of SemanticObservation objects no longer behaves like a flat list of extracted features. Instead, it begins to form a structured semantic knowledge representation.

At the current stage this appears as a set of independent semantic statements. Future evaluation should investigate whether these observations naturally evolve into a semantic knowledge graph rather than requiring an explicitly designed ontology.

This hypothesis emerged from implementation work rather than being specified in advance.

It may be that the SemanticObservation isn't the ultimate goal at all. It is the Atom.
Relationships could develop from it later:


Das außergewöhnliche ist, das viele Forschungsprojekte mit einer Theorie beginnen und suchen anschließend Belege. Bei Art2all bildet sich ein anderer Weg heraus:

Implementierung → Beobachtung → Hypothese → Evaluation → Architektur        