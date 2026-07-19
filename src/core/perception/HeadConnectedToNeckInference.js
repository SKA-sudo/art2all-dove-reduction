const HeadConnectedToNeckInference = {
  id: "inference-head-connected-to-neck",

  requires: [
    "HAS_HEAD_COMPONENT",
    "HAS_NECK_COMPONENT",
  ],

  produces: {
    predicate: "HEAD_CONNECTED_TO_NECK",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default HeadConnectedToNeckInference;