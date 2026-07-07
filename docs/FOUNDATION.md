################################################################
# Art2all – Foundation Document
################################################################



Version: 1.0

Status: Living Document

Letzte Aktualisierung: 26.06.2026

Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################

# Main Repository

Repository:
art2all

## Branch Strategy

main
Stable production branch.

Contains only verified milestones.
Must always be buildable and presentable.

dev
Active development and research branch.

All implementation work is performed on this branch.
Only validated sprint results are merged into main.

Current development branch:
dev

Workflow:

Idea
↓
Research (separate research repositories if required)
↓
Implementation on dev
↓
Visual verification
↓
Sprint Review
↓
Pull Request
↓
Merge into main

---

# Research Repositories

art2all-dove-observation

Purpose:
Research human visual perception.
No production code.

Goal:
Understand which visual information the human brain uses to recognize a dove.

---

art2all-dove-reduction

Purpose:
Research perceptual reduction.

Goal:
Systematically reduce the Technical Dove Model and identify which semantic information replaces removed geometric information.

---

# Development Principle

The production repository (art2all) is the implementation project.

The research repositories exist to discover new knowledge.

Research never directly changes production code.

Only validated architectural findings are transferred into art2all through normal sprint development.
## Branch Strategy

main
Stable product branch.

dev
Active development and research branch.

Only verified sprint results are merged into main.

## Vision, Prinzipien und Architektur


## Künstlerisches Fundament der Engine


"Der Irrtum ist oft, dass man es sich zu kompliziert macht. Aus der Einfachheit kann hohe Komplexität entstehen – nicht umgekehrt."

Art2all entwickelt seine Engine nicht aus der Anatomie einer Taube.

Auch die vorhandene 3D-Geometrie (GLB) definiert nicht die Architektur der Engine.

Der Ausgangspunkt ist ausschließlich die visuelle Wirkung des finalen Kunstwerks.

Vor jeder neuen Architekturentscheidung und vor jedem neuen Algorithmus wird zuerst analysiert:

**Warum wirkt das finale Bild emotional, harmonisch und sofort als Friedenstaube erkennbar?**

Die Engine entsteht anschließend aus diesen Erkenntnissen.

Nicht die Anatomie bestimmt die Algorithmen.

Nicht die Mesh-Struktur bestimmt die Algorithmen.

Sondern die Wahrnehmung des Menschen.

### Wahrnehmungsprinzipien

Die bisher wichtigsten Erkenntnisse sind:

* Die aufsteigende Gesamtkomposition vermittelt Hoffnung, Aufbruch und Leichtigkeit.
* Der voluminöse Bauch vermittelt Ruhe, Wärme und Stabilität.
* Der leicht größere Kopf erzeugt Sympathie und Weichheit.
* Die Silhouette dominiert die Wahrnehmung stärker als anatomische Details.
* Anatomisch unwichtige Details (z. B. die Füße) dürfen reduziert oder fehlen, ohne die emotionale Wirkung zu verlieren.
* Licht, Proportionen, Flächengewichtung und Orientierung bestimmen die Gesamtwirkung stärker als anatomische Perfektion.

### Konsequenz für die Entwicklung

Die Aufgabe unserer Engine besteht nicht darin, eine biologisch korrekte Taube zu beschreiben.

Sie beschreibt die visuellen Prinzipien, die das menschliche Gehirn benötigt, um sofort eine harmonische, positive und lebendige Friedenstaube wahrzunehmen.

Jeder neue PoC und jeder neue Algorithmus muss deshalb zuerst die Frage beantworten:

**Welches Wahrnehmungsprinzip des finalen Kunstwerks wird dadurch beschrieben oder verbessert?**

Erst danach beginnt die technische Umsetzung.


### Warum Art2all existiert

Art2all ist kein gewöhnliches Softwareprojekt.

Es ist ein weltweites, generationsübergreifendes Kunstprojekt, das Kinder durch Kreativität verbindet und zeigt, dass viele kleine Beiträge gemeinsam etwas Großes erschaffen können.

