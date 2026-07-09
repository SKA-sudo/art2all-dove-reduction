################################################################
# Art2all – Roadmap
################################################################


Version: 1.0

Status: Living Document

Letzte Aktualisierung: 25.06.2026

Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################

# Entwicklungsprozess



PoC 01 ✅

Pipeline validiert
PoC 02

Anchor Detection
PoC 03

Guide Silhouette
PoC 04

Primary Paper Fields


Vision

↓

Wahrnehmung

↓

Wirkung

↓

Machbarkeitsanalyse
(Prototyp)

↓

Erkenntnis

↓

Algorithmus

↓

Implementierung

↓

Optimierung

--

# Entwicklungs-Kompass

1.
Wahrnehmung

↓

2.
Wirkung

↓

3.
Machbarkeitsanalyse

↓

4.
Erkenntnis

↓

5.
Algorithmus

↓

6.
Code



## New Roadmap

# Phase 1 
Semantic Migration
- bestehende Algorithmen.

Builder

↓

Semantic Observation

Das machen wir gerade.

# Phase 2
Semantic Knowledge
Aus einzelnen Observations entsteht Wissen.

- WholeDove
- HAS_BODY_CENTER
- HAS_PRIMARY_GESTURE
- HAS_OUTLINE
..
- LeftWing
HAS_WING_FINGER_CURVES
...
- PaperField
HAS_RELATIONSHIP_FORCES

# Phase 3
Nicht mehr:

Builder

↓

Renderer

sondern

Semantic Observation

↓

Visual Rule

Das ist etwas völlig anderes.

Beispiel:

HAS_WING_FINGER_CURVES

↓

Zeichne 5 Führungsbahnen

oder

HAS_RELATIONSHIP_FORCES

↓

Paper reagieren auf Nachbarn

oder

HAS_PRIMARY_GESTURE

↓

Grundrichtung der Federbänder
Plötzlich verschwindet der Builder
Die Builder sind gar nicht das Endziel.
Sie waren notwendig, um die Regeln zu entdecken.
Später könnte die Engine viel eher so aussehen:

Semantic Knowledge

↓

Visual Mapping

↓

Rendering
Das erinne