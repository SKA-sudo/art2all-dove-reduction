import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Image } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTexture } from "@react-three/drei";
import { Points, PointMaterial } from "@react-three/drei";
import { useGLTF, useAnimations } from "@react-three/drei";



/* -------------------- TAUBE -------------------- */
function DoveModel({ flapRef }) {
  const group = useRef();

  const { scene, animations } = useGLTF("/models/peace_dove.glb");
  const { actions } = useAnimations(animations, group);

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
/* -------------------- LIGHT RAYS -------------------- */
function LightRays() {
  const ref = useRef();
  const texture = useTexture("/textures/godrays.png");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;

    ref.current.rotation.z = Math.sin(t * 0.05) * 0.03;

    ref.current.material.opacity =
      0.25 + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <mesh ref={ref} position={[0, 15, -30]}>
      <planeGeometry args={[300, 300]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        opacity={0.35}
      />
    </mesh>
  );
}
/* -------------------- GLOW PARTICLES -------------------- */
function GlowParticles() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 40; i++) {
      arr.push(
        (Math.random() - 0.5) * 35, // x
        Math.random() * 18 - 2,     // y
        (Math.random() - 0.5) * 20  // z
      );
    }

    return new Float32Array(arr);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!ref.current) return;

    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#fff8d6"
        size={0.25}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}



/* -------------------- DOVE SHAPE -------------------- */
function useDoveShape(items) {
  return useMemo(() => {
    const pts = [];

   const head = items.filter(i => i.zone === "head");
    const body = items.filter(i => i.zone === "body");
    const left = items.filter(i => i.zone === "leftWing");
    const right = items.filter(i => i.zone === "rightWing");
    const tail = items.filter(i => i.zone === "tail");

    let hi = 0;
    let bi = 0;
    let li = 0;
    let ri = 0;
    let ti = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      let x = 0, y = 0, z = 0;

     if (item.zone === "head") {
      const t = head.length ? hi++ / head.length : 0;

      x = 5 + Math.sin(t * Math.PI * 2) * 1.2;
      y = 6.5 + Math.cos(t * Math.PI * 2) * 1.2;
      z = 3;
    } else if (item.zone === "body") {
        const t = body.length ? bi++ / body.length : 0;

        const row = Math.floor(t * 10);
        const col = (t * 8 - row);

        const width = 8 - Math.abs(row - 5) * 0.7;

        x = (col - 0.5) * width * 3.2;
        y = 6 - row * 1.6;
        z = Math.cos(col * Math.PI) * 1.5;
      
    } else if (item.zone === "leftWing") {
  
        const t = left.length ? li++ / left.length : 0;

        const row = Math.floor(t * 5);
        const col = (t * 5 - row);

        x = -4 - col * 18;
        y = 4 + Math.sin(col * Math.PI) * 3 - row * 1.4;
        z = row * 0.8;

   } else if (item.zone === "rightWing") {
      const t = right.length ? ri++ / right.length : 0;

      const row = Math.floor(t * 5);
      const col = (t * 5 - row);

      x = 4 + col * 18;
      y = 6 + Math.sin(col * Math.PI) * 4 - row * 1.4;
      z = row * 0.8;

    } else {
      const t = tail.length ? ti++ / tail.length : 0;

      x = (Math.random() - 0.5) * 4;
      y = -7 - t * 4;
      z = -4 - t * 5;
    }
      pts.push({
        pos: [x, y, z],
        zone: item.zone,
        weight: item.weight ?? 0.6,
      });
    }

    return pts;
  }, [items]);
}

/* -------------------- DOVE -------------------- */
function DoveFromDrawings({ textures, energyRef }) {
  const refs = useRef([]);
  const shape = useDoveShape(textures);

  const zoneConfig = {
    head: { scale: 2.0, drift: 0.002 },
    body: { scale: 1.7, drift: 0.003 },
    leftWing: { scale: 1.25, drift: 0.008 },
    rightWing: { scale: 1.25, drift: 0.008 },
    tail: { scale: 0.9, drift: 0.002 },
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const energy = energyRef.current || 0;

    refs.current.forEach((child, i) => {
      const target = shape[i];
      if (!child || !target) return;

      const p = child.position;
      const cfg = zoneConfig[target.zone] || zoneConfig.core;

      const speed = 0.06;

      p.x += (target.pos[0] - p.x) * speed;
      p.y += (target.pos[1] - p.y) * speed;
      p.z += (target.pos[2] - p.z) * speed;

      p.x += Math.sin(t * 0.5 + i) * cfg.drift;
      p.z += Math.cos(t * 0.4 + i) * cfg.drift;

      child.rotation.z = Math.sin(t * 0.5 + i) * 0.03;
      child.scale.setScalar(cfg.scale * (1 + energy * 0.15));
    });
  });

  return (
    <group>
      {textures.map((item, i) => (
        <Billboard key={i} ref={(el) => (refs.current[i] = el)}>
          <Image
            url={item.src}
            transparent
            toneMapped={false}
            scale={[
              2.2 * (item.zone === "tail" ? 0.9 : 1),
              2.2 * (item.zone === "tail" ? 0.9 : 1),
            ]}
          />
        </Billboard>
      ))}
    </group>
  );
}

