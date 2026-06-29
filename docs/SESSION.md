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

---

Sprint

PoC 09 – GDL Space Grid (Start)

Ziel des Sprints

Zurück zu den Grundlagen.

Nicht die fertige Taube analysieren, sondern das technische Ausgangsmodell sichtbar machen und daraus schrittweise ein minimales GDL entwickeln.

Die zentrale Fragestellung lautet:

Wie wenig räumliche Information benötigen wir, damit die Flügelform bzw. die Taube noch eindeutig wahrgenommen wird?

Umgesetzte Arbeiten
Analysemodus erstellt

Für die Analyse wurde das normale Rendering deaktiviert.

Aktiv:

Wireframe-GLB
Technische Kamera

Deaktiviert:

DoveSurface
PrimaryGestureDebug
WingFingerCurvesDebug
GestureTreeDebug
weitere Debug-Hilfen

Dadurch steht erstmals das technische Modell selbst im Mittelpunkt.

GDLBuilder

Der vorhandene Code wurde erstmals zu einem gemeinsamen GDLBuilder zusammengeführt.

Aktuelle Bestandteile:

Primary Axis
Local Wing Space
Primary Gestures
Wing Finger Curves

Diese Builder existieren bereits und wurden erstmals in einer gemeinsamen Datenstruktur zusammengeführt.

GDLDebug

Ein neuer zentraler Debug-Layer wurde aufgebaut.

Ziel:

einzelne Builder unabhängig voneinander ein- und ausschalten
keine Vermischung verschiedener Debug-Ausgaben
Grundlage für zukünftige Analyse
Debug-Konfiguration

Ein zentraler Debug-Schalter wurde eingeführt.

Dadurch können einzelne Ebenen unabhängig aktiviert werden.

Dies bildet die Grundlage für zukünftige technische Analysen.

SpaceGridDebug

Erster Versuch eines unabhängigen Raumgitters.

Ergebnis:

einzelne Linie sichtbar
mehrere Linien wurden nicht korrekt dargestellt

Vermutung:

Die verwendete drei/drei-Komponente Line eignet sich nicht für das geplante Raumgitter.

Nächster Versuch:

Implementierung des Raumgitters mit THREE.LineSegments bzw. BufferGeometry.

Wichtigste Erkenntnis des Tages

Nicht die Technik war der wichtigste Fortschritt.

Der wichtigste Fortschritt war die Erkenntnis über den Entwicklungsprozess.

Art2all befindet sich nicht mehr in der Ideenphase.

Die Architektur ist beschlossen.

Ab jetzt gilt:

Die Architektur ist beschlossen. Ich implementiere sie jetzt.

Während eines Sprints werden keine neuen Architekturen entwickelt.

Neue Ideen werden ausschließlich gesammelt und erst nach Abschluss des aktuellen Sprints bewertet.

Neuer Arbeitsmodus

Vision und Build werden strikt getrennt.

Vision
Forschung
Wahrnehmung
Architektur
wissenschaftliche Ansätze

Ergebnis:
Entscheidung.

Danach wird die Architektur eingefroren.

Build

Während eines Sprints:

keine neuen Builder
keine neue Architektur
keine Richtungswechsel

Arbeitsweise:

Eine Aufgabe.

Eine Datei.

Ein sichtbares Ergebnis.

Dann Commit.

Nächster Sprint

SpaceGridDebug fertigstellen.

Nicht das GDL reduzieren.

Nicht neue Builder entwickeln.

Zuerst das vollständige technische Raumgitter sichtbar machen.

Danach beginnt die eigentliche Analyse:

Raumgitter schrittweise reduzieren und nach jedem Schritt prüfen:

Ist die Flügelform bzw. die Taube noch eindeutig wahrnehmbar?

Erst danach folgen weitere Ebenen wie Beziehungsnetz, Verformung und Wahrnehmungsalgorithmen.