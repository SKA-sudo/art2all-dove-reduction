################################################################
# Art2all – Architecture Document
################################################################


Version: 1.0

Status: Living Document


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################


#   Art2all Engine – Master Architecture v1.0


                     Art2all

                        │

            ┌───────────┴────────────┐

        Foundation              Architecture

            │                        │

            ▼                        ▼

      Story Engine          Rendering Engine

                                     │

                          ┌──────────┴──────────┐

                     Peace Dove          Hall of Peace

                          │

          ┌───────────────┼────────────────┐

      Feather System   Detail System   Animation System

                          │

                    Feather Engine

                          │

        ┌─────────────────┼──────────────────┐

     Region Engine   Layout Engine   Allocation Engine

                          │

                Feather Cell Generator

                          │

                  Paper Renderer (R3F)


Local Dove Space

↓

Primary Dove Axis

↓

Local Wing Space

↓

Gesture

↓

Anchor

↓

Guide Shape

↓

Primary Papers

↓

Contour Papers

↓

Fill Papers


# Project Architecture
Beschreibt:

Art2all

│

├── Foundation
├── Backend
├── Frontend
├── Engine
├── Documentation

---

# Rendering Architecture

Beschreibt ausschließlich die Taube.

Peace Dove

│

├── Feather System
│
├── Detail System
│
├── Olive Branch
│
├── Animation System
│
└── Interaction System


## Ebene tiefer

Feather System

│

├── Region Analyzer

├── Feather Layout Engine

├── Placement Generator

├── Orientation Engine

├── Overlap Engine

└── Paper Renderer

---

# Allgemein

Idee
   │
   ▼
Vision
(Was soll der Besucher erleben?)
   │
   ▼
Konzept
(Welches Prinzip erzeugt dieses Erlebnis?)
   │
   ▼
Architektur
(Welche Komponenten brauchen wir?)
   │
   ▼
Implementierung
(Kleine, testbare Schritte)
   │
   ▼
Review
(Sieht es unserem Zielbild ähnlicher?)

---

# Neue Architektur
GLB

↓

Geometry Analysis

↓

Body Regions ⭐

↓

Feather Rows ⭐

↓

Placement Points ⭐

↓

Paper Orientation ⭐

↓

Paper Overlap ⭐

↓

Renderer


# Engine


Geometry Layer

↓

Region Analyzer

↓

Feather Generator

↓

Placement Generator

↓

Paper Renderer

# Zielbild


Peace Dove

├── Feather System (Kinderzeichnungen)
├── Detail System (Augen, Schnabel, Krallen)
├── Symbol System (Olivenzweig)
└── Animation System

->


## Kinderzeichnung

↓

wird Feder

↓

Feder gehört zu einer Federreihe

↓

Federreihe bildet einen Flügel

↓

Flügel bildet die Taube

---

GLB

liefert

- Oberfläche
- Normalen
- Volumen

Guide Shape

liefert

- Anordnung
- Proportion
- Wirkung


Architecture Milestone A1 – Perception Driven Engine
Status

Dieser Meilenstein markiert den Übergang von einer meshorientierten zu einer wahrnehmungsorientierten Engine.

Die GLB-Taube bleibt die geometrische Grundlage des Projekts. Sie definiert Volumen, Oberfläche und Normalen.

Die visuelle Organisation der Papierflächen entsteht jedoch nicht mehr aus der Mesh-Triangulierung, sondern aus einer eigenen semantischen Struktur.

Grundprinzip

Nicht die Geometrie bestimmt die Wirkung.

Die Wahrnehmung bestimmt den Algorithmus.

Die Engine rekonstruiert zunächst die visuell wahrgenommene Form und macht diese anschließend mit Papier sichtbar.

Architektur
GLB
│
├─ Oberfläche
├─ Normalen
└─ Volumen
        │
        ▼
Local Space
        │
        ▼
