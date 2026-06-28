Zielbild-Wahrnehmung:
Aufsteigende Taube
↓
Algorithmische Frage:
Wie bekommt jeder Flügel eine lokale Richtung von Schulter zu Flügelspitze?
↓
PoC 05:


---CHATGPT
Ich würde deshalb den PoC 05 sogar noch einmal umformulieren.

Nicht:

Local Wing Space

Sondern zuerst:

Welche Orientierung der Papierflächen erzeugt im Zielbild die Wirkung des Flügels?
------


Local Wing Space sichtbar machen

PoC 05 – Local Wing Space Debug

Ziel:
Pro Flügel eine lokale Achse sichtbar machen:
Shoulder → WingTip

Wichtig:
Noch keine Papierflächen.
Keine GuideShape.
Keine neuen Builder.
Nur Debug-Validierung.

Dateien:
- DoveSpaceBuilder.js
- DebugGesture.jsx
- DoveModel.jsx

Success:
Die lokale Flügelrichtung ist links und rechts stabil sichtbar und folgt der aufsteigenden Gesamtwirkung der Taube.