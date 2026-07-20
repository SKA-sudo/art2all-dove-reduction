export default {
  predicate: "DOVE_STRUCTURE_VALID",

  invalidPredicate: "DOVE_STRUCTURE_INVALID",

  subject: "runtime-dove-reference",

  source: "dove-structure-validation-rule",

  requires: [
    "HEAD_STRUCTURE_VALID",
    "HAS_LEFT_WING_COMPONENT",
    "HAS_RIGHT_WING_COMPONENT",
    "HAS_TAIL_COMPONENT",
  ],
};