const TailConnectedToBodyInference = {
  id: "inference-tail-connected-to-body",

  requires: [
    "HAS_TAIL_COMPONENT",
    "HAS_BODY_COMPONENT",
  ],

  produces: {
    predicate: "TAIL_CONNECTED_TO_BODY",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default TailConnectedToBodyInference;