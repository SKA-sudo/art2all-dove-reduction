const NODE_POSITIONS = {
  BEAK_COMPONENT: {
    x: 150,
    y: 35,
  },

  HEAD_COMPONENT: {
    x: 150,
    y: 90,
  },

  NECK_COMPONENT: {
    x: 150,
    y: 145,
  },

  BODY_COMPONENT: {
    x: 150,
    y: 215,
  },

  LEFT_WING_COMPONENT: {
    x: 55,
    y: 215,
  },

  RIGHT_WING_COMPONENT: {
    x: 245,
    y: 215,
  },

  TAIL_COMPONENT: {
    x: 150,
    y: 290,
  },
};

const NODE_WIDTH = 82;
const NODE_HEIGHT = 34;

function formatNodeLabel(nodeId) {
  return nodeId
    .replace("_COMPONENT", "")
    .replaceAll("_", " ");
}

function getNodePosition(nodeId) {
  return NODE_POSITIONS[nodeId] ?? null;
}

function getEdgeCoordinates(edge) {
  const fromPosition =
    getNodePosition(edge.from);

  const toPosition =
    getNodePosition(edge.to);

  if (!fromPosition || !toPosition) {
    return null;
  }

  return {
    x1: fromPosition.x,
    y1: fromPosition.y,
    x2: toPosition.x,
    y2: toPosition.y,
  };
}

export default function SemanticGraphVisualization({
  semanticGraph,
}) {
  const nodes = Array.isArray(semanticGraph?.nodes)
    ? semanticGraph.nodes
    : [];

  const edges = Array.isArray(semanticGraph?.edges)
    ? semanticGraph.edges
    : [];

  const componentNodes = nodes.filter(
    (node) =>
      node?.type === "COMPONENT" &&
      getNodePosition(node.id)
  );

  const subjectNode = nodes.find(
    (node) => node?.type === "SUBJECT"
  );

  if (componentNodes.length === 0) {
    return (
      <div
        style={{
          padding: 8,
          fontSize: 11,
          opacity: 0.65,
        }}
      >
        No visualizable semantic components.
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: 12,
        padding: 8,
        border:
          "1px solid rgba(255, 255, 255, 0.14)",
        borderRadius: 6,
        background: "rgba(255, 255, 255, 0.025)",
      }}
    >
      <div
        style={{
          marginBottom: 4,
          fontSize: 11,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Semantic Relationship Structure
      </div>

      {subjectNode && (
        <div
          style={{
            marginBottom: 2,
            fontSize: 9,
            textAlign: "center",
            opacity: 0.55,
          }}
        >
          Subject: {subjectNode.id}
        </div>
      )}

      <svg
        viewBox="0 0 300 330"
        role="img"
        aria-label="Semantic Knowledge Graph"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          overflow: "visible",
        }}
      >
        <defs>
          <marker
            id="semantic-graph-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              fill="rgba(127, 212, 255, 0.85)"
            />
          </marker>
        </defs>

        {/* Relationship edges */}
        {edges.map((edge) => {
          const coordinates =
            getEdgeCoordinates(edge);

          if (!coordinates) {
            return null;
          }

          return (
            <g key={edge.id}>
              <title>
                {edge.predicate}
                {"\n"}
                {edge.from}
                {" → "}
                {edge.to}
                {"\n"}
                Confidence:{" "}
                {edge.confidence ?? "-"}
              </title>

              <line
                x1={coordinates.x1}
                y1={coordinates.y1}
                x2={coordinates.x2}
                y2={coordinates.y2}
                stroke="rgba(127, 212, 255, 0.72)"
                strokeWidth="2"
                markerEnd="url(#semantic-graph-arrow)"
              />
            </g>
          );
        })}

        {/* Semantic component nodes */}
        {componentNodes.map((node) => {
          const position =
            getNodePosition(node.id);

          return (
            <g
              key={node.id}
              transform={`translate(${position.x}, ${position.y})`}
            >
              <title>
                {node.id}
                {"\n"}
                Type: {node.type}
                {"\n"}
                Predicate: {node.predicate ?? "-"}
                {"\n"}
                Confidence:{" "}
                {node.confidence ?? "-"}
              </title>

              <rect
                x={-NODE_WIDTH / 2}
                y={-NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="6"
                fill="rgba(25, 42, 55, 0.96)"
                stroke={
                  node.confidence >= 1
                    ? "rgba(102, 255, 153, 0.85)"
                    : "rgba(255, 204, 102, 0.85)"
                }
                strokeWidth="1.5"
              />

              <text
                x="0"
                y="-2"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontFamily="monospace"
                fontSize="9"
                fontWeight="bold"
              >
                {formatNodeLabel(node.id)}
              </text>

              <text
                x="0"
                y="10"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255, 255, 255, 0.58)"
                fontFamily="monospace"
                fontSize="7"
              >
                confidence{" "}
                {node.confidence ?? "-"}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}