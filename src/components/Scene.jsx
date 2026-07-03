import { useRef } from "react";
import DoveModel from "./DoveModel";
import CameraController from "./CameraController";
import SpatialGrid from "./SpatialGrid";

/* -------------------- SCENE -------------------- */
export default function Scene({ displayMode, onDisplayModeChange }) {
  const flapRef = useRef(0);

  return (
    <>
      <color attach="background" args={["#202020"]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 8]} intensity={1.5} />

      <CameraController
        displayMode={displayMode}
        onDisplayModeChange={onDisplayModeChange}
      />
      <SpatialGrid />
      <DoveModel flapRef={flapRef} displayMode={displayMode} />
    </>
  );
}