import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";

import Scene from "./components/Scene";

/* -------------------- APP -------------------- */
export default function App() {
  const [displayMode, setDisplayMode] = useState("wireframe");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [8, 5, 8], fov: 22 }}>
        <Scene displayMode={displayMode} onDisplayModeChange={setDisplayMode} />

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}