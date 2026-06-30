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

Sprint 10 – Perceptual Reduction
Ziel

Das Technical Dove Model dient ab sofort als technisches Referenzmodell.

Ausgehend von diesem vollständigen Modell wird die räumliche Information schrittweise reduziert, um zu untersuchen, welche Strukturen für die menschliche Wahrnehmung der Taube tatsächlich notwendig sind.

Die zentrale Forschungsfrage lautet:

Wie wenig räumliche Information benötigt das menschliche Gehirn, um die Taube noch eindeutig zu erkennen?

Vorgehensweise

Das Technical Dove Model wird nicht neu aufgebaut.

Es wird systematisch vereinfacht.

Nach jeder Reduktion erfolgt ausschließlich eine visuelle Bewertung.

Die Architektur bleibt während des gesamten Sprints unverändert.

Arbeitsweise

Jeder Schritt reduziert genau eine räumliche Eigenschaft.

Nach jeder Änderung wird geprüft:

Ist die Taube weiterhin eindeutig erkennbar?
Welche Information ging verloren?
Welche Information ist offenbar unverzichtbar?

Erst danach folgt die nächste Reduktion.

Erwartetes Ergebnis

Am Ende des Sprints entsteht kein klassisches GDL-Modell.

Es entsteht eine erste wissenschaftlich begründete Minimalbeschreibung der Taube.

Diese bildet anschließend die Grundlage für den semantischen Aufbau der Art2all Engine.

Engineering-Regeln
Das Technical Dove Model bleibt jederzeit lauffähig.
Es wird niemals mehr als eine Reduktion gleichzeitig durchgeführt.
Keine neuen Builder.
Keine Architekturänderungen.
Jede Änderung muss unmittelbar sichtbar und nachvollziehbar sein.
Erst nach erfolgreicher Verifikation wird der nächste Reduktionsschritt begonnen.
Erwarteter Meilenstein

Zum ersten Mal wird die Art2all Engine nicht aus geometrischen Primitivelementen aufgebaut, sondern aus den wahrnehmungsrelevanten Strukturen eines vollständig kontrollierten technischen Referenzmodells abgeleitet.