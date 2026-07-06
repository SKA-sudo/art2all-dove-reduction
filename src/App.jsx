import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";

import Scene from "./components/Scene";

/* -------------------- APP -------------------- */
export default function App() {
  const [displayMode, setDisplayMode] = useState("wireframe");

  const [layers, setLayers] = useState({
    referenceModel: true,
    wireframe: true,
    landmarks: false,
    semanticRegions: false,
    outline: false,
    flow: false,
    gesture: false,
  });

  const toggleLayer = (layerName) => {
    setLayers((currentLayers) => ({
      ...currentLayers,
      [layerName]: !currentLayers[layerName],
    }));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
      <button onClick={() => toggleLayer("referenceModel")}>
        Reference Model: {layers.referenceModel ? "ON" : "OFF"}
      </button>

        <button onClick={() => toggleLayer("wireframe")}>
          Wireframe: {layers.wireframe ? "ON" : "OFF"}
        </button>

        <button onClick={() => toggleLayer("landmarks")}>
          Landmarks: {layers.landmarks ? "ON" : "OFF"}
        </button>

        <button onClick={() => toggleLayer("semanticRegions")}>
          Semantic Regions: {layers.semanticRegions ? "ON" : "OFF"}
        </button>

        <button onClick={() => toggleLayer("outline")}>
          Outline: {layers.outline ? "ON" : "OFF"}
        </button>

        <button onClick={() => toggleLayer("flow")}>
          Flow: {layers.flow ? "ON" : "OFF"}
        </button>

        <button onClick={() => toggleLayer("gesture")}>
          Gesture: {layers.gesture ? "ON" : "OFF"}
        </button>
      </div>

      <Canvas camera={{ position: [0, 14, 75], fov: 42 }}>
        <Scene
          displayMode={displayMode}
          onDisplayModeChange={setDisplayMode}
          layers={layers}
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