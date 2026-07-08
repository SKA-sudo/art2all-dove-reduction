export default function PerceptionEngineDebug() {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        padding: 12,
        background: "rgba(0,0,0,0.65)",
        color: "white",
        fontFamily: "monospace",
        fontSize: 13,
        lineHeight: 1.6,
        borderRadius: 8,
      }}
    >
      <div>Perception Engine</div>
      <div>ReferenceModel ✔</div>
      <div>Observation ✔</div>
      <div>PerceptionState ✔</div>
      <div>Extractor ✔</div>
      <div>Experiment -</div>
      <div>Rule -</div>
    </div>
  );
}