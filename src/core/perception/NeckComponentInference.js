const NeckComponentInference = {
  id: "inference-neck-component",

  requires: [
    "HAS_NECK_REGION",
  ],

  produces: {
    predicate: "HAS_NECK_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default NeckComponentInference;