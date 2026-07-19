const BeakComponentInference = {
  id: "inference-beak-component",

  requires: [
    "HAS_BEAK",
  ],

  produces: {
    predicate: "HAS_BEAK_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default BeakComponentInference;