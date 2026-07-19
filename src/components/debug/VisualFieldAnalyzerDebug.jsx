import { Html } from "@react-three/drei";
import { Color } from "three";
import { useEffect, useMemo } from "react";

import VisualFieldAnalyzer from "../../core/perception/VisualFieldAnalyzer";

const BIN_COLORS = [
  "#253494",
  "#2c7fb8",
  "#41b6c4",
  "#7fcdbb",
  "#c7e9b4",
  "#ffffcc",
  "#fed976",
  "#feb24c",
  "#fd8d3c",
  "#e31a1c",
];

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return "0.000";
  }

  return value.toFixed(3);
}

function getBinColor(index, binCount) {
  if (binCount <= 1) {
    return BIN_COLORS[0];
  }

  const colorIndex = Math.round(
    (index / (binCount - 1)) *
      (BIN_COLORS.length - 1)
  );

  return BIN_COLORS[colorIndex];
}

export default function VisualFieldAnalyzerDebug({
  fieldValues,
  binCount = 10,
  showSamples = true,
  showPanel = true,
}) {
  const analysis = useMemo(() => {
    const analyzer = new VisualFieldAnalyzer({
      binCount,
    });

    return analyzer.analyze(fieldValues);
  }, [fieldValues, binCount]);

  useEffect(() => {
  console.group(
    "[Visual Field Analyzer] Direction Field"
  );

  console.log("fieldValues:", fieldValues);

  console.log(
    "fieldValues length:",
    Array.isArray(fieldValues)
      ? fieldValues.length
      : "not an array"
  );

  console.log(
    "first field value:",
    Array.isArray(fieldValues)
      ? fieldValues[0]
      : null
  );

  console.log("analysis:", analysis);

  if (analysis.sampleCount > 0) {
    console.table({
      samples: analysis.sampleCount,
      min: formatNumber(analysis.statistics.min),
      max: formatNumber(analysis.statistics.max),
      mean: formatNumber(analysis.statistics.mean),
      standardDeviation: formatNumber(
        analysis.statistics.standardDeviation
      ),
    });

    console.table(
      analysis.histogram.bins.map((bin) => ({
        bin: bin.index,
        start: formatNumber(bin.start),
        end: formatNumber(bin.end),
        count: bin.count,
        ratio: `${(bin.ratio * 100).toFixed(1)}%`,
      }))
    );
  }

  console.groupEnd();
}, [analysis]);

  
  return (
    <group>
      {showSamples &&
        analysis.histogram.bins.flatMap((bin) => {
          const color = new Color(
            getBinColor(
              bin.index,
              analysis.histogram.binCount
            )
          );

          return bin.entries.map(
            ({ face }, entryIndex) => (
              <mesh
                key={`${bin.index}-${
                  face?.id ?? entryIndex
                }`}
                position={face.center}
                renderOrder={1002}
              >
                <sphereGeometry
                  args={[0.075, 6, 6]}
                />

                <meshBasicMaterial
                  color={color}
                  depthTest={false}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
            )
          );
        })}

      {showPanel && (
        <Html
          fullscreen
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "320px",
              padding: "16px",
              borderRadius: "8px",
              background: "rgba(10, 14, 24, 0.92)",
              color: "#ffffff",
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "12px",
              boxShadow:
                "0 8px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            <div
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Direction Field Analyzer
            </div>
<div
  style={{
    marginBottom: "12px",
    padding: "6px",
    borderRadius: "4px",
    background:
      analysis.sampleCount > 0
        ? "rgba(70, 180, 110, 0.18)"
        : "rgba(220, 80, 80, 0.22)",
  }}
>
  Field values:{" "}
  {Array.isArray(fieldValues)
    ? fieldValues.length
    : "not an array"}
  <br />
  Valid samples: {analysis.sampleCount}
</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px 12px",
                marginBottom: "14px",
              }}
            >
              <span>Samples</span>
              <strong>{analysis.sampleCount}</strong>

              <span>Minimum</span>
              <strong>
                {formatNumber(
                  analysis.statistics.min
                )}
              </strong>

              <span>Maximum</span>
              <strong>
                {formatNumber(
                  analysis.statistics.max
                )}
              </strong>

              <span>Mittelwert</span>
              <strong>
                {formatNumber(
                  analysis.statistics.mean
                )}
              </strong>

              <span>Standardabw.</span>
              <strong>
                {formatNumber(
                  analysis.statistics
                    .standardDeviation
                )}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "4px",
                height: "120px",
                paddingTop: "8px",
                borderTop:
                  "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {analysis.histogram.bins.map(
                (bin) => {
                  const height = Math.max(
                    2,
                    bin.ratio * 100
                  );

                  return (
                    <div
                      key={bin.index}
                      title={`${formatNumber(
                        bin.start
                      )} bis ${formatNumber(
                        bin.end
                      )}: ${bin.count}`}
                      style={{
                        display: "flex",
                        flex: 1,
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9px",
                          opacity: 0.8,
                        }}
                      >
                        {bin.count}
                      </span>

                      <div
                        style={{
                          width: "100%",
                          height: `${height}%`,
                          minHeight: "2px",
                          background: getBinColor(
                            bin.index,
                            analysis.histogram
                              .binCount
                          ),
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6px",
                opacity: 0.7,
                fontSize: "10px",
              }}
            >
              <span>
                {formatNumber(
                  analysis.statistics.min
                )}
              </span>

              <span>Direction Field</span>

              <span>
                {formatNumber(
                  analysis.statistics.max
                )}
              </span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}