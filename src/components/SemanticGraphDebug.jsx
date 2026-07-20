import "./SemanticGraphDebug.css";

const NODE_WIDTH = 170;
const NODE_HEIGHT = 54;

const NODE_POSITIONS = {
  BEAK_COMPONENT: {
    x: 40,
    y: 50,
  },

  HEAD_COMPONENT: {
    x: 260,
    y: 50,
  },

  NECK_COMPONENT: {
    x: 260,
    y: 160,
  },

  BODY_COMPONENT: {
    x: 260,
    y: 270,
  },

  LEFT_WING_COMPONENT: {
    x: 20,
    y: 400,
  },

  TAIL_COMPONENT: {
    x: 260,
    y: 400,
  },

  RIGHT_WING_COMPONENT: {
    x: 500,
    y: 400,
  },
};

function formatNodeLabel(nodeId) {
  return nodeId
    .replace("_COMPONENT", "")
    .replaceAll("_", " ");
}

function formatEdgeLabel(predicate) {
  return predicate
    .replaceAll("_", " ")
    .toLowerCase();
}

function getNodeCenter(nodeId) {
  const position = NODE_POSITIONS[nodeId];

  if (!position) {
    return null;
  }

  return {
    x: position.x + NODE_WIDTH / 2,
    y: position.y + NODE_HEIGHT / 2,
  };
}

export default function SemanticGraphDebug({
  semanticGraph,
}) {
  if (!semanticGraph) {
    return (
      <section className="semantic-graph-debug">
        <h2>Semantic Knowledge Graph</h2>

        <p>No semantic graph available.</p>
      </section>
    );
  }

  const componentNodes =
    semanticGraph.nodes.filter(
      (node) =>
        node.type === "COMPONENT"
    );

  const visibleEdges =
    semanticGraph.edges.filter(
      (edge) =>
        NODE_POSITIONS[edge.from] &&
        NODE_POSITIONS[edge.to]
    );

  return (
    <section className="semantic-graph-debug">
      <header className="semantic-graph-debug__header">
        <div>
          <h2>Semantic Knowledge Graph</h2>

          <p>
            Visual representation of the validated
            component relationships.
          </p>
        </div>

        <div className="semantic-graph-debug__metrics">
          <span>
            Nodes: {semanticGraph.nodes.length}
          </span>

          <span>
            Edges: {semanticGraph.edges.length}
          </span>
        </div>
      </header>

      <svg
        className="semantic-graph-debug__canvas"
        viewBox="0 0 690 510"
        role="img"
        aria-labelledby="semantic-graph-title semantic-graph-description"
      >
        <title id="semantic-graph-title">
          Semantic dove knowledge graph
        </title>

        <desc id="semantic-graph-description">
          A visual graph showing the beak, head,
          neck, body, wings and tail of the dove
          and their semantic relationships.
        </desc>

        <defs>
          <marker
            id="semantic-graph-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path
              d="M0,0 L0,6 L9,3 z"
              className="semantic-graph-debug__arrow"
            />
          </marker>
        </defs>

        <g className="semantic-graph-debug__edges">
          {visibleEdges.map((edge) => {
            const from =
              getNodeCenter(edge.from);

            const to =
              getNodeCenter(edge.to);

            if (!from || !to) {
              return null;
            }

            const labelX =
              (from.x + to.x) / 2;

            const labelY =
              (from.y + to.y) / 2;

            return (
              <g key={edge.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="semantic-graph-debug__edge"
                  markerEnd="url(#semantic-graph-arrow)"
                />

                <text
                  x={labelX}
                  y={labelY - 8}
                  textAnchor="middle"
                  className="semantic-graph-debug__edge-label"
                >
                  {formatEdgeLabel(
                    edge.predicate
                  )}
                </text>
              </g>
            );
          })}
        </g>

        <g className="semantic-graph-debug__nodes">
          {componentNodes.map((node) => {
            const position =
              NODE_POSITIONS[node.id];

            if (!position) {
              return null;
            }

            return (
              <g
                key={node.id}
                transform={`translate(${position.x} ${position.y})`}
              >
                <rect
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx="10"
                  className="semantic-graph-debug__node"
                />

                <text
                  x={NODE_WIDTH / 2}
                  y={NODE_HEIGHT / 2 + 5}
                  textAnchor="middle"
                  className="semantic-graph-debug__node-label"
                >
                  {formatNodeLabel(node.id)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </section>
  );
}