Kinder aus aller Welt malen, was Frieden für sie bedeutet.

Jede Zeichnung wird zu einer Feder.

Alle Federn zusammen bilden eine einzige Friedenstaube.


---


# Unsere Mission

Wir möchten Menschen daran erinnern, dass Frieden nicht von Einzelnen geschaffen wird.

Er entsteht durch viele kleine Beiträge.

Jede Kinderzeichnung symbolisiert Hoffnung.

Keine Zeichnung ist wichtiger als eine andere.

Gemeinsam schenken sie der Friedenstaube Leben.

---


# Warum eine Friedenstaube?

Die Friedenstaube gehört zu den bekanntesten und am weitesten verbreiteten Symbolen für Frieden, Hoffnung und Versöhnung. Menschen unterschiedlicher Kulturen, Sprachen und Religionen verbinden mit ihr den Wunsch nach einem friedlichen Zusammenleben und dem Ende von Konflikten.

Der von ihr getragene Ölzweig verstärkt diese Botschaft. Seit Jahrhunderten steht er für Hoffnung, Aussöhnung und einen Neuanfang nach schwierigen Zeiten. Gemeinsam bilden Taube und Ölzweig ein Symbol, das weltweit verstanden wird und Menschen miteinander verbindet.

Art2all greift dieses universelle Symbol bewusst auf und gibt ihm eine neue Bedeutung.

Unsere Friedenstaube besteht nicht aus Federn allein. Sie entsteht aus den Zeichnungen von Kindern aus aller Welt. Jede Zeichnung wird zu einer Feder und trägt dazu bei, der Taube Leben zu schenken.

So wird aus vielen einzelnen Gedanken, Hoffnungen und Wünschen ein gemeinsames Kunstwerk – erschaffen von Kindern unterschiedlicher Kulturen, Sprachen und Herkunft.

Die Friedenstaube steht in Art2all nicht für die Geschichte eines einzelnen Landes oder einer einzelnen Kultur. Sie steht für die gemeinsame Hoffnung der Menschheit, dass Frieden immer wieder neu entstehen kann.

Der Ölzweig erinnert dabei an das Ziel dieser gemeinsamen Reise: Frieden, Hoffnung, Versöhnung und das Ende von Konflikten.

Deshalb ist die Friedenstaube mehr als das Logo oder Symbol von Art2all.

Sie ist das Herz des Projekts.

---


# Der Ölzweig

Der Ölzweig ist seit Jahrhunderten ein Symbol für Frieden, Hoffnung, Versöhnung und das Ende von Konflikten.

In Art2all trägt die Friedenstaube den Ölzweig nicht als dekoratives Element, sondern als sichtbaren Ausdruck ihrer Botschaft.

Während die Kinderzeichnungen die Gemeinschaft der Menschen repräsentieren, erinnert der Ölzweig an das gemeinsame Ziel dieser Gemeinschaft: eine friedlichere Welt.

Gemeinsam bilden Friedenstaube und Ölzweig eine untrennbare Einheit.

Die Taube trägt die Hoffnung der Kinder.

Der Ölzweig trägt die Hoffnung auf Frieden.

---


# Die Geschichte

Ein Besucher entdeckt zunächst eine wunderschöne Friedenstaube.

Beim Näherkommen erkennt er eine Federstruktur.

Noch näher erkennt er, dass jede Feder aus einer echten Kinderzeichnung besteht.

Mit einem Klick öffnet sich die Geschichte hinter dieser Zeichnung.

So wird aus einem Kunstwerk eine Sammlung von Hoffnungen und Geschichten.


---


# Der Lebenszyklus der Friedenstaube

Sleeping → Dreaming → Awakening → Awake → Flying

Die Taube wird nicht durch Programmcode erweckt.

Sie erwacht durch die gemeinsame Teilnahme der Kinder.

Jede neue Zeichnung ist eine Feder.

Jede Feder schenkt der Taube ein kleines Stück Leben.

---


# Die Rolle der Länder

