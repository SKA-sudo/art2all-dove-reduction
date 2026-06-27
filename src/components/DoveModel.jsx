import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import DoveSurface from "./DoveSurface";
import DebugGesture from "./DebugGesture";

import { inspectGeometry } from "../utils/GeometryInspector";
import { extractFaces } from "../utils/FaceExtractor";
import { filterFaces } from "../utils/FaceFilter";
import { findPrimaryDoveAxis } from "../utils/DoveSpaceBuilder";

/* -------------------- TAUBE -------------------- */
export default function DoveModel({ flapRef }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/peace_dove.glb");

  const mesh = useMemo(() => {
    let found = null;

    scene.traverse((child) => {
      if (child.isMesh && child.geometry?.attributes?.position) {
        console.log("MESH CANDIDATE", {
          name: child.name,
          vertices: child.geometry.attributes.position.count,
          hasNormal: !!child.geometry.attributes.normal,
          hasIndex: !!child.geometry.index,
        });

        if (child.name === "Object_6") {
          found = child;
        }
      }
    });

    return found;
  }, [scene]);

  const primaryAxis = useMemo(() => {
    if (!mesh) return null;

    const faces = extractFaces(mesh);
    const filteredFaces = filterFaces(faces);

    return findPrimaryDoveAxis(filteredFaces);
  }, [mesh]);

  const primaryAxisPoints = useMemo(() => {
    if (!primaryAxis) return null;

    return [
      primaryAxis.leftWingTip.center,
      primaryAxis.leftShoulder.center,
      primaryAxis.bodyCenter.center,
      primaryAxis.rightShoulder.center,
      primaryAxis.rightWingTip.center,
    ];
  }, [primaryAxis]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!mesh) return;

    inspectGeometry(mesh);

    const faces = extractFaces(mesh);
    const filteredFaces = filterFaces(faces);

    console.log("Selected Mesh:", mesh.name);
    console.log("Faces:", faces.length);
    console.log("Gefiltert:", filteredFaces.length);
    console.log("Beispiel-Face:", filteredFaces[0]);
    console.log("Primary Axis:", primaryAxis);
  }, [mesh, primaryAxis]);

  useEffect(() => {
    const action = Object.values(actions || {})[0];
    if (action) action.reset().play();
  }, [actions]);

  useFrame(() => {
    const action = Object.values(actions || {})[0];
    if (!action) return;

    flapRef.current = Math.sin(action.time * 6) * 0.5 + 0.5;
  });

  return (
    <group ref={group} scale={20} position={[0, 6, 0]}>
      <primitive object={scene} />
      <DoveSurface mesh={mesh} />

      {primaryAxisPoints && (
        <DebugGesture
          points={primaryAxisPoints}
          colors={["blue", "lime", "white", "lime", "red"]}
        />
      )}
    </group>
  );
}