/* -------------------- SKY -------------------- */
function Sky() {
  return (
    <mesh position={[0, 0, -80]}>
      <sphereGeometry args={[120, 32, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        uniforms={{
          top: { value: new THREE.Color("#081225") },
          bottom: { value: new THREE.Color("#2b3a67") },
        }}
        vertexShader={`
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 top;
          uniform vec3 bottom;
          varying vec3 vPos;

          void main() {
            float h = vPos.y * 0.01 + 0.5;
            gl_FragColor = vec4(mix(bottom, top, h), 1.0);
          }
        `}
      />
    </mesh>
  );
}

/* -------------------- CLOUDS -------------------- */
function Clouds() {
  const groupRef = useRef();
  const cloudTexture = useTexture("/textures/cloud.png");

  // 🌫️ 2 Layer statt 1
  const clouds = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 18; i++) {
      arr.push({
        id: "far_" + i,
        layer: "far",
        x: (Math.random() - 0.5) * 160,
        y: 15 + Math.random() * 25,
        z: -60 - Math.random() * 140,
        s: 18 + Math.random() * 28,
        o: 0.08 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 22; i++) {
      arr.push({
        id: "near_" + i,
        layer: "near",
        x: (Math.random() - 0.5) * 140,
        y: 5 + Math.random() * 18,
        z: -20 - Math.random() * 100,
        s: 22 + Math.random() * 35,
        o: 0.12 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.children.forEach((mesh, i) => {
      const c = clouds[i];
      if (!c) return;

      const wind = c.layer === "far" ? 0.6 : 1.0;

      mesh.position.x =
        c.x + Math.sin(t * 0.03 + c.phase) * 6 * wind;

      mesh.position.y =
        c.y + Math.sin(t * 0.02 + c.phase) * 2 * wind;

      mesh.position.z =
        c.z + Math.cos(t * 0.025 + c.phase) * 4 * wind;

      const pulse = Math.sin(t * 0.2 + c.phase) * 0.05;

      mesh.material.opacity = c.o + pulse;
    });
  });

  return (
    <group ref={groupRef}>
      {clouds.map((c) => (
        <mesh key={c.id} position={[c.x, c.y, c.z]}>
          <planeGeometry args={[c.s, c.s]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            depthWrite={false}
            opacity={c.o}
            roughness={1}
            metalness={0}
            emissive="#ffffff"
            emissiveIntensity={0.12}
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- SCENE -------------------- */

  

function Scene() {
  const energyRef = useRef(0);
  const flapRef = useRef(0);


  const drawings = useMemo(() => {
  const base = [
  { src: "/drawings/demo/baum.png", zone: "body" },
  { src: "/drawings/demo/blume.png", zone: "body" },
  { src: "/drawings/demo/familie.png", zone: "body" },

  { src: "/drawings/demo/haus.png", zone: "leftWing" },
  { src: "/drawings/demo/herz.png", zone: "leftWing" },

  { src: "/drawings/demo/regenbogen.png", zone: "rightWing" },
  { src: "/drawings/demo/sonne.png", zone: "rightWing" },

  { src: "/drawings/demo/welt.png", zone: "tail" },

  { src: "/drawings/demo/peace.png", zone: "head" },
];

  const result = [];

for (let i = 0; i < 120; i++) {
  const img = base[Math.floor(Math.random() * base.length)];
  let zone;

  if (i < 10) zone = "head";
  else if (i < 45) zone = "body";
  else if (i < 80) zone = "leftWing";
  else if (i < 115) zone = "rightWing";
  else zone = "tail";

  result.push({
    src: img.src,
    zone,
    weight: 0.8 + Math.random() * 0.4,
  });
}

  return result;
}, []);

  return (
    <>
      <fog attach="fog" args={["#0b1220", 45, 140]} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 14, 6]} intensity={2.2} />

      <Sky />
      <Clouds />
        <LightRays position={[0, 12, -50]} />
        <GlowParticles />

      {/* Taube */}
      
      <DoveModel flapRef={flapRef} />
      
    </>
  );
}

/* -------------------- APP -------------------- */
export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 10, 90], fov: 45 }}>
        <Scene />
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.15} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}