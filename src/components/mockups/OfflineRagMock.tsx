type Box = { x: number; y: number; label: string[] };

const W = 18.5;
const H = 15;
const XS = [5, 28.5, 52, 75.5];
const ROW_A_Y = 17;
const ROW_B_Y = 44;

const ROW_A: Box[] = [
  { x: XS[0], y: ROW_A_Y, label: ["Documents"] },
  { x: XS[1], y: ROW_A_Y, label: ["Chunks"] },
  { x: XS[2], y: ROW_A_Y, label: ["Embed"] },
  { x: XS[3], y: ROW_A_Y, label: ["Vector", "index"] },
];
const ROW_B: Box[] = [
  { x: XS[3], y: ROW_B_Y, label: ["Question"] },
  { x: XS[2], y: ROW_B_Y, label: ["Retrieve"] },
  { x: XS[1], y: ROW_B_Y, label: ["Local", "model"] },
  { x: XS[0], y: ROW_B_Y, label: ["Answer"] },
];

function Node({ b, accent }: { b: Box; accent?: boolean }) {
  const cx = b.x + W / 2;
  const lines = b.label.length;
  return (
    <g>
      <rect
        x={b.x}
        y={b.y}
        width={W}
        height={H}
        rx="3"
        fill={accent ? "rgba(93,225,255,.14)" : "rgba(255,255,255,.06)"}
        stroke={accent ? "rgba(93,225,255,.7)" : "rgba(255,255,255,.22)"}
        strokeWidth=".5"
      />
      {b.label.map((t, i) => (
        <text
          key={t}
          x={cx}
          y={b.y + H / 2 + (i - (lines - 1) / 2) * 4.2 + 1.2}
          textAnchor="middle"
          fontSize={t.length > 8 ? 2.8 : 3.2}
          fontWeight="600"
          fill="#e9eefc"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {t}
        </text>
      ))}
    </g>
  );
}

export function OfflineRagMock() {
  const arrow = { stroke: "rgba(160,170,255,.85)", strokeWidth: 0.7, fill: "none", markerEnd: "url(#rg-arrow)" } as const;
  const midA = ROW_A_Y + H / 2;
  const midB = ROW_B_Y + H / 2;
  const indexCx = XS[3] + W / 2;
  const retrieveCx = XS[2] + W / 2;
  return (
    <div className="mock mock-rag" aria-hidden="true">
      <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMin meet">
        <defs>
          <marker id="rg-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3.2" markerHeight="3.2" orient="auto">
            <path d="M0 0L6 3L0 6z" fill="rgba(160,170,255,.95)" />
          </marker>
        </defs>
        <rect x="2.5" y="9" width="95" height="57" rx="6" fill="rgba(255,255,255,.02)" stroke="rgba(93,225,255,.5)" strokeWidth=".5" strokeDasharray="1.6 1.4" />
        <text x="5.5" y="6.4" fontSize="3.5" fontWeight="600" fill="#7fe6ff" fontFamily="Inter, system-ui, sans-serif" letterSpacing=".3">
          ON THIS DEVICE
        </text>
        {/* ingestion, left to right */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${XS[i] + W + 0.4} ${midA} H${XS[i + 1] - 0.4}`} {...arrow} />
        ))}
        {/* the index feeds retrieval */}
        <path
          d={`M${indexCx} ${ROW_A_Y + H + 0.4} V${ROW_A_Y + H + 5.5} H${retrieveCx} V${ROW_B_Y - 0.6}`}
          stroke="rgba(93,225,255,.75)"
          strokeWidth=".7"
          strokeDasharray="1.2 1"
          fill="none"
          markerEnd="url(#rg-arrow)"
        />
        {/* question to answer, right to left */}
        {[3, 2, 1].map((i) => (
          <path key={i} d={`M${XS[i] - 0.4} ${midB} H${XS[i - 1] + W + 0.4}`} {...arrow} />
        ))}
        {ROW_A.map((b, i) => (
          <Node key={`a-${b.label[0]}`} b={b} accent={i === 3} />
        ))}
        {ROW_B.map((b, i) => (
          <Node key={`b-${b.label[0]}`} b={b} accent={i === 2} />
        ))}
      </svg>
    </div>
  );
}
