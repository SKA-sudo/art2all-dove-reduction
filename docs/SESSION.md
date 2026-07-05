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

################################################################
# Session R4.4 – Canonical Perception Space
################################################################

## Ziel

Architektonische Neuausrichtung der Perception Engine.

Während der Entwicklung wurde deutlich, dass Rendering, Debugging,
Geometrieanalyse und Wahrnehmung bisher zu stark miteinander vermischt
waren.

Der Schwerpunkt dieser Session lag deshalb auf der Definition einer
sauberen Wahrnehmungsarchitektur.

----------------------------------------------------------------

## Technischer Fortschritt

- Trennung zwischen Originalmodell und Perception Model begonnen.
- Rotes Wireframe-Modell als zukünftiges Wahrnehmungsmodell etabliert.
- Analyse der Transformationsprobleme durchgeführt.
- Ursache identifiziert:
  Unterschiedliche Koordinatenräume führten zu inkonsistentem Verhalten
  zwischen Rendering und Wahrnehmungsengine.

----------------------------------------------------------------

## Neue Architektur

Die bisherige Architektur

GLB
↓

Builder
↓

Debug

wird künftig ersetzt durch

GLB
↓

Canonical Perception Space
↓

Perception Laboratory
↓

Validierte Wahrnehmungshypothesen
↓

Builder
↓

Production Engine

----------------------------------------------------------------

## Neue Erkenntnis

Das rote Modell ist kein Debugmodell.

Es bildet künftig das Perception Laboratory.

Dort werden sämtliche Wahrnehmungshypothesen sichtbar gemacht,
untersucht und validiert.

Erst nach erfolgreicher Validierung werden daraus produktive Builder
abgeleitet.

----------------------------------------------------------------

## Beobachtung zur menschlichen Wahrnehmung

Während der Beobachtung realer Vögel entstand folgende
Wahrnehmungshierarchie:

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

Diese Reihenfolge bildet künftig die Grundlage der
Art2all Perception Engine.

Die Engine orientiert sich nicht an der Meshstruktur,
sondern an der Reihenfolge menschlicher Wahrnehmung.

----------------------------------------------------------------

## Architekturentscheidung

Canonical Perception Space

Der Canonical Perception Space definiert künftig den
einzigen gültigen Koordinatenraum der Wahrnehmungsengine.

Alle zukünftigen Wahrnehmungshypothesen arbeiten ausschließlich
innerhalb dieses Raumes.

Dadurch werden Rendering, Debugging und Wahrnehmung klar voneinander
getrennt.

----------------------------------------------------------------

## Nächster Sprint

Sprint R4.5

Canonical Perception Space

Ziele:

- Definition des Canonical Origin
- Definition der Canonical Orientation
- Definition der Canonical Scale
- Definition der Canonical Bounds
- Aufbau des Perception Laboratory
- Einführung eines Layer-Systems für Wahrnehmungshypothesen
- Vorbereitung der ersten validierten Hypothese (Outline)

Keine Erweiterung der Wahrnehmungsalgorithmen,
bevor der Canonical Perception Space vollständig definiert ist.