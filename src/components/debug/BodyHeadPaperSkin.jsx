import { useMemo } from "react";
import * as THREE from "three";

import Paper from "../Paper";

const DRAWINGS = [
  "/drawings/demo/herz.png",
  "/drawings/demo/familie.png",
  "/drawings/demo/sonne.png",
  "/drawings/demo/regenbogen.png",
  "/drawings/demo/Peace-hand.png",
];

export default function BodyHeadPaperSkin({
  bodyRegion,
}) {
  const placements = useMemo(() => {
    const bodyFaces =
      bodyRegion?.faces?.filter(
        (face) =>
          face?.center instanceof THREE.Vector3
      ) ?? [];

    if (bodyFaces.length === 0) {
      return [];
    }

    const bodyCenter = new THREE.Vector3();

    bodyFaces.forEach((face) => {
      bodyCenter.add(face.center);
    });

    bodyCenter.divideScalar(
      bodyFaces.length
    );

    const bodyBounds = new THREE.Box3();

    bodyFaces.forEach((face) => {
      bodyBounds.expandByPoint(face.center);
    });

    const bodyHeight = Math.max(
      bodyBounds.max.y - bodyBounds.min.y,
      Number.EPSILON
    );

    const nextPlacements = [];

    bodyFaces.forEach((face, index) => {
      if (index % 3 !== 0) {
        return;
      }
  /*
       * Lokale semantische Nachbarschaft
       */
      const neighbours = bodyFaces
        .map((candidate) => ({
          face: candidate,
          distance:
            candidate.center.distanceTo(
              face.center
            ),
        }))
        .sort(
          (a, b) =>
            a.distance - b.distance
        )
        .slice(0, 10)
        .map((entry) => entry.face);

        /*
       * Lokale semantische Oberfläche:
       * Mittelpunkt und Normale aus derselben Nachbarschaft.
       */
      const localCenter = new THREE.Vector3();
      const localNormal = new THREE.Vector3();

      neighbours.forEach((neighbour) => {
        localCenter.add(neighbour.center);

        if (
          neighbour.normal instanceof
          THREE.Vector3
        ) {
          localNormal.add(
            neighbour.normal
          );
        }
      });

      localCenter.divideScalar(
        neighbours.length
      );

      /*
       * Nur teilweise zum lokalen Mittelpunkt glätten.
       * Dadurch bleibt das vorhandene Körpervolumen erhalten.
       */
      const surfacePosition = face.center
        .clone()
        .lerp(localCenter, 0.35);

      const outward = surfacePosition
        .clone()
        .sub(bodyCenter);

      if (
        outward.lengthSq() <=
        Number.EPSILON
      ) {
        outward.set(0, 0, 1);
      } else {
        outward.normalize();
      }

      if (
        localNormal.lengthSq() <=
        Number.EPSILON
      ) {
        localNormal.copy(outward);
      } else {
        localNormal.normalize();
      }

      /*
       * Nach außen ausrichten.
       */
      if (localNormal.dot(outward) < 0) {
        localNormal.negate();
      }

      const normal = localNormal;

      const distance =
        face.center.distanceTo(
          bodyCenter
        );

      const size =
        THREE.MathUtils.lerp(
          0.045,
          0.095,
          1 -
            THREE.MathUtils.clamp(
              distance / 1.25,
              0,
              1
            )
        );

      /*
       * Vertikale Position bleibt nur
       * für die vorhandene Flow-Organisation erhalten.
       */
      const verticalProgress =
        (face.center.y - bodyBounds.min.y) /
        bodyHeight;

      /*
       * Drei einfache lokale Organisationszonen.
       *
       * Unterer Körper / Bauch
       * Mittlerer Körper / Brust
       * Oberer Körper / Halsansatz
       */
      let flow = 0;

      if (verticalProgress < 0.34) {
        flow = -10;
      } else if (verticalProgress < 0.68) {
        flow = 0;
      } else {
        flow = 10;
      }

      nextPlacements.push({
        id: `body-face-paper-${index}`,

        position: surfacePosition
        .clone()
        .addScaledVector(
          normal,
          0.008
        ),

        normal,

        rotation: 0,
        flow,

        scale: [
          size,
          size * 0.65,
          1,
        ],

        image:
          DRAWINGS[
            index % DRAWINGS.length
          ],
      });
    });

    return nextPlacements;
  }, [bodyRegion]);

  if (placements.length === 0) {
    return null;
  }

  return (
    <group renderOrder={1600}>
      {placements.map((placement) => (
        <Paper
          key={placement.id}
          position={placement.position}
          normal={placement.normal}
          flow={placement.flow}
          rotation={placement.rotation}
          image={placement.image}
          scale={placement.scale}
        />
      ))}
    </group>
  );
}