import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";

import Scene from "./components/Scene";

/* -------------------- APP -------------------- */
export default function App() {
  const [displayMode, setDisplayMode] = useState("wireframe");
  const [showPrimaryAxis, setShowPrimaryAxis] = useState(true);
  return (
    
    <div style={{ width: "100vw", height: "100vh" }}>
      <button
        onClick={() => setShowPrimaryAxis((value) => !value)}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        Toggle Primary Axis
      </button>
        <Canvas camera={{ position: [0, 14, 75], fov: 42 }}>
        <Scene
          displayMode={displayMode}
          onDisplayModeChange={setDisplayMode}
          showPrimaryAxis={showPrimaryAxis}
        />
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