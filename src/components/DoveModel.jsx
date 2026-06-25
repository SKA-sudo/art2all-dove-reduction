import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";


/* -------------------- TAUBE -------------------- */
export default function DoveModel({ flapRef }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/peace_dove.glb");
  const { actions } = useAnimations(animations, group);


useEffect(() => {
  scene.traverse((child) => {
    if (child.isMesh) {
      console.log("Mesh gefunden:", child.name);
      console.log("Vertices:", child.geometry.attributes.position.count);
    }
  });
}, [scene]);


  useEffect(() => {
    const action = Object.values(actions || {})[0];
    if (action) action.reset().play();
  }, [actions]);

  useFrame(() => {
    const action = Object.values(actions || {})[0];
    if (!action) return;

    flapRef.current =
      Math.sin(action.time * 6) * 0.5 + 0.5;
  });

  return (
    <group ref={group} scale={20} position={[0, 6, 0]}>
      <primitive object={scene} />
    </group>
  );
}


