// src/components/debug/RelationshipPoC.jsx

import { useMemo, useState, useEffect } from "react";
import { stepRelationshipEngine } from "../../core/RelationshipEngine";
import { createDoveShapeField } from "../../core/DoveShapeField";

const PAPER_COUNT = 80;

export default function RelationshipPoC() {
  const shapeField = useMemo(() => createDoveShapeField(), []);

  const [papers, setPapers] = useState(() => createInitialPapers(PAPER_COUNT));

  useEffect(() => {
    const timer = setInterval(() => {
      setPapers((current) =>
        stepRelationshipEngine(current, shapeField)
      );
    }, 50);

    return () => clearInterval(timer);
  }, [shapeField]);

  return (
    <group position={[0, 3, 0]}>
      {papers.map((paper) => (
        <mesh
          key={paper.id}
          position={[paper.x * 3, paper.y * 3, 0]}
          rotation={[0, 0, paper.rotation]}
        >
          <planeGeometry args={[0.42, 0.28]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}

function createInitialPapers(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: randomBetween(-2.5, 2.5),
    y: randomBetween(-1.6, 1.8),
    rotation: randomBetween(-0.4, 0.4),
  }));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
