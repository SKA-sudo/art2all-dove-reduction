const RightWingComponentInference = {
  id: "inference-right-wing-component",

  requires: [
    "HAS_RIGHT_WING_REGION",
  ],

  produces: {
    predicate: "HAS_RIGHT_WING_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default RightWingComponentInference;