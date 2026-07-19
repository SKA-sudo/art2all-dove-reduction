const BodyComponentInference = {
  id: "inference-body-component",

  requires: [
    "HAS_BODY_REGION",
  ],

  produces: {
    predicate: "HAS_BODY_COMPONENT",
    subject: "runtime-dove-reference",
    value: true,
  },
};

export default BodyComponentInference;