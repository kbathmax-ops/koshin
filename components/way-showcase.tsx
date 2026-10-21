"use client";

import { useState } from "react";
import { WayDemo } from "@/components/way-demo";
import { WayModel } from "@/components/way-model";

const VIEWS = [
  { id: "model", label: "3D model" },
  { id: "demo", label: "Demo" },
] as const;

type View = (typeof VIEWS)[number]["id"];

/** The WAY prototype with a switch between the free-turning model and the two-device demo. */
export function WayShowcase() {
  const [view, setView] = useState<View>("model");

  return (
    <div>
      <div
        role="group"
        aria-label="Prototype view"
        className="inline-flex rounded-full p-1"
        style={{ background: "rgb(var(--ink-rgb) / 0.07)" }}
      >
        {VIEWS.map(({ id, label }) => {
          const active = view === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setView(id)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--paper)" : "rgb(var(--ink-rgb) / 0.7)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4">{view === "model" ? <WayModel /> : <WayDemo />}</div>
    </div>
  );
}
