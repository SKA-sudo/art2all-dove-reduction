import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";


/* -------------------- TAUBE -------------------- */
function DoveModel({ flapRef }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/peace_dove.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const action = Object.values(actions)[0];
      if (action) {
        action.reset().play();
      }
    }
  }, [actions]);

  useFrame(() => {
    if (!actions) return;

    const action = Object.values(actions)[0];
    if (!action) return;

    flapRef.current = Math.sin(action.time * 6) * 0.5 + 0.5;
  });

  return (
    <group ref={group} scale={20} position={[0, 6, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* -------------------- PARTIKEL -------------------- */
function Particle({ position, target, flapRef }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!ref.current) return;

    const p = ref.current.position;

    // Ziel-Anziehung
    p.x += (target[0] - p.x) * 0.01;
    p.y += (target[1] - p.y) * 0.01;
    p.z += (target[2] - p.z) * 0.01;

    // Flügelschlag-Energie
    const flap = flapRef.current || 0;
    const burst = flap * 0.15;

    p.x += Math.sin(t * 5 + p.y) * burst;
    p.y += Math.cos(t * 5 + p.x) * burst;
    p.z += Math.sin(t * 5 + p.z) * burst;

    // Grundbewegung
    const pulse = Math.sin(t * 2.0 + p.x) * 0.03;

    p.x += pulse;
    p.y += Math.cos(t * 1.5 + p.y) * 0.03;
    p.z += Math.sin(t * 1.8 + p.z) * 0.03;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

/* -------------------- SCENE -------------------- */
function Scene() {
  const count = 100;
  const flapRef = useRef(0);

  // Startpositionen (Chaos)
  const positions = Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 45,
        Math.random() * 30,
        (Math.random() - 0.5) * 45,
  ]);

  // Ziel: einfache „Dove-ähnliche“ Struktur
  const targets = Array.from({ length: count }, (_, i) => {
  const t = i / count;

  const wing = Math.sin(t * Math.PI);

  return [
       (Math.random() - 0.5) * 10 + wing * 8 * (i % 2 ? 1 : -1),
        Math.random() * 40,
        (Math.random() - 0.5) * 6
      ];
});

  return (
    <>
      {/* Licht */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1} />

      {/* Boden */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#faf0f0" />
      </mesh>

      {/* Taube */}
      <DoveModel flapRef={flapRef} />

      {/* Partikel */}
      {positions.map((p, i) => (
        <Particle
  key={i}
        position={p}
        target={targets[i]}
        flapRef={flapRef}
        />
      ))}
    </>
  );
}

/* -------------------- APP -------------------- */
export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 15, 70] }}>
        <Scene />
      </Canvas>
    </div>
  );
}