Länder konkurrieren nicht miteinander.

Sie tragen gemeinsam zur Weltgeschichte bei.

Jede Zeichnung gehört zur gemeinsamen Friedenstaube.

Länder bleiben sichtbar, aber immer als Teil eines größeren Ganzen.

---


# Nach dem Erwachen

Eine vollständig erwachte Friedenstaube verschwindet nicht.

Sie wird Teil eines Himmels der Friedenstauben.

Dort bleibt sie dauerhaft erhalten.

Gleichzeitig beginnt eine neue schlafende Taube für die nächste Generation.

So entsteht eine niemals endende Geschichte.

---


# Unsere Entwicklungsprinzipien

## Story First

Jede technische Entscheidung muss die Geschichte unterstützen.

## Scalability by Design

Das System wird von Anfang an für langfristiges Wachstum entwickelt.

## Modular Architecture

Komponenten übernehmen jeweils genau eine Aufgabe.

## Every Drawing Matters

Jede Zeichnung ist gleich wertvoll.

## Preserve the Magic

Die wichtigste Aufgabe der Technik ist es, den Moment zu ermöglichen, in dem Besucher erkennen:

"Diese Friedenstaube besteht wirklich aus den Zeichnungen von Kindern."

---


# Langfristige Vision

Art2all soll mehr sein als eine Website.

Es soll ein lebendiges Kunstwerk werden.

Ein Ort, an dem Generationen von Kindern ihre Gedanken zum Frieden hinterlassen.

Jede Generation erschafft ihre eigene Friedenstaube.

Jede erwachte Taube erinnert die nächste Generation daran, dass Frieden immer wieder neu geschaffen werden muss.

---

# Unser Leitsatz

Gemeinsam erwecken wir die Friedenstaube.

---

# Art2all ist eine Einladung


Eine Einladung an Kinder, ihre Gedanken zum Frieden zu teilen.

Eine Einladung an Menschen unterschiedlicher Kulturen, gemeinsam etwas Größeres zu erschaffen.

Und eine Einladung, daran zu glauben, dass aus vielen kleinen Hoffnungen eine gemeinsame Zukunft entstehen kann.


PoC 01
Warum erkennt das Gehirn überhaupt eine Taube?

↓

PoC 02
Warum wirkt die Gesamtkomposition aufsteigend?

↓

PoC 03
Warum besitzt die Taube eine globale Hauptachse?

↓

PoC 04
Warum wirkt der Schulterbereich als Übergang?

↓

PoC 05
Warum organisiert sich der Flügel als zusammenhängende visuelle Fläche?

# Wahrnehmungsregeln
1. Raster vor Feder
 - Das Gehirn erkennt zuerst eine zusammenhängende Fläche.
 - Die Federwirkung entsteht erst als Folge des Rasters.
2. Unregelmäßige Trapezflächen
 - Die Papierflächen bilden kein regelmäßiges Rechteckraster.
 - Sie sind unterschiedlich groß, leicht versetzt und leicht          gegeneinander verdreht.
 - Dadurch entsteht eine organische statt technische Wirkung.
3. Überlagerungsdichte
 - Im Flügelinneren überlagern sich viele Papierflächen.
 - Dadurch entsteht eine geschlossene weiße Fläche.
 - Zur Flügelkante nimmt die Überlagerung kontinuierlich ab.
4. Federwirkung als Folge
 - Die äußeren Papierlagen öffnen sich nach außen.
 - Es entstehen kaum radiale Muster.
 - Die Federwirkung entsteht durch geringere Überdeckung und die sichtbaren Blattkanten.
5. Plastizität
 - Die räumliche Wirkung entsteht hauptsächlich durch die Wölbung der Oberfläche.
 - Das Raster selbst ist nahezu zweidimensional.
 - Die Geometrie trägt die Form, das Raster trägt die Wahrnehmung.

 Neue Wahrnehmungsregel
Flügel als visuelle Fläche

Der Flügel wird vom menschlichen Gehirn nicht als Sammlung einzelner Papierflächen wahrgenommen.

