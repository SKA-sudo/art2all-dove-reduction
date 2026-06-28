# AI_START (VERPFLICHTEND)

## 1. FOUNDATION

Lies zuerst vollständig:

* FOUNDATION.md
* SESSION.md

Diese Dokumente haben Vorrang vor allen neuen Ideen.

Hallo CHATGPT Wir machen ein supercooles Projekt


---

## 2. Zielbild analysieren

Betrachte das kanonische Zielbild.

Vor jedem neuen PoC beantworte zuerst:

> **Welche Wahrnehmungsregel des Zielbildes soll dieser PoC algorithmisch beschreiben?**

Nicht:

> Welchen Builder bauen wir?

Nicht:

> Welchen Code schreiben wir?

---

## 3. Wahrnehmung vor Technik

Die Engine entsteht

**nicht**

* aus Anatomie,
* nicht aus der Mesh-Struktur,
* nicht aus vorhandenen Datenstrukturen.

Sie entsteht aus der visuellen Wahrnehmung des finalen Kunstwerks.

Die GLB liefert ausschließlich die Geometrie.

Die Architektur entsteht aus den Gesetzen der Wahrnehmung.

---

## 4. Vorgehensweise

Immer dieselbe Reihenfolge:

1. Zielbild
2. Wahrnehmungsanalyse
3. Algorithmus
4. Minimaler PoC
5. Validierung
6. Code
7. Commit

Kein Schritt wird übersprungen.

---

## 5. Aktueller Fokus

Arbeite ausschließlich am `CURRENT_TASK`.

Vor jeder Änderung:

* aktuellen Code lesen
* keine neuen Builder
* keine neue Architektur
* bestehende Architektur respektieren
* nur die im SESSION-Dokument genannten Dateien ändern

---

## 6. Wahrnehmungsprinzipien (Art2all)

Bei jedem neuen Algorithmus prüfen:

* Unterstützt er die aufsteigende Gesamtkomposition?
* Unterstützt er den voluminösen Bauch als visuellen Schwerpunkt?
* Unterstützt er den leicht größeren, freundlichen Kopf?
* Unterstützt er die Dominanz der Silhouette?
* Unterstützt er die Organisation der weißen Papierflächen?
* Bringt er die Engine näher an die Wirkung des finalen Zielbildes?

Wenn eine dieser Fragen mit **Nein** beantwortet wird, wird der Algorithmus zuerst überarbeitet.

Erst danach wird Code geschrieben.

## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 

# SESSION

CURRENT_TASK

PoC 06 – Wing Flow Field (Analyse)

STATUS

✅ GeometryInspector abgeschlossen.

✅ FaceExtractor abgeschlossen.

✅ FaceFilter abgeschlossen.

✅ Semantic Dove Space abgeschlossen.

✅ Primary Dove Axis abgeschlossen.

✅ Transition Region abgeschlossen.

✅ Transition Region Quality abgeschlossen.

✅ PoC 05 – Local Wing Space abgeschlossen.

WICHTIGSTE ERKENNTNIS

PoC 05 konnte erfolgreich validieren, dass jede Face eine lokale Orientierung besitzt und der Datenfluss der Engine korrekt funktioniert.

Die Debug-Visualisierung zeigte jedoch eine entscheidende Wahrnehmung:

Der Flügel wird vom Betrachter nicht als einzelne Achse wahrgenommen.

Stattdessen entsteht der visuelle Eindruck eines zusammenhängenden Strömungsfeldes.

Der bisherige Local Wing Space beschreibt lediglich lokale Richtungen.

Er beschreibt noch nicht die gemeinsame Organisation des gesamten Flügels.

CURRENT_HYPOTHESIS

Der nächste Schritt besteht nicht darin, den Local Wing Space weiter zu verfeinern.

Stattdessen muss untersucht werden, wie ein kontinuierliches Wing Flow Field beschrieben werden kann.

Dieses Flow Field soll die visuelle Organisation der Papierflächen bestimmen.

Jede Face erhält ihre Richtung aus diesem gemeinsamen Feld und nicht ausschließlich aus einer lokalen Achse.

NEXT_ACTION

Analyse des kanonischen Zielbildes.

Frage:

Welche Wahrnehmungsregel beschreibt das kontinuierliche Strömungsfeld eines Flügels?

Erst danach wird ein Algorithmus entwickelt.

CURRENT_PIPELINE

GLB

↓

GeometryInspector

↓

FaceExtractor

↓

FaceFilter

↓

Semantic Dove Space

↓

Primary Dove Axis

↓

Transition Region

↓

Local Wing Space

↓

PoC 06 – Wing Flow Field (Analyse)

FILES
DoveModel.jsx
DoveSpaceBuilder.js
DebugGesture.jsx
DONE
GeometryInspector
FaceExtractor
FaceFilter
Semantic Dove Space
Primary Dove Axis
Transition Region
Transition Region Quality
Local Wing Space
LOCKED
Guide Shape
Primary Papers
Contour Papers
Fill Papers
PlacementEngine
SUCCESS_CRITERIA

Das Wing Flow Field beschreibt die visuelle Strömung des gesamten Flügels als kontinuierliches Wahrnehmungsfeld.

Es entsteht aus der Analyse des Zielbildes und wird erst nach erfolgreicher Wahrnehmungsvalidierung implementiert.