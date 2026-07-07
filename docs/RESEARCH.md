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

PoC 01
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

PoC 02
Hypothese

Die Guide Silhouette
organisiert die Paper.

Status

In Arbeit.

Neues Forschungsziel

Die Engine konstruiert die Friedenstaube nicht.

Die Engine extrahiert die minimale Wahrnehmungsstruktur einer bereits vorhandenen Friedenstaube.

Neue Grundannahme

Das GLB ist keine Vorlage.

Es ist bereits die vollständige Lösung.

Unsere Aufgabe besteht lediglich darin, die Informationen zu reduzieren.

Nicht zufällig.

Sondern entsprechend der menschlichen Wahrnehmung.

Neue Forschungsfrage

Nicht:

Wie erzeugen wir eine Primary Gesture?

Sondern:

Welche Linien des Raumgitters bilden gemeinsam die Primary Gesture?

Das ist ein entscheidender Unterschied.

Die Gesture wird gefunden, nicht erfunden.

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