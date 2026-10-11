export function NisaMock() {
  return (
    <div className="mock mock-nisa" aria-hidden="true">
      <div className="ni-top">
        <span>Collection</span>
        <b>NISA</b>
        <span>Bag</span>
      </div>
      <div className="ni-body">
        <div className="ni-arch">
          <svg viewBox="0 0 100 130" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="ni-dress" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fbf4ea" />
                <stop offset="1" stopColor="#ead8c2" />
              </linearGradient>
            </defs>
            <path
              d="M42 22c0-6 3-9 8-9s8 3 8 9l-1 9c3 7 9 13 9 27 0 15-4 28-8 54H34c-4-26-8-39-8-54 0-14 6-20 9-27z"
              fill="url(#ni-dress)"
            />
            <path d="M40 40c6 5 14 5 20 0" stroke="#c46a4b" strokeWidth="1.1" fill="none" opacity=".6" />
          </svg>
        </div>
        <div className="ni-side">
          <p className="ni-kicker">Look 01</p>
          <p className="ni-head">
            Quiet
            <br />
            <i>tailoring</i>
          </p>
          <div className="ni-tiles">
            <span className="t1" />
            <span className="t2" />
            <span className="t3" />
          </div>
        </div>
      </div>
    </div>
  );
}
