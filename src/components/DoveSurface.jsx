import { useMemo } from "react";
import Paper from "./Paper";
import { extractFaces } from "../utils/FaceExtractor";
import { filterFaces } from "../utils/FaceFilter";
import { createPlacementData } from "../utils/PlacementEngine";


const drawings = [
  "/drawings/demo/Baum.png",
  "/drawings/demo/Blume.png",
  "/drawings/demo/Erde.png",
  "/drawings/demo/Erde-herz.png",
  "/drawings/demo/Familie.png",
  "/drawings/demo/Friedenstaube.png",
  "/drawings/demo/Haende.png",
  "/drawings/demo/Haus.png",
  "/drawings/demo/Herz.png",
  "/drawings/demo/Hund.png",
  "/drawings/demo/kinder.png",
  "/drawings/demo/Luftballons.png",
  "/drawings/demo/Meer.png",
  "/drawings/demo/Peace-hand.png",
  "/drawings/demo/Peace-Zeichen.png",
  "/drawings/demo/Regenbogen.png",
  "/drawings/demo/Regenbogen2.png",
  "/drawings/demo/Roteblume.png",
  "/drawings/demo/Schmetterling.png",
  "/drawings/demo/Smiley.png",
  "/drawings/demo/Sonne.png",
  "/drawings/demo/Sonnenblume.png",
  "/drawings/demo/Sterne.png",
  "/drawings/demo/Sternschnuppe.png",
  "/drawings/demo/Wolken.png",
];

export default function DoveSurface({ mesh }) {
  
  const placements = useMemo(() => {
  if (!mesh) return [];

  mesh.updateMatrixWorld(true);

  const faces = extractFaces(mesh);
  const filteredFaces = filterFaces(faces);

  return createPlacementData(filteredFaces, drawings);

}, [mesh]);

   return (
  <>
    {placements.map((item, i) => (
      <Paper
        key={i}
        position={item.position}
        normal={item.normal}
        rotation={item.rotation}
        image={item.image}
        scale={item.scale}
      />
    ))}
  </>
);

}