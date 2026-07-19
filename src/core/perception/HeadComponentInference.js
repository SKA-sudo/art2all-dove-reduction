const HeadComponentInference = {
  id: "inference-head-component",

  requires: [
    "HAS_HEAD_REGION",
  ],

  produces: {
    predicate: "HAS_HEAD_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default HeadComponentInference;