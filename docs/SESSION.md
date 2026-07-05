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

################################################################
# Session R4.3 – Perception Laboratory
################################################################

## Ziel

Neuausrichtung der Perception Engine.

Der Fokus liegt nicht mehr auf einzelnen Debug-Linien, sondern auf dem Aufbau
eines eigenständigen Perception Laboratory zur Validierung visueller
Wahrnehmungshypothesen.

---

## Technischer Fortschritt

- Originalmodell und Perception Model voneinander getrennt.
- Rotes Wireframe-Modell als zukünftiges Wahrnehmungsmodell definiert.
- Erste Architekturtrennung zwischen Rendering und Perception begonnen.
- Umfangreiche Analyse der Transformationsräume durchgeführt.
- Erkenntnis:
  Das bisherige Vermischen von Rendering, Analyse und Debug erschwerte die
  Weiterentwicklung der Wahrnehmungsengine.

---

## Architekturentscheidung

Das rote Modell ist kein Debugmodell.

Es ist das zukünftige Perception Laboratory.

Dieses dient ausschließlich der Entwicklung und Validierung von
Wahrnehmungshypothesen.

Erst validierte Hypothesen werden später in produktive Builder übernommen.

---

## Neue Erkenntnis

Während der Beobachtung realer Vögel entstand folgende Wahrnehmungshierarchie:

Presence

↓

Silhouette / Outline

↓

Characteristic Recognition

↓

Structural Recognition

↓

Dynamic Behaviour

↓

Surface Details

Diese Reihenfolge bildet künftig die Grundlage der Art2all
Perception Engine.

Nicht die Geometrie bestimmt den Algorithmus,
sondern die menschliche Wahrnehmung.

---

## Konsequenz

Die bisherige Reihenfolge

Mesh
→ Faces
→ Builder

wird langfristig ersetzt durch

Target Image
→ Human Perception
→ Perception Laboratory
→ Validierte Hypothese
→ Algorithmus
→ Builder
→ Produktionsengine

---

## Nächster Sprint

Sprint R4.4

Perception Laboratory

Ziele:

- Aufbau einer eigenständigen PerceptionModel-Komponente
- Layer-System für Wahrnehmungshypothesen
- Toggle-System
- Trennung zwischen Rendering Engine und Perception Engine
- Vorbereitung der ersten validierbaren Wahrnehmungshypothesen

Keine neuen Wahrnehmungsalgorithmen,
bevor das Labor vollständig aufgebaut ist.