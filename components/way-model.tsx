"use client";

import { useEffect, useRef } from "react";
import "@/components/way/way.css";
import { buildWay, WAY_BUTTON_POINT } from "@/components/way/build-way";

/**
 * The WAY compass as a draggable 3D model on a transparent canvas. Geometry and
 * materials follow the original model on way-compass.vercel.app. Three.js is
 * loaded only once the model nears the viewport, so it stays out of every other
 * page's bundle and costs nothing for visitors who never scroll to it.
 */
export function WayModel({ className = "aspect-[4/3]" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const label = labelRef.current;
    const pill = label?.querySelector<HTMLElement>(".way-button-label__text");
    if (!stage || !canvas || !label || !pill) return;

    let disposed = false;
    let cleanup = () => {};

    const start = () => import("three").then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 400);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      const model = new THREE.Group();
      const DEFAULT = { x: -0.12, y: -0.48, z: 0.08 };
      model.rotation.set(DEFAULT.x, DEFAULT.y, DEFAULT.z);
      scene.add(model);

      const way = buildWay(THREE, { anisotropy: renderer.capabilities.getMaxAnisotropy() });
      model.add(way.group);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x65675e, 2.2));
      const keyLight = new THREE.DirectionalLight(0xffffff, 5.2);
      keyLight.position.set(-30, 50, 70);
      scene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(0xd8ff88, 3.8);
      rimLight.position.set(45, 15, -35);
      scene.add(rimLight);

      const target = { ...DEFAULT };
      let defaultZoom = 125;
      let targetZoom = defaultZoom;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      const onPointerDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return;
        target.y += (event.clientX - lastX) * 0.008;
        target.x = THREE.MathUtils.clamp(target.x + (event.clientY - lastY) * 0.006, -1.1, 1.1);
        lastX = event.clientX;
        lastY = event.clientY;
      };
      const onPointerUp = () => {
        dragging = false;
      };
      const onKeyDown = (event: KeyboardEvent) => {
        const step = 0.15;
        if (event.key === "ArrowLeft") target.y -= step;
        else if (event.key === "ArrowRight") target.y += step;
        else if (event.key === "ArrowUp") target.x = Math.max(-1.1, target.x - step);
        else if (event.key === "ArrowDown") target.x = Math.min(1.1, target.x + step);
        else if (event.key === "+" || event.key === "=") targetZoom = Math.max(defaultZoom * 0.7, targetZoom - 8);
        else if (event.key === "-") targetZoom = Math.min(defaultZoom * 1.5, targetZoom + 8);
        else if (event.key === "Home") {
          Object.assign(target, DEFAULT);
          targetZoom = defaultZoom;
        } else return;
        event.preventDefault();
      };

      const listeners = new AbortController();
      const { signal } = listeners;
      canvas.addEventListener("pointerdown", onPointerDown, { signal });
      canvas.addEventListener("pointermove", onPointerMove, { signal });
      canvas.addEventListener("pointerup", onPointerUp, { signal });
      canvas.addEventListener("pointercancel", onPointerUp, { signal });
      canvas.addEventListener("keydown", onKeyDown, { signal });

      // Sizes are cached here so the per-frame label update only writes styles.
      let width = 0;
      let height = 0;
      let pillWidth = pill.offsetWidth;
      const resize = () => {
        width = stage.clientWidth;
        height = stage.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        defaultZoom = Math.max(125, 115 / camera.aspect);
        targetZoom = defaultZoom;
        camera.position.z = defaultZoom;
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage);
      resize();
      const pillObserver = new ResizeObserver(() => {
        pillWidth = pill.offsetWidth;
      });
      pillObserver.observe(pill);

      // Keep the button label pinned to the button, hiding it once the face turns away.
      const buttonPoint = new THREE.Vector3(...WAY_BUTTON_POINT);
      const projected = new THREE.Vector3();
      const faceNormal = new THREE.Vector3();
      const placeLabel = () => {
        projected.copy(buttonPoint).applyMatrix4(model.matrixWorld).project(camera);
        const x = ((projected.x + 1) / 2) * width;
        const y = ((1 - projected.y) / 2) * height;
        const facing = faceNormal.set(0, 0, 1).transformDirection(model.matrixWorld).z > 0.25;
        label.style.transform = `translate(${x}px, ${y}px)`;
        // Center the pill under the button but keep it inside the frame.
        const pillLeft = Math.min(Math.max(x - pillWidth / 2, 8), width - pillWidth - 8);
        pill.style.transform = `translateX(${pillLeft - x}px)`;
        label.style.opacity = facing ? "1" : "0";
      };

      const timer = new THREE.Timer();
      let frame = 0;
      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        timer.update(time);
        model.rotation.x += (target.x - model.rotation.x) * 0.075;
        model.rotation.y += (target.y - model.rotation.y) * 0.075;
        model.rotation.z += (target.z - model.rotation.z) * 0.075;
        camera.position.z += (targetZoom - camera.position.z) * 0.09;
        model.position.y = reducedMotion ? 0 : Math.sin(timer.getElapsed() * 0.8) * 0.35;
        renderer.render(scene, camera);
        placeLabel();
      };

      // Only run the frame loop while the model is on screen.
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(frame);
        if (entry.isIntersecting) frame = requestAnimationFrame(animate);
      });
      visibilityObserver.observe(stage);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        pillObserver.disconnect();
        visibilityObserver.disconnect();
        listeners.abort();
        way.dispose();
        renderer.dispose();
      };
    });

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadObserver.disconnect();
        start();
      },
      { rootMargin: "300px" },
    );
    loadObserver.observe(stage);

    return () => {
      disposed = true;
      loadObserver.disconnect();
      cleanup();
    };
  }, []);

  return (
    <div ref={stageRef} className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label="3D model of the WAY compass. Its one button, at the lower right of the face, switches friends with a press and sends an SOS when held. Drag to rotate, or use the arrow keys; plus and minus zoom, Home resets."
        className="block h-full w-full cursor-grab active:cursor-grabbing outline-none touch-pan-y"
      />
      <div
        ref={labelRef}
        className="way-button-label pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-200"
        aria-hidden
      >
        <span className="way-button-label__dot" />
        <span className="way-button-label__line" />
        <span className="way-button-label__text">
          <strong>Button</strong> press to switch friends, hold for SOS
        </span>
      </div>
    </div>
  );
}
