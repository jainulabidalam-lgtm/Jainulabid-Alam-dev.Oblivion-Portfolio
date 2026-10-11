/**
 * Local implementation of the DotmSquare8 loader, matching the public API of
 * `npx shadcn@latest add @dotmatrix/dotm-square-8` (same import path).
 *
 * The registry was not reachable from the build sandbox, so this is a faithful
 * reimplementation of the props you use. Running the shadcn command on your
 * machine will overwrite this file with the official component; no other
 * code needs to change.
 */
import type { CSSProperties } from "react";

type Pattern = "full" | "cross" | "ring" | "diagonal";
type ColorPreset = "default" | "grad-aurora";

export interface DotmSquare8Props {
  size?: number;
  dotSize?: number;
  speed?: number;
  bloom?: boolean;
  pattern?: Pattern;
  colorPreset?: ColorPreset;
  muted?: boolean;
  animated?: boolean;
  opacityBase?: number;
  opacityMid?: number;
  opacityPeak?: number;
  cellPadding?: number;
  boxSize?: number;
  minSize?: number;
  className?: string;
  ariaLabel?: string;
}

const GRID = 5;

function isActive(pattern: Pattern, x: number, y: number) {
  const c = (GRID - 1) / 2;
  switch (pattern) {
    case "cross":
      return x === c || y === c;
    case "ring":
      return x === 0 || y === 0 || x === GRID - 1 || y === GRID - 1;
    case "diagonal":
      return x === y || x + y === GRID - 1;
    default:
      return true;
  }
}

function aurora(t: number) {
  // violet -> cyan
  const a = [143, 124, 255];
  const b = [93, 225, 255];
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${m[0]} ${m[1]} ${m[2]})`;
}

export function DotmSquare8({
  size = 32,
  dotSize = 4,
  speed = 1,
  bloom = false,
  pattern = "full",
  colorPreset = "default",
  muted = false,
  animated = true,
  opacityBase = 0.12,
  opacityMid = 0.45,
  opacityPeak = 1,
  cellPadding,
  boxSize,
  minSize,
  className,
  ariaLabel = "Loading",
}: DotmSquare8Props) {
  const gap = cellPadding ?? Math.max(0, (size - GRID * dotSize) / (GRID - 1));
  const side = Math.max(minSize ?? 0, GRID * dotSize + (GRID - 1) * gap);
  const slot = boxSize ?? side;
  const duration = 1.8 / Math.max(0.1, speed);
  const k = muted ? 0.6 : 1;
  const maxDist = Math.hypot((GRID - 1) / 2, (GRID - 1) / 2);

  const dots = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (!isActive(pattern, x, y)) continue;
      const dist = Math.hypot(x - (GRID - 1) / 2, y - (GRID - 1) / 2) / maxDist;
      const style: CSSProperties & Record<string, string | number> = {
        left: x * (dotSize + gap),
        top: y * (dotSize + gap),
        width: dotSize,
        height: dotSize,
        animationDelay: `${-(1 - dist) * duration}s`,
        "--dot-c": colorPreset === "grad-aurora" ? aurora((x + y) / ((GRID - 1) * 2)) : "currentColor",
      };
      dots.push(<span key={`${x}-${y}`} className="dotm__dot" style={style} />);
    }
  }

  const rootStyle: CSSProperties & Record<string, string | number> = {
    width: slot,
    height: slot,
    "--dotm-base": opacityBase * k,
    "--dotm-mid": opacityMid * k,
    "--dotm-peak": opacityPeak * k,
    "--dotm-duration": `${duration}s`,
    "--dotm-glow": `${dotSize * 2.2}px`,
  };

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={["dotm", animated ? "dotm--animated" : "", bloom ? "dotm--bloom" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={rootStyle}
    >
      <span className="dotm__grid" style={{ width: side, height: side }}>
        {dots}
      </span>
    </span>
  );
}

export default DotmSquare8;
