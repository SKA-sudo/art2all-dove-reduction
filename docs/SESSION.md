# SESSION

CURRENT_TASK:
PoC03_PrimaryDoveAxis_Debug

CURRENT_HYPOTHESIS:
Engine erkennt semantische Hauptachse der Taube.

NEXT_ACTION:
Implement DoveSpaceBuilder.
Visualisiere:
LeftWingTip
LeftShoulder
BodyCenter
RightShoulder
RightWingTip

FILES:
- src/utils/DoveSpaceBuilder.js
- src/components/DebugDoveAxis.jsx

DONE:
- FaceExtractor
- FaceFilter
- WingContourBuilder
- DebugGesture
- GeometryInspector
- Semantic Dove Space

DO_NOT_TOUCH:
GuideShape
PaperEngine
PlacementEngine

SUCCESS_CRITERIA:
5 semantische Punkte werden korrekt auf dem GLB dargestellt.
Keine Paper.
Keine GuideShape.

NOTES:
Primary Dove Axis ist der erste Beweis, dass die Engine die Taube semantisch statt geometrisch organisiert.