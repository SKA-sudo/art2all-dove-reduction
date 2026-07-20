import HeadStructureValidationRule from "./rules/HeadStructureValidationRule";
import DoveStructureValidationRule from "./DoveStructureValidator";


export default class SemanticValidator {
  constructor(
    rules = [
      HeadStructureValidationRule,
      DoveStructureValidationRule,
    ]
  ) {
    this.rules = rules;
  }

  validate(observations = []) {
    const knownPredicates = new Set(
  observations
    .filter(
      (observation) =>
        observation?.predicate &&
        Boolean(observation.value)
    )
    .map(
      (observation) =>
        observation.predicate
    )
);

    const validationObservations = [];

    this.rules.forEach((rule) => {
      const requirements = rule.requires ?? [];

      const isValid = requirements.every((predicate) =>
        knownPredicates.has(predicate)
      );

      const validationObservation = {
        predicate: isValid
          ? rule.predicate
          : rule.invalidPredicate ?? `${rule.predicate}_INVALID`,
        subject: rule.subject ?? "runtime-dove-reference",
        value: isValid,
        source: rule.source ?? "semantic-validator",
        derivedFrom: requirements,
      };

      validationObservations.push(validationObservation);

      knownPredicates.add(validationObservation.predicate);
    });

    return validationObservations;
  }
}