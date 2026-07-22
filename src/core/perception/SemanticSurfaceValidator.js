export default class SemanticSurfaceValidator {
  constructor({
    id = "semantic-surface-validator",
  } = {}) {
    this.id = id;
  }

  validateStructure(
    semanticGraph,
    semanticSurface
  ) {
    const graphNodes = Array.isArray(
      semanticGraph?.nodes
    )
      ? semanticGraph.nodes
      : [];

    const componentNodes = graphNodes.filter(
      (node) => node?.type === "COMPONENT"
    );

    const surfaceComponents = Array.isArray(
      semanticSurface?.components
    )
      ? semanticSurface.components
      : [];

    const componentResults =
      componentNodes.map((graphNode) =>
        this.validateComponent(
          graphNode,
          surfaceComponents
        )
      );

    const graphComponentIds =
      componentNodes.map((node) => node.id);

    const additionalSurfaceComponents =
      surfaceComponents
        .filter(
          (component) =>
            !graphComponentIds.includes(
              component.id
            )
        )
        .map((component) => component.id);

    const duplicateSurfaceIds =
      this.findDuplicateIds(
        surfaceComponents
      );

    const subjectNode =
      graphNodes.find(
        (node) => node?.type === "SUBJECT"
      ) ?? null;

    const subjectPreserved =
      (subjectNode?.id ?? null) ===
      (semanticSurface?.subject ?? null);

    const allComponentsValid =
      componentResults.every(
        (result) => result.valid
      );

    const valid =
      componentNodes.length ===
        surfaceComponents.length &&
      allComponentsValid &&
      additionalSurfaceComponents.length ===
        0 &&
      duplicateSurfaceIds.length === 0 &&
      subjectPreserved;

    return {
      validatorId: this.id,

      validation: "STRUCTURAL_COMPLETENESS",

      valid,

      summary: {
        graphComponentCount:
          componentNodes.length,

        surfaceComponentCount:
          surfaceComponents.length,

        subjectPreserved,

        additionalSurfaceComponents,

        duplicateSurfaceIds,
      },

      components: componentResults,
    };
  }

  validateComponent(
    graphNode,
    surfaceComponents
  ) {
    const matchingComponents =
      surfaceComponents.filter(
        (component) =>
          component?.id === graphNode?.id
      );

    const surfaceComponent =
      matchingComponents[0] ?? null;

    const exists =
      surfaceComponent !== null;

    const unique =
      matchingComponents.length === 1;

    const idPreserved =
      exists &&
      surfaceComponent.id === graphNode.id;

    const typeCorrect =
      exists &&
      surfaceComponent.type ===
        "SEMANTIC_SURFACE_COMPONENT";

    const predicatePreserved =
      exists &&
      (surfaceComponent.predicate ??
        null) ===
        (graphNode.predicate ?? null);

    const sourcePreserved =
      exists &&
      (surfaceComponent.source ?? null) ===
        (graphNode.source ?? null);

    const confidencePreserved =
      exists &&
      (surfaceComponent.confidence ??
        null) ===
        (
          typeof graphNode.confidence ===
          "number"
            ? graphNode.confidence
            : null
        );

    const graphFaces = Array.isArray(
      graphNode?.value?.faces
    )
      ? graphNode.value.faces
      : [];

    const surfaceFaces = Array.isArray(
      surfaceComponent?.faces
    )
      ? surfaceComponent.faces
      : [];

    const faceCountPreserved =
      graphFaces.length ===
      surfaceFaces.length;

    const spatialElementsPresent =
      surfaceFaces.length > 0;

    const metadataFaceCountCorrect =
      exists &&
      surfaceComponent.metadata
        ?.faceCount === surfaceFaces.length;

    const sourceNodeIdPreserved =
      exists &&
      surfaceComponent.metadata
        ?.sourceNodeId === graphNode.id;

    const valid =
      exists &&
      unique &&
      idPreserved &&
      typeCorrect &&
      predicatePreserved &&
      sourcePreserved &&
      confidencePreserved &&
      faceCountPreserved &&
      spatialElementsPresent &&
      metadataFaceCountCorrect &&
      sourceNodeIdPreserved;

    return {
      id: graphNode?.id ?? null,

      valid,

      checks: {
        exists,
        unique,
        idPreserved,
        typeCorrect,
        predicatePreserved,
        sourcePreserved,
        confidencePreserved,
        faceCountPreserved,
        spatialElementsPresent,
        metadataFaceCountCorrect,
        sourceNodeIdPreserved,
      },

      counts: {
        graphFaceCount:
          graphFaces.length,

        surfaceFaceCount:
          surfaceFaces.length,

        matchingSurfaceComponents:
          matchingComponents.length,
      },
    };
  }

  findDuplicateIds(components) {
    const counts = new Map();

    for (const component of components) {
      const id = component?.id;

      if (!id) {
        continue;
      }

      counts.set(
        id,
        (counts.get(id) ?? 0) + 1
      );
    }

    return Array.from(
      counts.entries()
    )
      .filter(([, count]) => count > 1)
      .map(([id]) => id);
  }
}