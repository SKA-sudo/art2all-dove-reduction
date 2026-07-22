import * as THREE from "three";
import { useEffect, useMemo } from "react";

const REGION_COLORS = {
  HEAD_COMPONENT: "#ff4d4d",
  BEAK_COMPONENT: "#ff9f43",
  NECK_COMPONENT: "#35d8ff",
  BODY_COMPONENT: "#4d8dff",
  LEFT_WING_COMPONENT: "#54e37a",
  RIGHT_WING_COMPONENT: "#ffe066",
  TAIL_COMPONENT: "#e56cff",
};

const FALLBACK_COLOR = "#ffffff";

function toVector3(value) {
  if (!value) {
    return null;
  }

  if (value.isVector3) {
    return value;
  }

  if (
    Array.isArray(value) &&
    value.length >= 3 &&
    value.every((entry) => Number.isFinite(entry))
  ) {
    return new THREE.Vector3(
      value[0],
      value[1],
      value[2]
    );
  }

  if (
    Number.isFinite(value.x) &&
    Number.isFinite(value.y) &&
    Number.isFinite(value.z)
  ) {
    return new THREE.Vector3(
      value.x,
      value.y,
      value.z
    );
  }

  return null;
}

function getTriangleVertices(element) {
  if (!element) {
    return null;
  }

  const possibleVertexGroups = [
    element.vertices,
    element.points,
    element.positions,
    element.face?.vertices,
    element.face?.points,
  ];

  for (const vertexGroup of possibleVertexGroups) {
    if (
      Array.isArray(vertexGroup) &&
      vertexGroup.length >= 3
    ) {
      const a = toVector3(vertexGroup[0]);
      const b = toVector3(vertexGroup[1]);
      const c = toVector3(vertexGroup[2]);

      if (a && b && c) {
        return [a, b, c];
      }
    }
  }

  const possibleTriangles = [
    [element.a, element.b, element.c],
    [element.v0, element.v1, element.v2],
    [
      element.vertexA,
      element.vertexB,
      element.vertexC,
    ],
    [
      element.face?.a,
      element.face?.b,
      element.face?.c,
    ],
  ];

  for (const triangle of possibleTriangles) {
    const a = toVector3(triangle[0]);
    const b = toVector3(triangle[1]);
    const c = toVector3(triangle[2]);

    if (a && b && c) {
      return [a, b, c];
    }
  }

  return null;
}

function buildRegionGeometry(elements) {
  if (!Array.isArray(elements)) {
    return null;
  }

  const positions = [];

  for (const element of elements) {
    const triangle = getTriangleVertices(element);

    if (!triangle) {
      continue;
    }

    for (const vertex of triangle) {
      positions.push(
        vertex.x,
        vertex.y,
        vertex.z
      );
    }
  }

  if (positions.length === 0) {
    return null;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      positions,
      3
    )
  );

  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return geometry;
}

function SemanticSurfaceRegion({
  surface,
  opacity,
}) {
  const regionId =
    surface?.regionId ??
    surface?.componentId ??
    surface?.id ??
    "UNKNOWN_COMPONENT";

  const elements = Array.isArray(surface?.elements)
    ? surface.elements
    : Array.isArray(surface?.faces)
      ? surface.faces
      : [];

  const geometry = useMemo(
    () => buildRegionGeometry(elements),
    [elements]
  );

  useEffect(() => {
    return () => {
      geometry?.dispose();
    };
  }, [geometry]);

  if (!geometry) {
    return null;
  }

  const color =
    REGION_COLORS[regionId] ??
    FALLBACK_COLOR;

  return (
    <mesh
      geometry={geometry}
      renderOrder={900}
      frustumCulled={false}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthTest
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
      />
    </mesh>
  );
}

export default function DebugSemanticSurface({
  semanticSurface,
  opacity = 0.72,
}) {
  const surfaces = useMemo(() => {
    if (Array.isArray(semanticSurface)) {
      return semanticSurface;
    }

    if (
      Array.isArray(
        semanticSurface?.surfaces
      )
    ) {
      return semanticSurface.surfaces;
    }

    if (
      Array.isArray(
        semanticSurface?.components
      )
    ) {
      return semanticSurface.components;
    }

    return [];
  }, [semanticSurface]);

  if (surfaces.length === 0) {
    return null;
  }

  return (
    <group
      name="debug-semantic-surface"
      renderOrder={900}
    >
      {surfaces.map((surface, index) => {
        const key =
          surface?.id ??
          surface?.regionId ??
          `semantic-surface-${index}`;

        return (
          <SemanticSurfaceRegion
            key={key}
            surface={surface}
            opacity={opacity}
          />
        );
      })}
    </group>
  );
}