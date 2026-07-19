const RightWingConnectedToBodyInference = {
  id: "inference-right-wing-connected-to-body",

  requires: [
    "HAS_RIGHT_WING_COMPONENT",
    "HAS_BODY_COMPONENT",
  ],

  produces: {
    predicate: "RIGHT_WING_CONNECTED_TO_BODY",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default RightWingConnectedToBodyInference;