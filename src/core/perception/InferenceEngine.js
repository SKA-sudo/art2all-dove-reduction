export default class InferenceEngine {
  constructor({ rules = [] } = {}) {
    this.rules = rules;
  }

  infer(observations = []) {
    const knownPredicates = new Set(
      observations
        .map((observation) => observation?.predicate)
        .filter(Boolean)
    );

    const inferredObservations = [];

    let knowledgeChanged = true;

    while (knowledgeChanged) {
      knowledgeChanged = false;

      for (const rule of this.rules) {
        const producedPredicate =
          rule?.produces?.predicate;

        if (!producedPredicate) continue;

        if (knownPredicates.has(producedPredicate)) {
          continue;
        }

        const requirementsMet =
          rule.requires.every((predicate) =>
            knownPredicates.has(predicate)
          );

        if (!requirementsMet) continue;

        const inferredObservation = {
          predicate: producedPredicate,
          subject:
            rule.produces.subject ??
            "runtime-dove-reference",
          value: rule.produces.value ?? true,
          source: rule.id,
          derivedFrom: [...rule.requires],
        };

        inferredObservations.push(
          inferredObservation
        );

        knownPredicates.add(producedPredicate);
        knowledgeChanged = true;
      }
    }

    return inferredObservations;
  }
}