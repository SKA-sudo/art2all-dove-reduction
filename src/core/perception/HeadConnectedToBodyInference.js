const HeadConnectedToBodyInference = {
  id: "inference-head-connected-to-body",

  requires: [
    "HAS_HEAD_COMPONENT",
    "HAS_BODY_COMPONENT",
  ],

  produces: {
    predicate: "HEAD_CONNECTED_TO_BODY",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default HeadConnectedToBodyInference;