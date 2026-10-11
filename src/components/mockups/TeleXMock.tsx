export function TeleXMock() {
  return (
    <div className="mock mock-telex" aria-hidden="true">
      <div className="tx-rail">
        <span className="tx-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 5l12 14M18 5L6 19" />
          </svg>
        </span>
        <span className="tx-ava a1" />
        <span className="tx-ava a2" />
        <span className="tx-ava a3" />
        <span className="tx-ava a4" />
      </div>
      <div className="tx-chat">
        <div className="tx-head">
          <span className="tx-ava a2 lg" />
          <div>
            <b>Design team</b>
            <i>
              <em /> online
            </i>
          </div>
        </div>
        <div className="tx-msgs">
          <p className="tx-b in">Did the build go through?</p>
          <p className="tx-b out">Yes, deploying now.</p>
          <p className="tx-b in">Perfect. Ping me when it's live.</p>
          <p className="tx-b in typing">
            <span />
            <span />
            <span />
          </p>
        </div>
      </div>
    </div>
  );
}
