export default function PerceptionEngineDebug({ perceptionState }) {
  const observations = perceptionState?.semanticObservations ?? [];

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        padding: 12,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        fontFamily: "monospace",
        fontSize: 13,
        borderRadius: 8,
        minWidth: 340,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <strong>Perception Engine</strong>
      </div>

      {observations.length === 0 && (
        <div>No Semantic Observations</div>
      )}

      {observations.map((observation) => (
        <div
          key={observation.id}
          style={{
            marginBottom: 6,
            borderBottom: "1px solid rgba(255,255,255,.15)",
            paddingBottom: 4,
          }}
        >
          <div>
            <strong>{observation.subject}</strong>
          </div>

          <div>{observation.predicate}</div>

          <div>
            value:
            {" "}
            {observation.value?.constructor?.name ??
              String(observation.value)}
          </div>

          <div>
            confidence:
            {" "}
            {observation.confidence}
          </div>
        </div>
      ))}
    </div>
  );
}