/**
 * Übersetzt eine Semantic Surface in Paper-Placement-Daten.
 *
 * Der Adapter:
 *
 * - wählt Surface-Elemente anhand eines Sample-Schritts aus
 * - übernimmt Position und Normal
 * - setzt die Paper leicht über die Oberfläche
 * - weist Größe und Kinderzeichnung zu
 *
 * Der Adapter:
 *
 * - rendert nichts
 * - verändert die Semantic Surface nicht
 * - berechnet keine neue Semantik
 * - verwendet keine Cluster oder Metriken
 */
export function createSemanticSurfacePaperPlacements(
  semanticSurface,
  {
    drawings = [],
    sampleStep = 3,
    surfaceOffset = 0.006,
    scale = [0.045, 0.032, 1],
    idPrefix = "semantic-paper",
  } = {}
) {
  const surfaceElements =
    semanticSurface?.elements ?? [];

  if (surfaceElements.length === 0) {
    return [];
  }

  const safeSampleStep =
    Number.isFinite(sampleStep) &&
    sampleStep > 0
      ? Math.floor(sampleStep)
      : 1;

  const safeDrawings =
    Array.isArray(drawings)
      ? drawings
      : [];

  return surfaceElements
    .filter(
      (_, index) =>
        index % safeSampleStep === 0
    )
    .map((surfaceElement, index) => ({
      id:
        `${idPrefix}-${surfaceElement.id}`,

      position:
        surfaceElement.position
          .clone()
          .addScaledVector(
            surfaceElement.normal,
            surfaceOffset
          ),

      normal:
        surfaceElement.normal.clone(),

      scale: [...scale],

      image:
        safeDrawings.length > 0
          ? safeDrawings[
              index % safeDrawings.length
            ]
          : null,
    }))
    .filter(
      (placement) =>
        placement.image !== null
    );
}