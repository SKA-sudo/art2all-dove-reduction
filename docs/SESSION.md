# AI_START (VERPFLICHTEND)

# AI_START

Read first:

1. ../art2all/docs/FOUNDATION.md
2. ../art2all/docs/SESSION.md
3. this repository's docs/SESSION.md

This file only extends the global Art2all documentation.
It does not override global project decisions.

## 1. FOUNDATION

Lies zuerst vollständig:

* FOUNDATION.md
* SESSION.md

Diese Dokumente haben Vorrang vor allen neuen Ideen.

GLB als Lernmodell.
Beziehungsregeln daraus ableiten.
Prüfen, ob dieselbe Wahrnehmung ohne GLB entsteht.
Wir brauchen also drei Ebenen:

Zusammenarbeit
Entwicklungspartner

Art2all wird von einer einzelnen Person entwickelt.

ChatGPT unterstützt als technischer Entwicklungspartner, ersetzt aber kein Entwicklerteam.

Deshalb müssen alle Vorschläge zu einem Einzelentwickler passen.

Das bedeutet:

kleine, abgeschlossene Sprints
sichtbare Ergebnisse
keine unnötigen Refactorings
keine Aufgaben, die ein Team voraussetzen
pragmatische Lösungen statt theoretischer Perfektion
Rollen

Stephan

Vision
Künstler
Architektur
wissenschaftliche Richtung
Priorisierung
finale Entscheidungen

ChatGPT

Architektur konsequent umsetzen
vorhandene Builder erweitern
Code schreiben
Bugs analysieren
kleine, überprüfbare Entwicklungsschritte liefern

Während eines Sprints gilt:

Die Architektur ist beschlossen. Ich implementiere sie jetzt.

Neue Architektur oder neue Ideen werden nicht während der Implementierung eingeführt.

Wichtigste Regel

Stephan ist kein Entwicklungsteam.

Antworten dürfen niemals davon ausgehen, dass mehrere Entwickler vorhanden sind.

Jede Aufgabe muss so geplant werden, dass sie von einer einzelnen Person mit Unterstützung von ChatGPT umgesetzt werden kann


1. Grundraster
   = räumlicher Orientierungsraum

2. Beziehungsnetz
   = Kinderbilder beeinflussen sich gegenseitig

3. Wahrnehmung
   = daraus erscheint die Taube


Decision:

Art2all is product-driven.

Research is performed only when it directly improves the product or the current sprint.

Priority:
1. Visible product progress
2. Architecture
3. Research only as an enabler

Product First
Every sprint must produce visible progress toward the final Art2all experience. Research is valuable only when it directly enables or improves the current product goal.

## Repository

Current Repository:
art2all

Current Branch:
dev

Workspace:
art2all-workspace

Current Focus:
Sprint 10 – Perceptual Reduction

Research Repository:
art2all-dove-reduction

Status:
Workspace restructured.
Main/dev strategy established.
Technical Dove Model completed.

Workflow:
Alle Entwicklungen erfolgen auf dev.
Nur abgeschlossene Sprints werden per Pull Request nach main übernommen.


## Repository Roles

art2all
Product development

art2all-dove-observation
Observation Lab

art2all-dove-reductions
Perceptual Reduction Lab

Development Flow

Observation Lab
↓

Reduction Lab

↓

validated perception rule

↓

Art2all Development

Research repositories never contain product code.

The product repository never contains experimental research.

Only validated perception rules are transferred into the product.

---

## Research Workflow (ab Sprint 10)

Mit Sprint 10 beginnt die Forschungsphase der Art2all Engine.

Um Forschung und Produktentwicklung klar voneinander zu trennen, werden drei eigenständige Repositories verwendet.

# AI_START

Read documentation in this order:

1. ../art2all/docs/FOUNDATION.md
2. ../art2all/docs/SESSION.md
3. this SESSION.md

This document extends the global Art2all documentation.
It never overrides the global project documentation.

---

# Repository

Repository:
 

Purpose:

The Reduction Lab is a dedicated research environment for perceptual reduction experiments.

Its purpose is to identify which spatial information can be removed while preserving human recognition of the dove.

The repository never contains product features.

The repository never modifies the Art2all product.

Only validated perception rules will later be transferred back into the product repository.

---

# Current State

Sprint:
R1

Status:

Repository created.

No reduction environment exists yet.

---

# Current Goal

Create an independent laboratory for reduction experiments.

The first sprint prepares the environment only.

No reduction algorithms are implemented.

No perception rules are evaluated.

---

# Next Sprint

# Session Update

## Sprint R3.2 – Semantic Spatial Space (SSS)

### Research Breakthrough

Today's work fundamentally changed the research direction of the Reduction Lab.

The initial research question was:

> How much geometric information can be removed while preserving recognition?

During the discussion it became clear that this question is incomplete.

The actual research target is not geometry.

It is perception.

Geometry is only one possible representation.

The Reduction Lab therefore shifts its focus from **geometric reduction** towards **semantic relationships**.

---

### New Research Hypothesis

A bird is not recognized because of its geometry.

A bird is recognized because a minimal set of semantic relationships is perceived.

The objective of future reduction experiments is therefore no longer to identify minimal geometry, but to identify the smallest stable set of semantic relationships that consistently produces the perception of a bird.

---

### Important Observation

Simple bird symbols, children's drawings and highly detailed 3D models can all produce the same perception.

Likewise, humans can recognize birds, faces or animals in clouds, rocks, trees and many other natural structures.

This suggests that perception is largely independent of the underlying material.

Material, geometry and rendering are carriers of perceptual information rather than the object itself.

---

### Consequence for the Reduction Lab

Future experiments will compare different representations instead of reducing only the Technical Dove Model.

Candidate representations include:

- Technical Dove Model
- Children's drawings
- Simplified bird symbols
- Line drawings
- Logos
- Natural accidental shapes (clouds, rocks, trees)

Only semantic relationships that remain stable across different representations may become perception rules for the Art2all Engine.

---

### Working Principle

The Reduction Lab no longer searches for the smallest geometry.

It searches for the smallest stable semantic relationship network that produces a unique perception.

This marks the transition from geometric reduction to perception-driven research.