export default {
  predicate: "DOVE_STRUCTURE_VALID",

  requires: [
    "HEAD_STRUCTURE_VALID",
    "HAS_LEFT_WING_COMPONENT",
    "HAS_RIGHT_WING_COMPONENT",
    "HAS_TAIL_COMPONENT",
  ],
};