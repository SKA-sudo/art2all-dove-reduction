import { Grid } from "@react-three/drei";

export default function SpatialGrid() {
  return (
    <Grid
      position={[0, 0, 0]}
      args={[10, 10]}
      cellSize={0.25}
      cellThickness={0.4}
      cellColor="#555"
      sectionSize={1}
      sectionThickness={1}
      sectionColor="#888"
      fadeDistance={30}
      fadeStrength={1}
      infiniteGrid={false}
    />
  );
}