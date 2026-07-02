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

## Sprint R2 – Interactive Reduction Baseline

### Status

Sprint R2 wurde erfolgreich begonnen.

Die Baseline des Reduction Labs wurde aus dem Art2all-Repository wiederhergestellt und auf dem `dev`-Branch stabilisiert.

Die Git-Struktur wurde bereinigt, alle Änderungen sind committed und auf `origin/dev` veröffentlicht.

---

## Erreichte Meilensteine

- Restore Baseline erfolgreich abgeschlossen
- Reduction Lab startet wieder stabil
- OrbitControls integriert
- Drehen funktioniert
- Zoomen funktioniert
- Feste lokale Ports definiert

5173 → Art2all (Produkt)

5174 → Observation Lab

5175 → Reduction Lab

---

## Neue Erkenntnisse

Das Mesh ist ausschließlich interne Datenquelle.

Die spätere Forschung untersucht nicht das Mesh selbst, sondern die Wahrnehmungsstruktur der Taube.

Deshalb muss das Reduction Lab auch dann vollständig navigierbar bleiben, wenn das Mesh ausgeblendet oder Linien reduziert werden.

Die Kamera ist Bestandteil des Forschungssystems und nicht lediglich eine Viewer-Funktion.

---

## Arbeitsprozess

Heute wurde der Entwicklungsworkflow deutlich verbessert.

Neuer Standard:

1. FOUNDATION.md lesen
2. SESSION.md lesen
3. Projektstand zusammenfassen
4. Sprintziel bestätigen
5. Erst danach implementieren

Zusätzlich wurde die Zusammenarbeit zwischen Mensch, ChatGPT und Codex weiter präzisiert.

MI (Menschliche Intelligenz)
→ Vision, Wahrnehmung, Entscheidungen

AKI (Architektur-KI / ChatGPT)
→ Architektur, Sprintplanung, präzise Arbeitsaufträge

IKI (Implementierungs-KI / Codex)
→ Umsetzung und Code

Die Erfahrung aus Sprint R2 zeigt deutlich:

Präzise Arbeitsaufträge führen zu reproduzierbaren Ergebnissen und sparen Entwicklungszeit.

---

## Nächster Schritt

Sprint R2 wird fortgesetzt.

Nächste Aufgabe:

Implementierung der Kamerarücksetzung.

Taste:

R

setzt jederzeit exakt dieselbe Ausgangsansicht wieder her.

Dabei werden zurückgesetzt:

- Kameraposition
- OrbitControls Target
- Zoom
- Controls Update

Diese Funktion bildet die Grundlage für reproduzierbare Wahrnehmungsanalysen in allen zukünftigen Reduktionsstufen.

---

## Danach

Erst nach Abschluss der Kamera- und Anzeigeverwaltung beginnt Sprint R3:

Spatial Grid

Das Spatial Grid ist die erste sichtbare Wahrnehmungsabstraktion oberhalb des Meshes.

Noch keine Reduktionsalgorithmen.

Zunächst wird ausschließlich die räumliche Beziehungsstruktur sichtbar gemacht.

---

Ende der Session.