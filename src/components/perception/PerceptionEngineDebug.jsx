export default function PerceptionEngineDebug({ perceptionState }) {
  const observations = perceptionState?.semanticObservations ?? [];

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        width: 320,
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100vh - 32px)",
        overflowY: "auto",
        boxSizing: "border-box",
        padding: 12,
        background: "rgba(0, 0, 0, 0.82)",
        color: "white",
        fontFamily: "monospace",
        fontSize: 13,
        borderRadius: 8,
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.35)",
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

          <div>
            <strong>{observation.predicate}</strong>
          </div>

          {observation.value?.faces && (
            <div>
              Faces: {observation.value.faces.length}
            </div>
          )}
          {observation.value?.faces && (
            <div>
              Coverage:{" "}
              {(
                (observation.value.faces.length / 9339) *
                100
              ).toFixed(1)}
              %
            </div>
          )}
          {observation.value?.faceCount && (
            <div>
              Region Center Faces:{" "}
              {observation.value.faceCount}
            </div>
          )}

        <div>
          Type:{" "}
          {observation.value?.constructor?.name ??
            "Semantic Region"}
        </div>
        {observation.value?.progressMin !== undefined && (
          <div>
            Range:{" "}
            {observation.value.progressMin.toFixed(2)}
            {" - "}
            {observation.value.progressMax.toFixed(2)}
          </div>
        )}
          <div>
            confidence:
            {" "}
            {observation.value?.faceCount && (
            <div>
              Faces: {observation.value.faceCount}
            </div>
          )}

          {observation.value?.progressMin !== undefined && (
            <div>
              Range: {observation.value.progressMin.toFixed(2)}
              {" - "}
              {observation.value.progressMax.toFixed(2)}
            </div>
          )}
            {observation.confidence}
          </div>
        </div>
      ))}
    </div>
  );
}