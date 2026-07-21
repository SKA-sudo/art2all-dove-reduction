export default function PerceptionEngineDebug({
  perceptionState,
  semanticGraph,
  semanticGraphValidation,
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

          {observation.value?.faceCount !== undefined && (
            <div>
              Faces: {observation.value.faceCount}
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

          {observation.value?.progressMin !== undefined && (
            <div>
              Range:{" "}
              {observation.value.progressMin.toFixed(2)}
              {" - "}
              {observation.value.progressMax.toFixed(2)}
            </div>
          )}

          <div>
            Type:{" "}
            {observation.value?.constructor?.name ??
              "Semantic Region"}
          </div>

          <div>
            Confidence: {observation.confidence}
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
            Progress:{" "}
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

      {semanticGraph && (
        <>
          <hr />

          <div
            style={{
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 6,
            }}
          >
            Semantic Graph
          </div>
{semanticGraphValidation && (
  <div
    style={{
      marginBottom: 10,
      padding: 8,
      border: `1px solid ${
        semanticGraphValidation.valid
          ? "rgba(102, 255, 153, 0.6)"
          : "rgba(255, 102, 102, 0.7)"
      }`,
      borderRadius: 4,
      background:
        semanticGraphValidation.valid
          ? "rgba(102, 255, 153, 0.08)"
          : "rgba(255, 102, 102, 0.08)",
    }}
  >
    <div
      style={{
        marginBottom: 6,
        color: semanticGraphValidation.valid
          ? "#66ff99"
          : "#ff6666",
        fontWeight: "bold",
      }}
    >
      Graph Status:{" "}
      {semanticGraphValidation.valid
        ? "VALID"
        : "INVALID"}
    </div>

    <div>
      Nodes:{" "}
      {
        semanticGraphValidation.summary
          .nodeCount
      }
    </div>

    <div>
      Unique Nodes:{" "}
      {
        semanticGraphValidation.summary
          .uniqueNodeCount
      }
    </div>

    <div>
      Edges:{" "}
      {
        semanticGraphValidation.summary
          .edgeCount
      }
    </div>

    <div>
      Errors:{" "}
      {
        semanticGraphValidation.summary
          .errorCount
      }
    </div>

    <div>
      Warnings:{" "}
      {
        semanticGraphValidation.summary
          .warningCount
      }
    </div>

    {semanticGraphValidation.errors.length >
      0 && (
      <div style={{ marginTop: 8 }}>
        <strong>Validation Errors:</strong>

        {semanticGraphValidation.errors.map(
          (error, index) => (
            <div
              key={`${error.type}-${index}`}
              style={{
                marginTop: 4,
                paddingLeft: 8,
                color: "#ff9999",
                fontSize: 11,
              }}
            >
              • {error.message}
            </div>
          )
        )}
      </div>
    )}

    {semanticGraphValidation.warnings
          .length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Warnings:</strong>

            {semanticGraphValidation.warnings.map(
              (warning, index) => (
                <div
                  key={`${warning.type}-${index}`}
                  style={{
                    marginTop: 4,
                    paddingLeft: 8,
                    color: "#ffcc66",
                    fontSize: 11,
                  }}
                >
                  • {warning.message}
                </div>
              )
            )}
          </div>
        )}
      </div>
    )}

          <div>
            <strong>Nodes:</strong>
          </div>

          {semanticGraph.nodes.map((node) => (
            <div
              key={node.id}
              style={{
                paddingLeft: 10,
                fontSize: 11,
              }}
            >
              • {node.id}
            </div>
          ))}

          <div
            style={{
              marginTop: 10,
            }}
          >
            <strong>Edges:</strong>
          </div>

          {semanticGraph.edges.map((edge) => (
            <div
              key={edge.id}
              style={{
                paddingLeft: 10,
                fontSize: 11,
              }}
            >
              {edge.from}
              {" → "}
              {edge.to}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
      
