import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import DoveSurface from "./DoveSurface";
import DebugGesture from "./DebugGesture";
import { WingFingerCurvesDebug } from "./debug/WingFingerCurvesDebug.jsx";

import { inspectGeometry } from "../utils/GeometryInspector";
import { extractFaces } from "../utils/FaceExtractor";
import { filterFaces } from "../utils/FaceFilter";
import {
  findPrimaryDoveAxis,
  createLocalWingSpace,
} from "../utils/DoveSpaceBuilder";
import { buildWingFingerCurves } from "../utils/WingFingerCurveBuilder";
import DebugWingCurves from "./DebugWingCurves";
import { buildPrimaryGestures } from "../utils/PrimaryGestureBuilder";
import { PrimaryGestureDebug } from "./debug/PrimaryGestureDebug.jsx";
import { buildGestureTreeDebug } from "../utils/GestureTreeBuilder";
import { GestureTreeDebug } from "./debug/GestureTreeDebug.jsx";
import { buildGDL } from "../core/GDLBuilder";
import GDLDebug from "./debug/GDLDebug";
import * as THREE from "three";

/* -------------------- TAUBE -------------------- */
export default function DoveModel({ flapRef, displayMode, showPrimaryAxis }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/peace_dove.glb");

  const technicalScene = useMemo(() => {
        const clone = scene.clone(true);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);

    console.log("========== GLB ==========");
    console.log("MIN:", box.min);
    console.log("MAX:", box.max);

    const center = new THREE.Vector3();
    box.getCenter(center);

    console.log("CENTER:", center);
    console.log("=========================");
    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.material = new THREE.MeshBasicMaterial({
        color: "#ff0000",
        wireframe: true,
        transparent: true,
        opacity: 0.65,
        depthTest: false,
        depthWrite: false,
      });
    });

    return clone;
  }, [scene]);

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

  const engineData = useMemo(() => {
    if (!mesh) return null;

    const faces = extractFaces(mesh);
    const filteredFaces = filterFaces(faces);
    const primaryAxis = findPrimaryDoveAxis(filteredFaces);
    const localWingSpace = createLocalWingSpace(filteredFaces, primaryAxis);

    console.log("Local Wing Space");
    console.log("Left:", localWingSpace?.left?.length);
    console.log("Right:", localWingSpace?.right?.length);

    return {
      faces,
      filteredFaces,
      primaryAxis,
      localWingSpace,
    };
  }, [mesh]);

  const primaryAxis = engineData?.primaryAxis ?? null;
  const localWingSpace = engineData?.localWingSpace ?? null;

  const primaryGestures = useMemo(() => {
    if (!localWingSpace || !primaryAxis) return [];

    return buildPrimaryGestures({
      localWingSpace,
      primaryAxis,
    });
  }, [localWingSpace, primaryAxis]);

  const gestureTreeFlowCurves = useMemo(() => {
    if (!primaryGestures.length) return [];

    return buildGestureTreeDebug({
      primaryGestures,
    });
  }, [primaryGestures]);

  const leftWingFingerCurves = useMemo(() => {
    if (!localWingSpace || !primaryAxis?.leftShoulder) return [];

    return buildWingFingerCurves({
      localWingSpace,
      shoulder: primaryAxis.leftShoulder,
      side: "left",
      count: 5,
    });
  }, [localWingSpace, primaryAxis]);

  const gdl = useMemo(() => {
    return buildGDL({
      primaryAxis,
      localWingSpace,
      primaryGestures,
      wingFingerCurves: leftWingFingerCurves,
    });
  }, [primaryAxis, localWingSpace, primaryGestures, leftWingFingerCurves]);

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
    if (!mesh || !engineData) return;

    inspectGeometry(mesh);

    console.log("Selected Mesh:", mesh.name);
    console.log("Faces:", engineData.faces.length);
    console.log("Gefiltert:", engineData.filteredFaces.length);
    console.log("Beispiel-Face:", engineData.filteredFaces[0]);
    console.log("Primary Axis:", primaryAxis);
    console.log("Local Wing Space:", localWingSpace);
  }, [mesh, engineData, primaryAxis, localWingSpace]);

  useEffect(() => {
    const action = Object.values(actions || {})[0];
    if (action) action.reset().play();
  }, [actions]);

  useFrame(() => {
    const action = Object.values(actions || {})[0];
    if (!action) return;

    flapRef.current = Math.sin(action.time * 6) * 0.5 + 0.5;
  });
  const marker = primaryAxis?.bodyCenter?.center;
  console.log("BODY CENTER MARKER:", marker);
  
  if (displayMode === "grid") {
    return (
      <group ref={group} scale={28} position={[0, 6, 0]}>
        <gridHelper args={[12, 12, "#7fa8ff", "#4f4f4f"]} position={[0, 0, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#2b2f3a" transparent opacity={0.35} />
        </mesh>
      </group>
    );
  }

  return (
    <>
      <group ref={group} scale={28} position={[0, 6, 0]}>
        {showPrimaryAxis && <primitive object={technicalScene} />}

        {
        <GDLDebug gdl={gdl} showPrimaryAxis={showPrimaryAxis} />
        /*
        <primitive object={scene} />
        <GDLDebug gdl={gdl} />
        <PrimaryGestureDebug gestures={primaryGestures} />
        <GestureTreeDebug flowCurves={gestureTreeFlowCurves} />
        <WingFingerCurvesDebug curves={leftWingFingerCurves} />
        <DoveSurface mesh={mesh} />
        */
        }

        {/*
        {primaryAxisPoints && primaryAxis && (
          <DebugGesture
            points={primaryAxisPoints}
            colors={["red", "orange", "white", "cyan", "blue"]}
            leftTransitionRegion={primaryAxis.leftTransitionRegion}
            rightTransitionRegion={primaryAxis.rightTransitionRegion}
            leftShoulder={primaryAxis.leftShoulder}
            rightShoulder={primaryAxis.rightShoulder}
            leftWingTip={primaryAxis.leftWingTip}
            rightWingTip={primaryAxis.rightWingTip}
            localWingSpace={localWingSpace}
          />
        )}

        <DebugWingCurves root={[-0.8, 1.2, 0]} side={-1} />
        <DebugWingCurves root={[0.8, 1.2, 0]} side={1} />
        */}
      </group>
    </>
  );
}