Gesture Line
        │
        ▼
Semantic Anchor Points
        │
        ▼
Guide Shape
        │
        ▼
Primary Paper Fields
        │
        ▼
Contour Papers
        │
        ▼
Fill Papers
        │
        ▼
Paper Renderer
Aufgaben der einzelnen Ebenen
Local Space

Erzeugt den lokalen Orientierungsraum eines Körperbereichs (z. B. linker Flügel).

Gesture Line

Beschreibt die Hauptrichtung der Form.

Beim linken Flügel:

Körper → Schulter → Flügelspitze

Semantic Anchor Points

Beschreiben die Proportionen der Form.

Nicht Meshpunkte, sondern bedeutungsvolle Orientierungspunkte.

Guide Shape

Erzeugt die unsichtbare Leitform.

Sie organisiert die späteren Papierflächen.

Primary Paper Fields

Die wenigen großen Papierflächen, welche die Form definieren.

Contour Papers

Erzeugen die sichtbare Silhouette.

Obere Flügelkante:
ruhig, elegant, nahezu geschlossen.

Untere Flügelkante:
gestaffelt, rhythmisch, erzeugt den Feder-Eindruck.

Fill Papers

Schließen die Fläche und unterstützen die bereits definierte Form.

Sie erzeugen die Form nicht.

Wichtigste Erkenntnis

Die GLB bestimmt nicht die Gestaltung.

Die GLB liefert ausschließlich die dreidimensionale Oberfläche.

Die Gestaltung entsteht aus einer wahrnehmungsorientierten Leitstruktur.

Entwicklungsregel

Jeder neue Builder folgt demselben Ablauf:

Referenz

↓

Hypothese

↓

Minimaler Builder

↓

Visuelle Debug-Ausgabe

↓

Künstlerische Validierung

↓

Erkenntnis

↓

Nächster Builder

Erst wenn eine Ebene verstanden und validiert ist, wird die nächste implementiert.

Ziel

Art2all soll nicht Papier auf einer Taube verteilen.

Art2all soll eine wahrgenommene Form rekonstruieren und diese Form mit den Zeichnungen der Kinder sichtbar werden lassen.


---

# Architecture Milestone A2 – Canonical Perception Space

## Status

Approved

---

## Motivation

During Sprint R4.3 (Visualize Primary Axis), the improved debug visualization revealed an important architectural insight.

The technical GLB scene, the extracted BufferGeometry and the perceptual relationships do not necessarily describe the same spatial representation.

This demonstrated that perceptual algorithms must not operate directly on raw mesh geometry.

Instead, every perception layer is built inside a dedicated Canonical Perception Space.

---

## Core Principle

The GLB is the technical source.

The Canonical Perception Space is the perceptual source.

All semantic relationships are derived from this canonical perception space rather than directly from the mesh.

---

## Architecture

GLB

↓

Canonical Perception Space

↓

Perception Laboratory

↓

Validated Hypotheses

↓

Engine Builders

↓

Rendering Engine

---

## Responsibilities

### GLB Scene

Provides the technical representation.

- mesh hierarchy
- topology
- normals
- geometry

---

### Canonical Dove Space

Defines the canonical spatial representation of the dove.

Independent from mesh implementation details.

---

### Canonical Perception Space

Defines the perceptual coordinate system.

All perception algorithms operate exclusively inside this space.

It contains:

- semantic reference points
- primary relationships
- perceptual distances
- perceptual orientation

It deliberately ignores technical mesh structure whenever it is not relevant for human perception.

---

## Design Rule

Never derive perception directly from BufferGeometry.

Always transform technical geometry into the Canonical Perception Space first.

Only then derive semantic relationships.

---

## Result

The engine is no longer geometry-driven.

The engine is no longer scene-driven.

The engine becomes perception-driven.

Technical geometry supplies data.

Perception defines structure.


################################################################
# Perception Engine
################################################################

