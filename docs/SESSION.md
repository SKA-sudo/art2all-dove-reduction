# AI_START (VERPFLICHTEND)

## 1. FOUNDATION

Lies zuerst vollständig:

* FOUNDATION.md
* SESSION.md

Diese Dokumente haben Vorrang vor allen neuen Ideen.


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


# SESSION – Sprint 08 (PoC 08)

## Ziel
Weiterentwicklung der wahrnehmungsbasierten Flügelarchitektur.

---

## Durchgeführte Arbeiten

### Primary Gesture

Die Primary Gesture wurde erstmals separat visualisiert.

Erkenntnis:

- Die Primary Gesture trägt bereits einen großen Teil der visuellen Information.
- Sie beschreibt die dominante Bewegungsrichtung des Flügels.
- Sie bleibt ein zentraler Bestandteil der Engine.

---

### Gesture Tree (Experiment)

Es wurde ein erster Gesture-Tree-Prototyp erstellt.

Hypothese:

Primary Gesture
→ mehrere Flow Curves
→ Wing Finger Curves

Ergebnis:

Der PoC liefert interessante Ansätze, reicht jedoch noch nicht aus, um die Architektur anzupassen.

Status:
OFFENE HYPOTHESE

Keine Übernahme in die Engine.

---

## Wichtigste Erkenntnis des Tages

Mehrere Beispiele (einlinige Vogelzeichnungen, Kinderzeichnungen, stilisierte Möwen, Wahrnehmungsbeispiele) führten zu einer neuen gemeinsamen Erkenntnis.

Die Engine soll nicht die Anatomie eines Vogels modellieren.

Die Engine sucht die minimale visuelle Information, die das menschliche Gehirn benötigt, um eine Friedenstaube zu erkennen.

Diese Erkenntnis wurde im FOUNDATION-Dokument ergänzt.

---

## Projektfokus

Heute wurde bewusst entschieden, den Projektfokus wieder zu schärfen.

Priorität:

1. Friedenstaube fertigstellen.
2. Wirkung erzeugen.
3. Anschließend wissenschaftliche Verallgemeinerung.

Die allgemeine Wahrnehmungsforschung bleibt wichtig, wird jedoch erst nach Fertigstellung der Friedenstaube weiter vertieft.

---

## Vision

Art2all soll möglichst zeitnah als positives Friedenssymbol entstehen.

Motivation:

Kindern – auch aus Krisen- und Kriegsgebieten – die Möglichkeit geben, selbst aktiv einen Beitrag zu leisten.

Ein einzelnes Bild beendet keinen Krieg.

Aber jedes Kind kann dadurch vom Zuschauer zum Mitgestalter eines weltweiten Friedenssymbols werden.

Die Priorität liegt deshalb auf einer funktionierenden ersten Version der Friedenstaube und nicht auf theoretischer Perfektion.

---

## Nächster Sprint

PoC 09

Fragestellung:

Wie kann aus der Primary Gesture eine Flow Curve entstehen, die tatsächlich zur Organisation des Flügels beiträgt?

Dabei wird ausschließlich die Friedenstaube betrachtet.

Keine Verallgemeinerung auf andere Objekte.