Die primäre Wahrnehmung ist eine zusammenhängende Fläche.

Diese Fläche entsteht durch die Organisation eines unregelmäßigen Rasters aus überlappenden Papierflächen.

Die Federwirkung ist nicht die Ursache dieser Wahrnehmung, sondern ihre Folge.

Raster vor Feder

Die Art2all-Engine beschreibt den Flügel nicht als biologisches Federsystem.

Sie beschreibt die Organisationsregeln eines visuellen Rasters.

Dieses Raster erzeugt beim Betrachter den Eindruck eines Flügels.

Plastizität

Die räumliche Wirkung entsteht hauptsächlich durch die Geometrie der Oberfläche.

Das Raster selbst bleibt weitgehend zweidimensional.

Die Wölbung der Oberfläche erzeugt die plastische Wirkung.

Größenprogression

Die Papierflächen besitzen keine einheitliche Größe.

Sie wachsen kontinuierlich von innen nach außen.

Diese Größenprogression trägt wesentlich dazu bei, dass das Gehirn die Fläche als Flügel interpretiert.

Architektur:

Art2all Architecture Principle – Feather Band Engine
Die grundlegende Organisation eines Flügels erfolgt nicht durch ein globales Flow Field, sondern durch hierarchische Feather Bands. Jede Feather Band definiert ihre eigene Kurve, Breite, Dichte und Endposition. Der Flow einzelner Paper entsteht erst innerhalb dieser Band. Dadurch wird die visuelle Wahrnehmung des Zielbildes reproduziert, anstatt lediglich Papier entlang von Mesh-Normalen oder einem globalen Vektorfeld auszurichten.


Architecture Hypothesis – Wing Finger Skeleton

Die Organisation des Flügels erfolgt nicht direkt durch einzelne Paper oder ein globales Flow Field. Zwischen dem Local Wing Space und den Feather Bands existiert eine kinematische Struktur – das Wing Finger Skeleton.

Das Wing Finger Skeleton ist keine anatomische Nachbildung eines Vogels, sondern ein abstraktes Bewegungsmodell. Es beschreibt den Flügel als eine kleine Anzahl semantischer Träger ("Finger"), die sich von einer gemeinsamen Flügelwurzel aus öffnen und schließen können – ähnlich einer menschlichen Hand.

Jede Feather Band ist einem Wing Finger zugeordnet und übernimmt dessen Orientierung, Krümmung und Spreizwinkel. Die einzelnen Paper werden nicht unabhängig animiert, sondern folgen ihrer Feather Band.

Dadurch entstehen Flügelbewegung, Silhouette, Überlappung und Paper-Orientierung aus derselben hierarchischen Struktur.

Die Natur wird nicht kopiert, sondern analysiert.

Anatomische Strukturen dienen ausschließlich dazu, funktionale Prinzipien zu verstehen. Die Engine reproduziert die visuelle Wahrnehmung des Zielbildes, nicht die Anatomie des Vogels.

Art2all Engineering Principle

Architekturentscheidungen entstehen aus der Wahrnehmung des Zielbildes. Natürliche Systeme werden anschließend als funktionale Referenz herangezogen, um die Hypothesen zu überprüfen und zu verfeinern. Ziel ist nicht die Nachbildung biologischer Anatomie, sondern die Übertragung ihrer Organisationsprinzipien auf eine eigene, wahrnehmungsorientierte Engine.


1. Art2all-Entwicklungsmethodik
 - Target Image → Visual Perception → Hypothesis → Nature Validation → Algorithm → PoC → Implementation
 - Die Natur dient zur Validierung von Hypothesen, nicht als Vorlage zum Nachbauen.
2. Architektur-Hypothese
- Hierarchischer Aufbau des Flügels:
  - Local Wing Space
  - Wing Finger Skeleton (funktionale Abstraktion, keine Anatomie)
  - Feather Bands
  - Paper Flow
  - Paper Placement

  Everything follows

Kein Element der Engine bewegt sich unabhängig.

