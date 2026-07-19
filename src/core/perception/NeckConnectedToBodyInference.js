const NeckConnectedToBodyInference = {
  id: "inference-neck-connected-to-body",

  requires: [
    "HAS_NECK_COMPONENT",
    "HAS_BODY_COMPONENT",
  ],

  produces: {
    predicate: "NECK_CONNECTED_TO_BODY",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default NeckConnectedToBodyInference;