export default {
  predicate: "HEAD_STRUCTURE_VALID",

  invalidPredicate: "HEAD_STRUCTURE_INVALID",

  subject: "runtime-dove-reference",

  source: "head-structure-validation-rule",

  requires: [
    "HAS_HEAD_COMPONENT",
    "HAS_NECK_COMPONENT",
    "HAS_BODY_COMPONENT",
    "HEAD_CONNECTED_TO_NECK",
    "NECK_CONNECTED_TO_BODY",
  ],
};