################################################################
# Purpose
################################################################

The Perception Engine is one of the core engines of Art2all.

Its purpose is not object recognition.

Its purpose is to reproduce the way humans visually
organize information, so that the Peace Dove appears
to have naturally grown from thousands of children's
drawings.

Research is not the goal.

A better Peace Dove is the goal.

Scientific insights emerge as a positive consequence
of building the engine.


################################################################
# Core Principle
################################################################

The GLB provides geometry.

The Perception Engine provides meaning.

Rendering is no longer driven directly by geometry.

Rendering is driven by semantic understanding.


################################################################
# Architectural Principle
################################################################

Meaning never emerges from vertices or polygons.

Meaning emerges from semantic regions and the
relationships between them.


GLB

↓

Observation

↓

Semantic Extractors

↓

Semantic Observations

↓

Perception State

↓

Rendering


The runtime pipeline is therefore the semantic bridge
between technical geometry and visual rendering.


################################################################
# Runtime Architecture
################################################################

                    Observation
                         │
                         ▼
               Semantic Extractors
                         │
                         ▼
              Semantic Observations
                         │
                         ▼
                 Perception State
                         │
                         ▼
                  Rendering Engine


Each Extractor contributes exactly one semantic
hypothesis.

Each hypothesis can be visualized and validated
inside the Perception Laboratory.


################################################################
# Perception Hierarchy
################################################################

Attention

↓

Whole Dove

↓

Head

├── Eye

└── Beak

↓

Body

├── Wing

└── Tail


This hierarchy represents the current working
hypothesis of the perception engine.

It is expected to evolve during future research.


################################################################
# Semantic Regions
################################################################

The Perception Engine does not operate on individual
polygons.

Every semantic object is represented by a semantic
region.

Semantic Region

↓

Reference Point

↓

Relationship

↓

Meaning


Regions are the fundamental building blocks of
visual perception.


################################################################
# Distance Dependent Perception
################################################################

Visual attention changes with viewing distance.


Far Distance

Silhouette

↓

Body


Medium Distance

Head

↓

Body Relationship


Near Distance

Head

↓

Eye

↓

Beak

↓

Paper Structure

↓

Children's Drawings


Perception therefore has no globally fixed priority.

Priority depends on viewing distance.


################################################################
# Attention
################################################################

Attention determines which semantic region is
processed next.

The Perception Engine therefore models not only
geometry but also visual attention.

Attention is expected to become the central
controller of future semantic processing.


################################################################
# Canonical Development Workflow
################################################################

Every Builder follows the same workflow.

Reference

↓

Observation

↓

Hypothesis

↓

Minimal Builder

↓

Debug Visualization

↓

Artistic Validation

↓

Semantic Runtime

↓

Rendering


Only validated hypotheses become part of the runtime.


################################################################
# Long-Term Vision
################################################################

The long-term objective is not to recognize a bird.

The objective is to model visual perception.

The Peace Dove is the first application.

Future engines should be able to describe visual
organization itself.

The Perception Engine therefore becomes a semantic
grammar of visual perception.


################################################################
# Design Philosophy
################################################################

The project follows one fundamental rule.

Geometry supplies data.

Perception defines structure.

Structure creates meaning.

Meaning guides rendering.


The final benchmark is never mathematical accuracy.

The final benchmark is human visual perception.

## Architecture

Current pipeline:

Semantic Region
        ↓
Semantic Surface
        ↓
Paper Consumer
        ↓
Paper Renderer

The Semantic Surface is renderer independent.

Future systems like

- Light
- Motion
- Interaction
- Awakening

will consume the same Semantic Surface.


## Entwicklungs-Kompass


Vision

↓

Wahrnehmung

↓

Beobachtung

↓

Semantic Observation

↓

Semantic Knowledge

↓

Organisation Rules

↓

Visual Mapping

↓

Implementierung

↓

Optimierung

