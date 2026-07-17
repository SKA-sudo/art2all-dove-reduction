import * as THREE from "three";

/**
 * Creates a canonical semantic surface from a semantic region.
 *
 * The Semantic Surface describes where a semantic region exists
 * in space and how its local surface is oriented.
 *
 * It contains no rendering knowledge and does not know whether
 * it will later carry paper, light, motion or interaction.
 */
export function createSemanticSurface({
  region,
  regionId,
}) {
  const sourceElements = region?.faces ?? [];

  const elements = sourceElements
    .filter(
      (element) =>
        element?.center instanceof THREE.Vector3 &&
        element?.normal instanceof THREE.Vector3
    )
    .map((element, index) => {
      const normal = element.normal
        .clone()
        .normalize();

      return {
        id:
          element.id ??
          `${regionId}-surface-element-${index}`,

        regionId,

        position: element.center.clone(),

        normal,

        source: element,

        metadata: {},
      };
    });

  return {
    id: `${regionId}-semantic-surface`,

    regionId,

    elements,
  };
}