Jede Ebene folgt ausschließlich ihrer direkten Elternstruktur.

Dadurch entstehen alle sichtbaren Veränderungen aus wenigen semantischen Transformationen.

Das ist unsere komplette Architektur in einem Satz.

Beispiele:

Dove State
      ↓
Wing Pose
      ↓
Wing Finger Curves
      ↓
Feather Bands
      ↓
Paper Flow
      ↓
Paper Placement

Kein Paper entscheidet selbst etwas.

Es folgt.

Keine Feather Band entscheidet selbst etwas.

Sie folgt.

Vielleicht in einer eingerückten Box:

Everything follows.

Die visuelle Komplexität entsteht nicht durch unabhängige Einzelobjekte, sondern durch eine Hierarchie semantischer Beziehungen. Jede Ebene folgt ausschließlich ihrer Elternstruktur. Aus diesen wenigen Transformationen entsteht die gesamte Bewegung, Form und Lebendigkeit der Friedenstaube.

Art2all modelliert nicht primär Objekte. Art2all modelliert die minimale visuelle Information, die das menschliche Gehirn benötigt, um ein Objekt zu erkennen. Die Engine beschreibt daher nicht Anatomie, sondern Wahrnehmung und deren Aktivierung im visuellen Gedächtnis.


# Prinzip der Einfachheit

## Architekturprinzip

Der häufigste Fehler bei der Entwicklung komplexer Systeme besteht darin, Komplexität direkt konstruieren zu wollen.

Art2all folgt dem entgegengesetzten Ansatz.

> **Aus der Einfachheit kann hohe Komplexität entstehen.**
>
> **Komplexität selbst erzeugt jedoch keine Einfachheit.**

Die Aufgabe der Engine besteht deshalb nicht darin, möglichst viele Regeln zu definieren.

Ihre Aufgabe besteht darin, die wenigen fundamentalen Regeln zu finden, aus denen die gewünschte Wahrnehmung, Organisation und Vielfalt von selbst entstehen.

Die Friedenstaube ist kein statisches 3D-Modell.
Sie ist ein dynamisches Gleichgewicht aus den Beziehungen aller Kinderzeichnungen.

Wir entwickeln eine Engine, die Wahrnehmung aus Beziehungen entstehen lässt.

Die Qualität einer Architektur misst sich nicht daran, wie viel sie beschreibt, sondern daran, wie viel sie mit möglichst wenigen Regeln entstehen lässt.

---

## Konsequenzen

Jede neue Regel muss sich rechtfertigen.

Vor jeder Erweiterung wird gefragt:

* Kann dieses Verhalten aus einer einfacheren Regel entstehen?
* Ist diese Regel universell?
* Vereinfacht sie die Architektur?
* Entsteht daraus mehr Komplexität als wir hineingeben?

Kann eine dieser Fragen mit **Ja** beantwortet werden, besitzt die einfachere Regel Vorrang.

---

## Anwendung auf Art2all

Die Friedenstaube wird nicht durch eine Vielzahl einzelner Spezialalgorithmen aufgebaut.

Sie entsteht aus wenigen grundlegenden Prinzipien:

* Wahrnehmung vor Technik.
* Beziehungen vor Objekten.
* Gleichgewicht vor Platzierung.
* Wachstum statt Rekonstruktion.
* Emergenz statt Konstruktion.

Alle weiteren Strukturen der Engine sollen aus diesen wenigen Grundprinzipien hervorgehen.

---

## Leitfrage

Bei jeder zukünftigen Architekturentscheidung wird zuerst gefragt:

> **Welche einfachere Regel könnte dieses Verhalten entstehen lassen, anstatt es direkt zu programmieren?**

Erst wenn keine einfachere Erklärung gefunden wird, darf eine neue Regel eingeführt werden.


### Referenzmodell-Prinzip

Das GLB ist das aktuelle technische Referenzmodell von Art2all.

Es dient dazu,

- räumliche Zusammenhänge zu verstehen,
- Hypothesen zu validieren,
- Algorithmen abzuleiten und
- Wahrnehmungsmodelle zu überprüfen.

