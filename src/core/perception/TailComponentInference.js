const TailComponentInference = {
  id: "inference-tail-component",

  requires: [
    "HAS_TAIL_REGION",
  ],

  produces: {
    predicate: "HAS_TAIL_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default TailComponentInference;