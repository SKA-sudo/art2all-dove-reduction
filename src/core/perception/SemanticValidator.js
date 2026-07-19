export default class SemanticValidator {
  validate(observations = []) {
    const knownPredicates = new Set(
      observations
        .map((observation) => observation?.predicate)
        .filter(Boolean)
    );

    const validationObservations = [];

    const headStructureRequirements = [
      "HAS_HEAD_COMPONENT",
      "HAS_NECK_COMPONENT",
      "HAS_BODY_COMPONENT",
      "HEAD_CONNECTED_TO_NECK",
      "NECK_CONNECTED_TO_BODY",
    ];

    const headStructureValid =
      headStructureRequirements.every((predicate) =>
        knownPredicates.has(predicate)
      );

    validationObservations.push({
      predicate: headStructureValid
        ? "HEAD_STRUCTURE_VALID"
        : "HEAD_STRUCTURE_INVALID",
      subject: "runtime-dove-reference",
      value: headStructureValid,
      source: "semantic-validator",
      derivedFrom: headStructureRequirements,
    });

    return validationObservations;
  }
}