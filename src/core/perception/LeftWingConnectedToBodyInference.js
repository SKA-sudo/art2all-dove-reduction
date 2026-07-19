const LeftWingConnectedToBodyInference = {
  id: "inference-left-wing-connected-to-body",

  requires: [
    "HAS_LEFT_WING_COMPONENT",
    "HAS_BODY_COMPONENT",
  ],

  produces: {
    predicate: "LEFT_WING_CONNECTED_TO_BODY",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default LeftWingConnectedToBodyInference;