Das GLB ist jedoch nicht das Ziel der Entwicklung.

Das eigentliche Ziel ist ein eigenständiges Wahrnehmungsmodell, das erklärt, warum die Taube als Taube erkannt wird.

Dieses Wahrnehmungsmodell wird unabhängig vom GLB entwickelt und kann sich mit zunehmendem Verständnis weiterentwickeln.

Sollte sich später herausstellen, dass das Wahrnehmungsmodell die Zielwahrnehmung besser beschreibt als das ursprüngliche GLB, darf das Referenzmodell angepasst oder ersetzt werden.

Art2all entwickelt daher nicht das GLB weiter, sondern das Verständnis der zugrunde liegenden Wahrnehmung.

## Repository Strategy

Art2all is developed using separate repositories with clearly defined responsibilities.

### art2all

Purpose:
Development of the final product.

Contains:
- Product architecture
- Engine implementation
- User experience
- Production-ready code

Research is never performed directly in this repository.

Only validated findings from the research repositories are implemented here.

---

### art2all-dove-observation

Purpose:
Observation of the Technical Dove Model.

Goal:
Understand human visual perception.

Activities include:
- free camera movement
- animation control
- visual inspection
- documentation of observations

No algorithm development.

---

### art2all-dove-reduction

Purpose:
Perceptual reduction experiments.

Goal:
Determine which spatial information is essential for recognizing the dove.

Rules:
- only one reduction at a time
- visual validation after every step
- no architecture changes
- no product implementation

---

Research Workflow

Observation
↓

Perception

↓

Hypothesis

↓

Experiment / Reduction

↓

Validation

↓

Perception Rule

↓

Implementation in Art2all

# Leitsatz
Art2all entwickelt keine Engine zur Organisation von Bildern. Art2all entwickelt eine Perception Engine, die die menschliche Gesamtwahrnehmung auch bei massiv wachsender visueller Komplexität erhält.


################################################################
## Evidence-Driven Development
################################################################

Art2all develops its Perception Engine through reproducible observations.

The project does not begin with abstract perception theories.

Instead, every perception rule emerges from a visible implementation that
can be reproduced, observed and validated.

The development workflow is therefore:

Project Goal

↓

Implementation

↓

Observation

↓

Documentation

↓

Hypothesis

↓

Experiment

↓

Validation

↓

Perception Rule

↓

Production Engine

This workflow ensures that every perception algorithm is grounded in
observable evidence rather than assumptions.

Scientific research therefore supports the project.

It never replaces visible project progress.

################################################################
Project-Driven Research
################################################################

Art2all follows a project-driven development methodology.

The project defines the next implementation goal.

Implementation produces observable results.

Observations lead to scientific hypotheses.

Validated hypotheses refine the architecture.

The refined architecture enables the next implementation step.

Project
↓

Implementation
↓

Observation
↓

Hypothesis
↓

Experiment

↓

Validation

↓

Architecture

↓

Next Implementation

Scientific research supports the project.

It never replaces visible project progress.

The project drives the research.

Research refines the architecture.

Architecture enables the implementation.


################################################################
Perception Principle
################################################################

Perception is not limited to static geometry.

Whenever perception depends on motion, posture or temporal behaviour,
semantic extraction shall operate on the animated perception state rather
than on the original static mesh.

The mesh represents geometry.

The animated SkinnedMesh represents perceived behaviour.

Future perception algorithms should distinguish between

- geometric information

and

- perceptual behaviour.

# New Directory
Geometry describes what an object is.
Animated semantics describe how an object behaves.
Human perception combines both into object identity.

################################################################
Perception State Principle
################################################################

The Perception Engine does not analyse raw geometry.

It analyses the current observable Perception State.

The Perception State represents the complete perceptual description of the
reference model at one specific moment.

Semantic extractors never define perception.

They analyse an existing Perception State.

This keeps perception generation and semantic interpretation separated and
allows future extractors to remain independent from rendering details.