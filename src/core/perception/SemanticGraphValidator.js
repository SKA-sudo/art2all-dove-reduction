export default class SemanticGraphValidator {
  constructor({
    id = "semantic-graph-validator",
  } = {}) {
    this.id = id;
  }

  validate(
    semanticGraph,
    {
      expectedNodeIds = [],
      expectedEdgePredicates = [],
    } = {}
  ) {
    const nodes = Array.isArray(semanticGraph?.nodes)
      ? semanticGraph.nodes
      : [];

    const edges = Array.isArray(semanticGraph?.edges)
      ? semanticGraph.edges
      : [];

    const errors = [];
    const warnings = [];

    const nodeIds = nodes
      .map((node) => node?.id)
      .filter(Boolean);

    const nodeIdSet = new Set(nodeIds);

    const duplicateNodeIds =
      this.findDuplicates(nodeIds);

    duplicateNodeIds.forEach((nodeId) => {
      errors.push({
        type: "DUPLICATE_NODE",
        message: `Duplicate node: ${nodeId}`,
        value: nodeId,
      });
    });

    const edgeSignatures = edges.map((edge) =>
      this.createEdgeSignature(edge)
    );

    const duplicateEdges =
      this.findDuplicates(edgeSignatures);

    duplicateEdges.forEach((signature) => {
      errors.push({
        type: "DUPLICATE_EDGE",
        message: `Duplicate edge: ${signature}`,
        value: signature,
      });
    });

nodes.forEach((node) => {
  if (!node?.id) {
    errors.push({
      type: "INVALID_NODE_ID",
      message: "Node without valid id.",
      value: node,
    });

    return;
  }

  /*
   * Subject-Nodes sind logische Wurzelknoten.
   * Sie entstehen nicht durch einen einzelnen Extractor
   * und besitzen deshalb bewusst keine Confidence.
   */
  if (node.type !== "COMPONENT") {
    return;
  }

  this.validateConfidence({
    confidence: node.confidence,
    ownerType: "component",
    ownerId: node.id,
    errors,
    warnings,
  });
});

    edges.forEach((edge) => {
      const signature =
        this.createEdgeSignature(edge);

      if (!edge?.predicate) {
        errors.push({
          type: "MISSING_EDGE_PREDICATE",
          message:
            `Edge has no predicate: ${signature}`,
          value: edge,
        });
      }

      if (!edge?.from || !nodeIdSet.has(edge.from)) {
        errors.push({
          type: "INVALID_EDGE_SOURCE",
          message:
            `Edge source does not exist: ${edge?.from ?? "-"}`,
          value: edge,
        });
      }

      if (!edge?.to || !nodeIdSet.has(edge.to)) {
        errors.push({
          type: "INVALID_EDGE_TARGET",
          message:
            `Edge target does not exist: ${edge?.to ?? "-"}`,
          value: edge,
        });
      }

      this.validateConfidence({
        confidence: edge?.confidence,
        ownerType: "edge",
        ownerId: signature,
        errors,
        warnings,
      });
    });

    const missingNodeIds =
      expectedNodeIds.filter(
        (expectedNodeId) =>
          !nodeIdSet.has(expectedNodeId)
      );

    missingNodeIds.forEach((nodeId) => {
      errors.push({
        type: "MISSING_EXPECTED_NODE",
        message: `Expected node missing: ${nodeId}`,
        value: nodeId,
      });
    });

    const existingPredicates = new Set(
      edges
        .map((edge) => edge?.predicate)
        .filter(Boolean)
    );

    const missingEdgePredicates =
      expectedEdgePredicates.filter(
        (predicate) =>
          !existingPredicates.has(predicate)
      );

    missingEdgePredicates.forEach(
      (predicate) => {
        errors.push({
          type: "MISSING_EXPECTED_EDGE",
          message:
            `Expected relationship missing: ${predicate}`,
          value: predicate,
        });
      }
    );

    return {
      validatorId: this.id,

      valid: errors.length === 0,

      summary: {
        nodeCount: nodes.length,
        uniqueNodeCount: nodeIdSet.size,
        edgeCount: edges.length,
        errorCount: errors.length,
        warningCount: warnings.length,
      },

      expected: {
        nodeIds: expectedNodeIds,
        edgePredicates: expectedEdgePredicates,
      },

      missing: {
        nodeIds: missingNodeIds,
        edgePredicates: missingEdgePredicates,
      },

      duplicates: {
        nodeIds: duplicateNodeIds,
        edges: duplicateEdges,
      },

      errors,
      warnings,
    };
  }

  validateConfidence({
    confidence,
    ownerType,
    ownerId,
    errors,
    warnings,
  }) {
    if (confidence === undefined) {
      warnings.push({
        type: "MISSING_CONFIDENCE",
        message:
          `${ownerType} has no confidence: ${ownerId ?? "-"}`,
        value: ownerId,
      });

      return;
    }

    if (
      typeof confidence !== "number" ||
      !Number.isFinite(confidence) ||
      confidence < 0 ||
      confidence > 1
    ) {
      errors.push({
        type: "INVALID_CONFIDENCE",
        message:
          `Invalid confidence for ${ownerType}: ${ownerId ?? "-"}`,
        value: confidence,
      });
    }
  }

  createEdgeSignature(edge) {
    return [
      edge?.predicate ?? "UNKNOWN",
      edge?.from ?? "UNKNOWN",
      edge?.to ?? "UNKNOWN",
    ].join(":");
  }

  findDuplicates(values) {
    const seen = new Set();
    const duplicates = new Set();

    values.forEach((value) => {
      if (seen.has(value)) {
        duplicates.add(value);
      } else {
        seen.add(value);
      }
    });

    return Array.from(duplicates);
  }
}