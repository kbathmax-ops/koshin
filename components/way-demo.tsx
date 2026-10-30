"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import "@/components/way/way.css";
import { WAY_HEIGHT, WAY_LIME, WAY_OLIVE, WAY_WIDTH } from "@/components/way/build-way";

/** CSS defines 1cm as 96px / 2.54. */
const PX_PER_CM = 96 / 2.54;
const FOUND_PX = PX_PER_CM / 2;

/** Dial centre in the 52 × 40 drawing, matching the 3D model's offset lens. */
const DIAL = { x: 24.5, y: 20 };
const ARROW = "M0 -7.7 L3.2 -1.5 L1.25 -2.1 L1.25 5.4 L-1.25 5.4 L-1.25 -2.1 L-3.2 -1.5 Z";

type Lights = { bearing: number; cluster: number; blink: number | null } | null;

/** One WAY seen from above, drawn to the product's proportions. */
function FlatWay({ body, rim, lights }: { body: string; rim: string; lights: Lights }) {
  const step = (Math.PI * 2) / 12;
  const nearest = lights ? Math.round(lights.bearing / step) : 0;
  const reach = lights ? Math.floor(lights.cluster / 2) : -1;
  const lit = (i: number) => {
    if (!lights) return false;
    if (lights.cluster >= 12) return true;
    const offset = ((((i - nearest) % 12) + 18) % 12) - 6;
    return Math.abs(offset) <= reach;
  };
  const segments = Array.from({ length: 12 }, (_, i) => (
    <rect key={i} x={-0.95} y={-13.4} width={1.9} height={5.1} rx={0.4} transform={`rotate(${i * 30})`} />
  ));
  const angle = lights ? (lights.bearing * 180) / Math.PI : 0;
  const blinkStyle = lights?.blink ? ({ "--blink": `${lights.blink}s` } as CSSProperties) : undefined;

  return (
    <svg viewBox="-3 -6 58 52" className="block h-auto w-full overflow-visible" aria-hidden>
      <circle cx={48.5} cy={1} r={4.6} fill="none" stroke={rim} strokeWidth={3} />
      <rect x={0} y={0} width={52} height={40} rx={7} fill={body} stroke={rim} strokeWidth={0.8} />
      <rect x={2.4} y={2.4} width={47.2} height={35.2} rx={5.4} fill="#20231f" stroke="#121411" strokeWidth={0.8} />
      <circle cx={DIAL.x} cy={DIAL.y} r={13.7} fill="#20251c" />
      <circle cx={DIAL.x} cy={DIAL.y} r={8.6} fill="#0b0d0a" />
      <g transform={`translate(${DIAL.x} ${DIAL.y})`}>
        <g fill={WAY_OLIVE}>{segments.filter((_, i) => !lit(i))}</g>
        <g
          className={`way-lit${lights?.blink ? " is-blinking" : ""}`}
          style={blinkStyle}
          fill={lights ? WAY_LIME : WAY_OLIVE}
        >
          {segments.filter((_, i) => lit(i))}
          <path d={ARROW} transform={`rotate(${angle})`} />
        </g>
      </g>
      <circle cx={43.8} cy={31.2} r={3.5} fill={body} stroke={rim} strokeWidth={0.6} />
      <circle cx={43.8} cy={31.2} r={1.25} fill="none" stroke={WAY_OLIVE} strokeWidth={0.3} />
      <text x={43.7} y={8.6} fontSize={2.2} fontWeight={700} fill="#d8d8d2" textAnchor="middle">
        W•Y
      </text>
    </svg>
  );
}

/**
 * Two WAYs on a table: yours (green) fixed in the middle and a friend's (brown)
 * you place and drag. Once started, each points at the other and blinks faster
 * as they close in, going solid within half a centimetre on screen.
 */
