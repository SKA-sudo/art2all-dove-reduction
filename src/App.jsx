import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useState } from "react";

import Scene from "./components/Scene";

import PerceptionEngineDebug from "./components/perception/PerceptionEngineDebug";

/* -------------------- APP -------------------- */

export default function App() {
  const [displayMode, setDisplayMode] = useState("wireframe");
  const [emergenceCount, setEmergenceCount] = useState(25);

  const [distributionMode, setDistributionMode] =
    useState("uniform");

  const [showPerceptionMonitor, setShowPerceptionMonitor] =
    useState(false);

    const [perceptionState, setPerceptionState] =
  useState(null);

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
    visualPriority: false,
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
      visualPriority: false,
    });

    setShowPerceptionMonitor(false);
  };

  const panelButtonStyle = {
    minHeight: 20,
    padding: "2px 6px",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: 4,
    background: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: 9,
    lineHeight: 1.1,
    textAlign: "left",
    cursor: "pointer",
  };

  const sectionTitleStyle = {
    marginTop: 2,
    paddingTop: 4,
    borderTop: "1px solid rgba(255, 255, 255, 0.16)",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    opacity: 0.65,
  };

  const presetButtonStyle = {
    ...panelButtonStyle,
    minWidth: 28,
    minHeight: 18,
    padding: "1px 4px",
    fontSize: 8,
    textAlign: "center",
  };

  const getToggleButtonStyle = (isActive) => ({
    ...panelButtonStyle,
    background: isActive
      ? "rgba(90, 170, 255, 0.25)"
      : panelButtonStyle.background,
  });

  const distributionModes = [
    "uniform",
    "silhouette",
    "head",
    "wing",
    "body",
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showPerceptionMonitor && (
        <PerceptionEngineDebug
          perceptionState={perceptionState}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          zIndex: 10,
          width: 160,
          maxHeight: "calc(100vh - 12px)",
          overflowY: "auto",
          boxSizing: "border-box",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 6,
          background: "rgba(12, 14, 20, 0.9)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: 9,
          textAlign: "left",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            marginBottom: 1,
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          Perception Laboratory
        </div>

        <button
          type="button"
          style={getToggleButtonStyle(
            layers.visualEmergence
          )}
          onClick={activateEmergenceCleanView}
        >
          Emergence Clean View
        </button>
        
        <button
          type="button"
          style={getToggleButtonStyle(
            layers.visualPriority
          )}
          onClick={() =>
            toggleLayer("visualPriority")
          }
        >
          Visual Priority:{" "}
          {layers.visualPriority ? "ON" : "OFF"}
        </button>

        <div style={sectionTitleStyle}>
          Reference and perception
        </div>

        <button
          type="button"
          style={getToggleButtonStyle(
            layers.referenceModel
          )}
          onClick={() => toggleLayer("referenceModel")}
        >
          Reference Model:{" "}
          {layers.referenceModel ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.animation)}
          onClick={() => toggleLayer("animation")}
        >
          Animation: {layers.animation ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.wireframe)}
          onClick={() => toggleLayer("wireframe")}
        >
          Wireframe: {layers.wireframe ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.landmarks)}
          onClick={() => toggleLayer("landmarks")}
        >
          Landmarks: {layers.landmarks ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(
            layers.semanticRegions
          )}
          onClick={() => toggleLayer("semanticRegions")}
        >
          Semantic Regions:{" "}
          {layers.semanticRegions ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.outline)}
          onClick={() => toggleLayer("outline")}
        >
          Outline: {layers.outline ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.flow)}
          onClick={() => toggleLayer("flow")}
        >
          Flow: {layers.flow ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          style={getToggleButtonStyle(layers.gesture)}
          onClick={() => toggleLayer("gesture")}
        >
          Gesture: {layers.gesture ? "ON" : "OFF"}
        </button>

        <div style={sectionTitleStyle}>
          Visual emergence
        </div>

        <button
          type="button"
          style={getToggleButtonStyle(
            layers.visualEmergence
          )}
          onClick={() => toggleLayer("visualEmergence")}
        >
          Visual Emergence:{" "}
          {layers.visualEmergence ? "ON" : "OFF"}
        </button>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: "4px 6px",
            borderRadius: 4,
            background: "rgba(0, 0, 0, 0.35)",
            color: "#ffffff",
            fontSize: 8,
          }}
        >
          <span>Elements: {emergenceCount}</span>

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
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 2,
          }}
        >
          {[
            1,
            2,
            5,
            10,
            25,
            50,
            100,
            250,
            500,
            1000,
          ].map((value) => (
            <button
              type="button"
              key={value}
              style={{
                ...presetButtonStyle,
                background:
                  emergenceCount === value
                    ? "rgba(90, 170, 255, 0.32)"
                    : presetButtonStyle.background,
              }}
              onClick={() =>
                setEmergenceCount(value)
              }
            >
              {value}
            </button>
          ))}
        </div>

        <div style={sectionTitleStyle}>
          Distribution
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
          }}
        >
          {distributionModes.map((mode) => (
            <button
              type="button"
              key={mode}
              style={{
                ...presetButtonStyle,
                textTransform: "capitalize",
                background:
                  distributionMode === mode
                    ? "rgba(90, 170, 255, 0.32)"
                    : presetButtonStyle.background,
              }}
              onClick={() =>
                setDistributionMode(mode)
              }
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={sectionTitleStyle}>
          Laboratory tools
        </div>

        <button
          type="button"
          style={getToggleButtonStyle(
            showPerceptionMonitor
          )}
          onClick={() =>
            setShowPerceptionMonitor(
              (current) => !current
            )
          }
        >
          Perception Monitor:{" "}
          {showPerceptionMonitor ? "ON" : "OFF"}
        </button>
      </div>

      <Canvas
        camera={{
          position: [0, 14, 75],
          fov: 42,
        }}
      >
      <Scene
        displayMode={displayMode}
        onDisplayModeChange={setDisplayMode}
        layers={layers}
        emergenceCount={emergenceCount}
        distributionMode={distributionMode}
        onPerceptionStateChange={setPerceptionState}
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