################################################################
# Art2all – Decisions
################################################################

Version: 1.0

Status: Living Document

Autor:
Stephan Kästner
mit Unterstützung von ChatGPT

################################################################
################################################################


Core Principles

1. Wahrnehmung vor Technik
2. Wirkung vor Optimierung
3. Machbarkeit durch Proof of Concept
4. Algorithmus aus der Wahrnehmung ableiten
5. Builder entstehen aus validierten Wahrnehmungshypothesen


################################################################
Decision 0001 – One World – One Peace Dove
################################################################

Status:
✅ Accepted

Datum:
25.06.2026

Decision

Alle Kinderzeichnungen bilden gemeinsam eine einzige Welttaube.

Länder dürfen sichtbar sein,
dürfen jedoch niemals miteinander konkurrieren.

Warum?

Frieden verbindet und trennt nicht.

Auswirkungen

- Keine Konkurrenz zwischen Ländern
- Eine gemeinsame Weltgeschichte
- Länder bleiben als Beitrag sichtbar


################################################################
Decision 0002 – Hall of Peace
################################################################

Status:
✅ Accepted

Decision

Erwachte Tauben werden niemals gelöscht.

Jede neue Generation beginnt mit einer schlafenden Taube.

Warum?

Jede Generation soll ihre eigene Geschichte erzählen.

Auswirkungen

- Dauerhafte Friedensgeschichte
- Generationenübergreifendes Wachstum
- Vereinfachte langfristige Architektur


################################################################
Decision 0003 – Story First
################################################################

Status:
✅ Accepted

Decision

Technische Entscheidungen werden immer anhand
der Geschichte bewertet.

Story bestimmt Architektur.
Nicht umgekehrt.


################################################################
Decision 0004 – One PoC = One Hypothesis
################################################################

Status:
✅ Accepted

Decision

Jeder Proof of Concept beantwortet genau
eine Wahrnehmungshypothese.

Komplexe Fragestellungen werden in mehrere
kleine, validierbare Hypothesen zerlegt.

Dadurch bleibt jede Entscheidung nachvollziehbar.


################################################################
Decision 0005 – Guide Silhouette
################################################################

Status:
✅ Accepted

Decision

Die Paper folgen nicht der Mesh-Triangulierung.

Sie folgen einer wahrgenommenen
Guide Silhouette.

Die visuelle Organisation besitzt Vorrang
vor der technischen Geometrie.


################################################################
Decision 0006 – Visual Hierarchy determines the Engine
################################################################

Status:
✅ Accepted

Decision

Die Reihenfolge menschlicher Wahrnehmung
bestimmt die Reihenfolge der Engine.

Nicht die Geometrie bestimmt die Architektur,
sondern die visuelle Wahrnehmung.


################################################################
Decision 0007 – Canonical Perception Space &
Perception Laboratory
################################################################

Status:
✅ Accepted

Decision

Die Art2all Perception Engine wird künftig
in zwei klar getrennte Ebenen unterteilt.

1. Canonical Perception Space

Der Canonical Perception Space definiert den
einzigen gültigen Koordinatenraum der
Wahrnehmungsengine.

Alle Wahrnehmungshypothesen arbeiten
ausschließlich innerhalb dieses Raumes.

2. Perception Laboratory

Das Perception Laboratory ist die
wissenschaftliche Entwicklungsumgebung
der Perception Engine.

Hier werden Wahrnehmungshypothesen
entwickelt,
visualisiert,
getestet,
verglichen
und validiert.

Builder werden niemals direkt
aus der Geometrie entwickelt.

Builder entstehen ausschließlich
aus zuvor validierten
Wahrnehmungshypothesen.


----------------------------------------------------------------
Motivation
----------------------------------------------------------------

Während Sprint R4 wurde deutlich,
dass Rendering,
Geometrieanalyse,
Debugging
und Wahrnehmungsalgorithmen
zu stark miteinander gekoppelt waren.

Dies führte zu unnötiger Komplexität,
Transformationsproblemen
und inkonsistenten Koordinatenräumen.

Durch die Einführung eines
Canonical Perception Space
und eines eigenständigen
Perception Laboratory
werden Wahrnehmung,
Forschung,
Implementierung
und Rendering
klar voneinander getrennt.


----------------------------------------------------------------
Human Perception Principle
----------------------------------------------------------------

Die Art2all Perception Engine orientiert sich
an der Reihenfolge menschlicher Wahrnehmung.

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

Diese Reihenfolge bildet künftig
die Grundlage aller
Wahrnehmungshypothesen.

Die Engine entwickelt Algorithmen
nicht aus Geometrie,
sondern aus menschlicher Wahrnehmung.


----------------------------------------------------------------
Canonical Workflow
----------------------------------------------------------------

Target Image

↓

Human Visual Perception

↓

Perception Laboratory

↓

Validated Hypothesis

↓

Algorithm

↓

Builder

↓

Production Engine


----------------------------------------------------------------
Consequences
----------------------------------------------------------------

- Ein gemeinsamer Canonical Perception Space

- Klare Trennung zwischen
  Rendering und Wahrnehmung

- Reproduzierbare
  Wahrnehmungshypothesen

- Builder entstehen ausschließlich
  aus validierten
  Wahrnehmungshypothesen

- Neue Wahrnehmungsebenen können
  unabhängig entwickelt werden

- Wissenschaftlich nachvollziehbare
  Entwicklung der Perception Engine

- Wahrnehmung steht dauerhaft
  vor Implementierung

  ################################################################
Decision R4.8
Perception State
################################################################

Status:
Accepted

Motivation

Animated Semantic Perception demonstrated that different perception layers
already depend on different representations of the reference model.

Allowing every extractor to choose its own source representation would
introduce inconsistent semantic behaviour.

Decision

Before semantic extraction, the engine defines one unified
Perception State.

Extractors no longer conceptually operate on isolated geometry.

They operate on the current observable perception state.

Consequences

- unified extractor interface

- reproducible perception experiments

- animated and static perception become interchangeable inputs

- rendering implementation remains separated from semantic extraction


Decision R8.1 – Semantic Regions expose surface orientation

Semantic Regions must expose not only semantic positions (center) but also local surface orientation (normal). Production components must consume semantic surface information instead of reconstructing orientation independently.


################################################################
Decision R8.1
Semantic Surface Contract
################################################################

Status

Accepted

Motivation

Semantic regions originally exposed only semantic positions.

Production components therefore had to reconstruct local surface
orientation independently.

This duplicated semantic knowledge and violated the architecture
defined by the Perception API.

Decision

Every semantic region shall expose semantic surface information.

Minimum contract

- faces
- center
- normal

Production components consume semantic surface information.

They never reconstruct semantic orientation independently.

Consequences

- unified semantic region interface

- reusable surface information

- direct connection between
  Perception Engine and Production Engine

- future semantic regions automatically become production-ready
  once the semantic contract is fulfilled


  ## Decision 0010

Title:
Semantic Surface is renderer independent.

Decision:

The Semantic Surface shall never contain rendering
knowledge.

It represents the semantic description of a surface.

Rendering systems like Paper, Light, Motion or Interaction
consume the Semantic Surface but never become part of it.

Status:
Accepted

## Decision 0011

Title

Semantic Surface Analysis precedes Semantic Behaviour.

Decision

Semantic Surface properties shall first be measured,
visualized and validated before they influence any
rendering or behavioural systems.

Metrics are observational by default.

Only validated metrics may later become inputs for

- Paper placement
- Paper size
- Motion
- Light
- Interaction
- Awakening

Status
Accepted