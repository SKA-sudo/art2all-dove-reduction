import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const START_POSITION = [0, 10, 18];
const START_TARGET = [0, 6, 0];

export default function CameraController({ displayMode, onDisplayModeChange }) {
  const controlsRef = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

       if (key === "r") {
        event.preventDefault();

        camera.position.set(...START_POSITION);
        camera.zoom = 1;
        camera.lookAt(...START_TARGET);
        camera.updateProjectionMatrix();

        if (controlsRef.current) {
          controlsRef.current.target.set(...START_TARGET);
          controlsRef.current.update();
        }

        return;
      }

      if (key === "1") {
        event.preventDefault();
        onDisplayModeChange?.("wireframe");
        return;
      }

      if (key === "2") {
        event.preventDefault();
        onDisplayModeChange?.("grid");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera, onDisplayModeChange]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  }, [displayMode]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      enableRotate
      rotateSpeed={0.6}
      zoomSpeed={1.0}
      minDistance={2.2}
      maxDistance={80}
      target={START_TARGET}
    />
  );
}
