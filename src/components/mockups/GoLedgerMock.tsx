const ROWS = [
  [28, 40, 0],
  [34, 0, 52],
  [22, 36, 0],
  [30, 0, 44],
  [26, 48, 0],
];

export function GoLedgerMock() {
  return (
    <div className="mock mock-ledger" aria-hidden="true">
      <div className="gl-top">
        <b>Ledger</b>
        <span className="gl-period">Entries</span>
      </div>
      <div className="gl-sheet">
        <div className="gl-cols">
          <span>Date</span>
          <span>Entry</span>
          <span className="r">Debit</span>
          <span className="r">Credit</span>
        </div>
        {ROWS.map(([e, d, c], i) => (
          <div className="gl-row" key={i}>
            <span className="gl-bar" style={{ width: "62%" }} />
            <span className="gl-bar" style={{ width: `${e + 30}%` }} />
            <span className="gl-bar r" style={{ width: `${d}%`, opacity: d ? 1 : 0 }} />
            <span className="gl-bar r k" style={{ width: `${c}%`, opacity: c ? 1 : 0 }} />
          </div>
        ))}
        <div className="gl-rule" />
      </div>
    </div>
  );
}
