import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import PerceptionModel from "./debug/PerceptionModel";

const DOVE_SCALE = 28;
const DOVE_POSITION = [0, 6, 0];
export default function DoveModel({ flapRef, displayMode, layers }) {

  const group = useRef();
  const { scene, animations } = useGLTF("/models/peace_dove.glb");

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = Object.values(actions || {})[0];
    if (!action) return;

    if (layers?.animation) {
      action.paused = false;
      action.play();
    } else {
      action.paused = true;
    }
  }, [actions, layers?.animation]);

  useFrame(() => {
    const action = Object.values(actions || {})[0];
    if (!action || !layers?.animation) return;

    flapRef.current = Math.sin(action.time * 6) * 0.5 + 0.5;
  });

  if (displayMode === "grid") {
    return (
      <group>
        <gridHelper args={[12, 12, "#7fa8ff", "#4f4f4f"]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshBasicMaterial color="#2b2f3a" transparent opacity={0.35} />
        </mesh>
      </group>
    );
  }

  return (
  <group ref={group} scale={DOVE_SCALE} position={DOVE_POSITION}>
    {/* Originalmodell */}
    {layers?.referenceModel && <primitive object={scene} />}

    {/* Wahrnehmungsmodell */}
    <PerceptionModel
        scene={scene}
        layers={layers}
      />
    {/*<primitive object={scene} />*/}
  </group>
  );
}