export function WayDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  // Friend position as a fraction of the box, so it survives resizing.
  const [friend, setFriend] = useState({ x: 0.14, y: 0.2 });
  const [running, setRunning] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const grab = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) =>
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height }),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Device size on screen, in px.
  const w = Math.min(180, Math.max(88, box.w * 0.18));
  const h = (w * WAY_HEIGHT) / WAY_WIDTH;

  /** Keep the friend inside the box and off your WAY. Takes and returns px from the box centre. */
  const clamp = (x: number, y: number) => {
    x = Math.min(Math.max(x, -box.w / 2 + w / 2 + 6), box.w / 2 - w / 2 - 6);
    y = Math.min(Math.max(y, -box.h / 2 + h / 2 + 12), box.h / 2 - h / 2 - 6);
    const overlapX = w + 2 - Math.abs(x);
    const overlapY = h + 2 - Math.abs(y);
    if (overlapX > 0 && overlapY > 0) {
      if (overlapX < overlapY) x = (x < 0 ? -1 : 1) * (w + 2);
      else y = (y < 0 ? -1 : 1) * (h + 2);
    }
    return { x, y };
  };
  const place = (x: number, y: number) => {
    if (!box.w) return;
    const at = clamp(x, y);
    setFriend({ x: at.x / box.w + 0.5, y: at.y / box.h + 0.5 });
  };

  // Friend offset from your WAY, in px. Clamped again here so a resize can't leave them overlapping.
  const { x: dx, y: dy } = clamp((friend.x - 0.5) * box.w, (friend.y - 0.5) * box.h);

  const toBox = (event: PointerEvent) => {
    const rect = boxRef.current!.getBoundingClientRect();
    return { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 };
  };

  const onFriendDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const point = toBox(event);
    grab.current = { dx: dx - point.x, dy: dy - point.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onFriendMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!grab.current) return;
    const point = toBox(event);
    place(point.x + grab.current.dx, point.y + grab.current.dy);
  };
  const onFriendUp = () => {
    grab.current = null;
  };
  // Tap anywhere else in the box to put the friend there.
  const onBoxDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const point = toBox(event);
    if (Math.abs(point.x) < w / 2 && Math.abs(point.y) < h / 2) return;
    place(point.x, point.y);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-12, 0],
      ArrowRight: [12, 0],
      ArrowUp: [0, -12],
      ArrowDown: [0, 12],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    place(dx + move[0], dy + move[1]);
  };

  // Bearing from you to the friend: 0 = toward the top edge, clockwise.
  const bearing = Math.atan2(dx, -dy);
  const gap = Math.hypot(Math.max(0, Math.abs(dx) - w), Math.max(0, Math.abs(dy) - h));
  const farGap = Math.hypot(Math.max(1, box.w / 2 - w * 1.5), Math.max(1, box.h / 2 - h * 1.5));
  const closeness = 1 - Math.min(1, gap / farGap);
  const found = gap <= FOUND_PX;
  const cluster = found ? 12 : closeness > 0.8 ? 5 : closeness > 0.5 ? 3 : 1;
  const blink = found || reducedMotion ? null : 1.2 + (0.15 - 1.2) * closeness;

  const status = !running ? "Ready" : found ? "Found" : ["Far", "Closer", "Very close"][(cluster - 1) / 2];

  // The drawing has a margin for the eyelet, centred on the body.
  const deviceStyle = (x: number, y: number): CSSProperties => ({
    width: (w * 58) / 52,
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
  });

  return (
    <div className="way-demo">
      {/* Wider than the text column so there's room to move the friend around. */}
      <div
        ref={boxRef}
        tabIndex={0}
        role="application"
        aria-label="WAY demo. Your green WAY sits in the middle. Tap to place the brown WAY, drag it, or move it with the arrow keys."
        onPointerDown={onBoxDown}
        onKeyDown={onKeyDown}
        className="way-demo__box relative left-1/2 aspect-[5/3] w-[min(1040px,calc(100vw-2rem))] -translate-x-1/2 select-none"
      >
        {box.w > 0 && (
          <>
            <div className="way-demo__device" style={deviceStyle(0, 0)}>
              <span className="way-demo__tag">You</span>
              <FlatWay body="#86a64c" rim="#5f7a31" lights={running ? { bearing, cluster, blink } : null} />
            </div>
            <div
              className="way-demo__device way-demo__device--friend"
              style={deviceStyle(dx, dy)}
              onPointerDown={onFriendDown}
              onPointerMove={onFriendMove}
              onPointerUp={onFriendUp}
              onPointerCancel={onFriendUp}
            >
              <span className="way-demo__tag way-demo__tag--friend">Friend</span>
              <FlatWay
                body="#7a5234"
                rim="#553823"
                lights={running ? { bearing: bearing + Math.PI, cluster, blink } : null}
              />
            </div>
          </>
        )}

        <button
          type="button"
          onClick={() => setRunning((on) => !on)}
          aria-pressed={running}
          aria-label={running ? "Stop the demo" : "Start the demo"}
          title={running ? "Stop" : "Start"}
          className="way-start absolute right-4 top-4"
        />
      </div>

      <p
        role="status"
        className="mt-3 min-h-[1.5em] text-center text-sm leading-relaxed"
        style={{
          color: found && running ? "var(--ink)" : "rgb(var(--ink-rgb) / 0.7)",
          fontWeight: found && running ? 600 : 400,
        }}
      >
        {status}
      </p>
    </div>
  );
}
