import PerceptionRule from "./PerceptionRule";

export default class PerceptionRuleEngine {
  constructor() {
    this.rules = [
      new PerceptionRule({
        id: "rule-001",

        name: "Foundation Ready",

        requires: [
          "HAS_LONGITUDINAL_AXIS",
        ],

        result: "FOUNDATION_READY",
      }),
    ];
  }

  evaluate(observations = []) {
    return this.rules.map((rule) =>
      rule.evaluate(observations)
    );
  }
}