const BeakBelongsToHeadInference = {
  id: "inference-beak-belongs-to-head",

  requires: [
    "HAS_HEAD_COMPONENT",
    "HAS_BEAK_COMPONENT",
  ],

  produces: {
    predicate: "BEAK_BELONGS_TO_HEAD",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default BeakBelongsToHeadInference;