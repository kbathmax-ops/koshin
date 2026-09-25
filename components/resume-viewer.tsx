'use client';

import { useCallback, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

const MIN_SCALE = 0.4;
const MAX_SCALE = 6;

type Point = { x: number; y: number };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function ResumeViewer({
  src,
  width,
  height,
  pdfHref,
}: {
  src: string;
  width: number;
  height: number;
  pdfHref: string;
}) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  // Live pointers, so one finger pans and two pinch without extra state churn.
  const pointers = useRef(new Map<number, Point>());
  const panStart = useRef<{ pointer: Point; offset: Point } | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);

  /* Zoom about a fixed point. The transform is translate(offset) scale(s) with
     a 0 0 origin, so the content point under the cursor is
     (screen - offset) / scale — hold that still and solve for the new offset. */
  const zoomAbout = useCallback((nextScale: number, screen: Point) => {
    setScale((prev) => {
      const next = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      setOffset((o) => ({
        x: screen.x - ((screen.x - o.x) / prev) * next,
        y: screen.y - ((screen.y - o.y) / prev) * next,
      }));
      return next;
    });
  }, []);

  const framePoint = (e: { clientX: number; clientY: number }): Point => {
    const r = frameRef.current?.getBoundingClientRect();
    return { x: e.clientX - (r?.left ?? 0), y: e.clientY - (r?.top ?? 0) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      setDragging(true);
      panStart.current = { pointer: { x: e.clientX, y: e.clientY }, offset };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      panStart.current = null;
      setDragging(false);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size >= 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = framePoint({ clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 });
      zoomAbout((dist / pinchStart.current.dist) * pinchStart.current.scale, mid);
      return;
    }

    const start = panStart.current;
    if (!start) return;
    setOffset({
      x: start.offset.x + (e.clientX - start.pointer.x),
      y: start.offset.y + (e.clientY - start.pointer.y),
    });
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      setDragging(false);
      panStart.current = null;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomAbout(scale * Math.exp(-e.deltaY * 0.0015), framePoint(e));
  };

  const nudge = (factor: number) => {
    const r = frameRef.current?.getBoundingClientRect();
    zoomAbout(scale * factor, { x: (r?.width ?? 0) / 2, y: (r?.height ?? 0) / 2 });
  };

  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="rv">
      <style>{`
        .rv { display: flex; flex-direction: column; gap: 0.85rem; }

        .rv-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .rv-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-width: 2.4rem;
          height: 2.4rem;
          padding: 0 0.75rem;
          border-radius: 999px;
          border: 1px solid rgba(18,35,63,0.16);
          background: #eeeeee;
          color: #12233f;
          font-family: var(--font-manrope), Manrope, sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
        }
        .rv-btn:hover { background: #ffffff; color: #2f5d9e; }
        .rv-pct {
          font-family: var(--font-manrope), Manrope, sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: rgba(18,35,63,0.5);
          min-width: 3.5rem;
        }

        /* touch-action none so a drag pans the page rather than scrolling it. */
        .rv-frame {
          position: relative;
          overflow: hidden;
          height: min(78vh, 900px);
          border-radius: 0.75rem;
          background: #e2e2e2;
          border: 1px solid rgba(18,35,63,0.12);
          touch-action: none;
          cursor: grab;
        }
        .rv-frame[data-dragging='true'] { cursor: grabbing; }

        .rv-sheet {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: 0 0;
          will-change: transform;
          box-shadow: 0 10px 40px rgba(18,35,63,0.22);
          background: #ffffff;
        }
        .rv-sheet img { display: block; width: 100%; height: auto; user-select: none; }

        .rv-hint {
          font-family: var(--font-manrope), Manrope, sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(18,35,63,0.45);
        }
      `}</style>

      <div className="rv-bar">
        <button type="button" className="rv-btn" onClick={() => nudge(1 / 1.25)} aria-label="Zoom out">
          <Minus size={15} />
        </button>
        <button type="button" className="rv-btn" onClick={() => nudge(1.25)} aria-label="Zoom in">
          <Plus size={15} />
        </button>
        <span className="rv-pct">{Math.round(scale * 100)}%</span>
        <button type="button" className="rv-btn" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
        <a className="rv-btn" href={pdfHref} target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
        <a className="rv-btn" href={pdfHref} download>
          Download
        </a>
      </div>

      <div
        ref={frameRef}
        className="rv-frame"
        data-dragging={dragging}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onWheel={onWheel}
        onDoubleClick={(e) => zoomAbout(scale > 1.6 ? 1 : 2.2, framePoint(e))}
      >
        <div
          className="rv-sheet"
          style={{
            width: 'min(100%, 760px)',
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        >
          <img src={src} width={width} height={height} alt="Koshin Bathmax résumé" draggable={false} />
        </div>
      </div>

      <p className="rv-hint">Drag to move · scroll or pinch to zoom · double-click to zoom in</p>
    </div>
  );
}
