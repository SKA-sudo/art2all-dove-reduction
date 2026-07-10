import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";

import Scene from "./components/Scene";
import perceptionState from "./core/testPipeline";
import PerceptionEngineDebug from "./components/perception/PerceptionEngineDebug";

/* -------------------- APP -------------------- */
export default function App() {
  const [displayMode, setDisplayMode] = useState("wireframe");
  const [emergenceCount, setEmergenceCount] = useState(25);
  const [showPerceptionMonitor, setShowPerceptionMonitor] =
  useState(false);
  const [layers, setLayers] = useState({
      referenceModel: true,
      animation: false,
      wireframe: true,
      landmarks: false,
      semanticRegions: false,
      outline: false,
      flow: false,
      gesture: false,
      visualEmergence: false,
    });

  const toggleLayer = (layerName) => {
    setLayers((currentLayers) => ({
      ...currentLayers,
      [layerName]: !currentLayers[layerName],
    }));
  };
  const activateEmergenceCleanView = () => {
  setLayers({
    referenceModel: false,
    animation: false,
    wireframe: false,
    landmarks: false,
    semanticRegions: false,
    outline: false,
    flow: false,
    gesture: false,
    visualEmergence: true,
  });

  setShowPerceptionMonitor(false);
};

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {showPerceptionMonitor && (
        <PerceptionEngineDebug
          perceptionState={perceptionState}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          width: 250,
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
          boxSizing: "border-box",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderRadius: 10,
          background: "rgba(12, 14, 20, 0.88)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: 14,
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            marginBottom: 4,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Perception Laboratory
        </div>

        <button onClick={activateEmergenceCleanView}>
          Emergence Clean View
        </button>

        <div
          style={{
            marginTop: 6,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Reference and perception
        </div>
      <button onClick={() => toggleLayer("referenceModel")}>
        Reference Model: {layers.referenceModel ? "ON" : "OFF"}
      </button>

      <button onClick={() => toggleLayer("animation")}>
        Animation: {layers.animation ? "ON" : "OFF"}
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
        <hr
          style={{
            width: "100%",
            borderColor: "#666666",
          }}
        />
        <div
          style={{
            marginTop: 6,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Visual emergence experiment
        </div>
        <button
          onClick={() => toggleLayer("visualEmergence")}
        >
          Visual Emergence:{" "}
          {layers.visualEmergence ? "ON" : "OFF"}
        </button>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: 6,
            background: "rgba(0, 0, 0, 0.65)",
            color: "#ffffff",
            fontFamily: "sans-serif",
            fontSize: 13,
          }}
        >
          Elements: {emergenceCount}

          <input
            type="range"
            min="1"
            max="1000"
            step="1"
            value={emergenceCount}
            onChange={(event) =>
              setEmergenceCount(
                Number(event.target.value)
              )
            }
          />
        </label>

        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            maxWidth: 220,
          }}
        >
          {[1, 2, 5, 10, 25, 50, 100, 250, 500, 1000].map(
            (value) => (
              <button
                key={value}
                onClick={() => setEmergenceCount(value)}
              >
                {value}
              </button>
            )
          )}
        </div>
          <div
            style={{
              marginTop: 6,
              paddingTop: 10,
              borderTop: "1px solid rgba(255,255,255,0.18)",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Laboratory tools
          </div>

          <button
            onClick={() =>
              setShowPerceptionMonitor((current) => !current)
            }
          >
            Perception Monitor:{" "}
            {showPerceptionMonitor ? "ON" : "OFF"}
          </button>
      <Canvas camera={{ position: [0, 14, 75], fov: 42 }}>
        <Scene
          displayMode={displayMode}
          onDisplayModeChange={setDisplayMode}
          layers={layers}
          emergenceCount={emergenceCount}
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