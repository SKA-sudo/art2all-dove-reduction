export default function PerceptionEngineDebug({
  perceptionState,
}) {
  const observations =
    perceptionState?.semanticObservations ?? [];

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
        boxShadow:
          "0 6px 24px rgba(0, 0, 0, 0.35)",
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <strong>Semantic Observations</strong>
      </div>

      {observations.length === 0 && (
        <div>No Semantic Observations</div>
      )}

      {observations.map((observation, index) => (
      <div
        key={
          observation.id ??
          `${observation.predicate}-${observation.subject}-${index}`
        }
          style={{
            marginBottom: 8,
            borderBottom:
              "1px solid rgba(255,255,255,.15)",
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              color: "#7fd4ff",
              fontWeight: "bold",
              marginBottom: 4,
            }}
          >
            {observation.predicate}
          </div>

          <div>
            Subject: {observation.subject}
          </div>

          <div>
            Source: {observation.source}
          </div>

          {observation.value?.faceCount !==
            undefined && (
            <div>
              Faces:{" "}
              {observation.value.faceCount}
            </div>
          )}

          {observation.value?.faces && (
            <div>
              Coverage:{" "}
              {(
                (observation.value.faces.length /
                  9339) *
                100
              ).toFixed(1)}
              %
            </div>
          )}

          {observation.value?.progressMin !==
            undefined && (
            <div>
              Range:{" "}
              {observation.value.progressMin.toFixed(
                2
              )}
              {" - "}
              {observation.value.progressMax.toFixed(
                2
              )}
            </div>
          )}

          <div>
            Type:{" "}
            {observation.value?.constructor?.name ??
              "Semantic Region"}
          </div>

          <div>
            Confidence:{" "}
            {observation.confidence}
          </div>

          <div
            style={{
              color:
                observation.confidence >= 1
                  ? "#66ff99"
                  : "#ffcc66",
            }}
          >
            Status:{" "}
            {observation.confidence >= 1
              ? "VALIDATED"
              : "DISCOVERED"}
          </div>
          <div>
            Progress:
            {" "}
            {observation.value?.progressMin !== undefined
              ? `${(
                  observation.value.progressMin * 100
                ).toFixed(0)}% - ${(
                  observation.value.progressMax * 100
                ).toFixed(0)}%`
              : "-"}
          </div>
        </div>
      ))}
    </div>
  );
}