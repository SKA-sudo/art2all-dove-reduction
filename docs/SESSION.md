# AI_START (VERPFLICHTEND)

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

main
Stable product branch

dev
Active development branch

Current branch
dev

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

### Repository 1 – Observation Lab

Zweck:

Visuelle Beobachtung des Technical Dove Models.

Funktionen:

* Modell frei drehen
* Zoomen
* Animation ein-/ausschalten
* Betrachtung aus jeder Perspektive

Dieses Repository dient ausschließlich der Wahrnehmung.

Es werden keine Algorithmen entwickelt.

---

### Repository 2 – Perceptual Reduction Lab

Zweck:

Systematische Reduktion räumlicher Informationen.

Hier wird untersucht,

welche geometrischen Informationen entfernt werden können,

ohne dass die Taube für den Menschen ihre eindeutige Erkennbarkeit verliert.

Regeln:

* Immer nur eine Änderung gleichzeitig
* Nach jeder Änderung ausschließlich visuelle Bewertung
* Keine Architekturänderungen
* Keine Produktfunktionen

Ergebnis dieses Repositories sind ausschließlich Wahrnehmungsregeln.

---

### Repository 3 – Art2all Development

Dieses Repository bleibt das eigentliche Produkt.

Hier werden ausschließlich Erkenntnisse umgesetzt,

die zuvor im Observation Lab und im Perceptual Reduction Lab nachvollziehbar bestätigt wurden.

Dieses Repository bleibt weiterhin **Product First**.

---

## Verbindlicher Forschungsprozess

Jede neue Fragestellung folgt künftig demselben Ablauf:

1. Beobachtung (Observation Lab)
2. Wahrnehmung beschreiben
3. Hypothese formulieren
4. Reduktion oder Experiment durchführen
5. Wahrnehmung validieren
6. Wahrnehmungsregel ableiten
7. Umsetzung im Art2all Development Repository

Forschung und Produktentwicklung bleiben damit bewusst getrennt.

Das Hauptprojekt übernimmt ausschließlich validierte Erkenntnisse aus den Forschungslaboren.
