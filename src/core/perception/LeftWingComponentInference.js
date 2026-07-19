const LeftWingComponentInference = {
  id: "inference-left-wing-component",

  requires: [
    "HAS_LEFT_WING_REGION",
  ],

  produces: {
    predicate: "HAS_LEFT_WING_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default LeftWingComponentInference;