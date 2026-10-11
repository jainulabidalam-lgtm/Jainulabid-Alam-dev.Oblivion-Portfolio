const SPINES: [number, string][] = [
  [66, "#f2b46b"],
  [82, "#7c6cf0"],
  [58, "#e8765f"],
  [90, "#3fb7c9"],
  [72, "#f4e3b8"],
  [86, "#b66ad8"],
  [62, "#5b8def"],
  [78, "#e8765f"],
  [70, "#f2b46b"],
  [92, "#8fd6b3"],
  [60, "#7c6cf0"],
  [80, "#f4e3b8"],
];

export function BookFlixMock() {
  return (
    <div className="mock mock-book" aria-hidden="true">
      <div className="bk-top">
        <b>BookFlix</b>
        <span className="bk-search">Search the library</span>
      </div>
      <div className="bk-feature">
        <div className="bk-cover">
          <span className="bk-cover-t" />
          <span className="bk-cover-t s" />
          <span className="bk-cover-art" />
        </div>
        <div className="bk-info">
          <span className="bk-pill">Featured</span>
          <span className="bk-line w1" />
          <span className="bk-line w2" />
          <span className="bk-prog">
            <i />
          </span>
          <span className="bk-chips">
            <em>Fiction</em>
            <em>History</em>
          </span>
        </div>
      </div>
      <div className="bk-shelf">
        {SPINES.map(([h, c], i) => (
          <span key={i} style={{ height: `${h}%`, background: c }} />
        ))}
      </div>
    </div>
  );
}
