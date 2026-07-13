import { useState } from "react";
import { setHeadRegion } from "../../utils/LongitudinalAxisBuilder";

export default function HeadRegionControl() {
  const [value, setValue] = useState(0.92);

  return (
    <div
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
      <div>
        Head Region Start: {value.toFixed(2)}
      </div>

      <input
        type="range"
        min="0.80"
        max="0.99"
        step="0.01"
        value={value}
        onChange={(event) => {
          const nextValue = Number(
            event.target.value
          );

          setValue(nextValue);
          setHeadRegion(nextValue, 1.0);
        }}
      />
    </div>
  );
}