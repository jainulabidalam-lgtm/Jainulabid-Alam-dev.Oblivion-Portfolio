export function MiriusMock() {
  return (
    <div className="mock mock-mirius" aria-hidden="true">
      <div className="mi-prompt">
        <span className="mi-spark">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
          </svg>
        </span>
        <span>Summarise the onboarding policy</span>
      </div>

      <svg className="mi-flow" viewBox="0 0 100 52" fill="none">
        <defs>
          <linearGradient id="mi-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c99a9a" />
            <stop offset="1" stopColor="#8a5f6a" />
          </linearGradient>
        </defs>
        {/* sources */}
        {[4, 19, 34].map((y, i) => (
          <g key={y}>
            <rect x="2" y={y} width="26" height="11" rx="2.6" fill="#fff" stroke="#e3d3c6" strokeWidth=".6" />
            <rect x="5" y={y + 3} width={[15, 18, 12][i]} height="1.7" rx=".85" fill="#b79a98" />
            <rect x="5" y={y + 6.4} width={[19, 12, 17][i]} height="1.7" rx=".85" fill="#dccbc0" />
            <path d={`M28 ${y + 5.5} C 40 ${y + 5.5}, 38 26, 50 26`} stroke="url(#mi-g)" strokeWidth=".9" strokeLinecap="round" />
          </g>
        ))}
        <text x="2" y="51" fontSize="3.6" fill="#8a6f6c" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" letterSpacing=".25">
          SOURCES
        </text>
        {/* orchestrator node */}
        <circle cx="55" cy="26" r="7.4" fill="#fff" stroke="url(#mi-g)" strokeWidth="1.2" />
        <circle cx="55" cy="26" r="3" fill="url(#mi-g)" />
        <path d="M62.4 26 H 70" stroke="url(#mi-g)" strokeWidth=".9" strokeLinecap="round" />
        {/* answer */}
        <rect x="70" y="10" width="28" height="32" rx="3" fill="#fff" stroke="#e3d3c6" strokeWidth=".6" />
        <rect x="74" y="15" width="12" height="2" rx="1" fill="#8a5f6a" />
        <rect x="74" y="21" width="20" height="1.7" rx=".85" fill="#d9c7bd" />
        <rect x="74" y="25.5" width="17" height="1.7" rx=".85" fill="#d9c7bd" />
        <rect x="74" y="30" width="20" height="1.7" rx=".85" fill="#d9c7bd" />
        <rect x="74" y="34.5" width="11" height="1.7" rx=".85" fill="#d9c7bd" />
        <text x="70" y="51" fontSize="3.6" fill="#8a6f6c" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" letterSpacing=".25">
          ANSWER
        </text>
      </svg>
    </div>
  );
}
