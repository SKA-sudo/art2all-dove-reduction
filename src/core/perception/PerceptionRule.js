export default class PerceptionRule {
  constructor({
    id,
    name,
    requires = [],
    result,
  }) {
    this.id = id;
    this.name = name;
    this.requires = requires;
    this.result = result;
  }

  evaluate(observations = []) {
    const predicates = new Set(
      observations.map((o) => o.predicate)
    );

    const matched = this.requires.every((predicate) =>
      predicates.has(predicate)
    );

    return {
      ruleId: this.id,
      ruleName: this.name,

      matched,

      result: matched
        ? this.result
        : null,
    };
  }
}