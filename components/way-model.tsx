"use client";

import { useEffect, useRef } from "react";
import type { Material } from "three";

/**
 * The WAY compass as a draggable 3D model on a transparent canvas. Geometry and
 * materials follow the original model on way-compass.vercel.app. Three.js is
 * loaded on mount so it stays out of every other page's bundle.
 */
export function WayModel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
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

      const roundedRectShape = (width: number, height: number, radius: number) => {
        const x = -width / 2;
        const y = -height / 2;
        const shape = new THREE.Shape();
        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + height - radius);
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        shape.lineTo(x + radius, y + height);
        shape.quadraticCurveTo(x, y + height, x, y + height - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);
        return shape;
      };

      const roundedSlab = (
        width: number,
        height: number,
        depth: number,
        radius: number,
        material: Material,
        bevel = 1.6,
      ) => {
        const geometry = new THREE.ExtrudeGeometry(roundedRectShape(width, height, radius), {
          depth,
          bevelEnabled: true,
          bevelSegments: 5,
          steps: 1,
          bevelSize: bevel,
          bevelThickness: bevel * 0.72,
          curveSegments: 18,
        });
        geometry.center();
        geometry.computeVertexNormals();
        return new THREE.Mesh(geometry, material);
      };

      const aluminum = new THREE.MeshStandardMaterial({ color: 0xa7aaa9, roughness: 0.34, metalness: 0.9 });
      const darkMetal = new THREE.MeshStandardMaterial({ color: 0x20231f, roughness: 0.26, metalness: 0.68 });
      const gasketMaterial = new THREE.MeshStandardMaterial({ color: 0x121411, roughness: 0.82, metalness: 0.04 });
      const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x20251c,
        roughness: 0.2,
        metalness: 0.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      });
      const ledOffMaterial = new THREE.MeshStandardMaterial({
        color: 0x56633d,
        emissive: 0x0e1305,
        emissiveIntensity: 0.2,
        roughness: 0.45,
      });
      const ledOnMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8ff36,
        emissive: 0xb6ff12,
        emissiveIntensity: 2.2,
        roughness: 0.25,
      });
      const innerMaterial = new THREE.MeshStandardMaterial({ color: 0x0b0d0a, metalness: 0.1, roughness: 0.62 });

      model.add(roundedSlab(52, 40, 10.5, 7, aluminum, 1.9));

      const gasket = roundedSlab(49.7, 37.7, 2.1, 6, gasketMaterial, 1.1);
      gasket.position.z = 6.4;
      model.add(gasket);

      const face = roundedSlab(48.8, 36.8, 1.5, 5.5, darkMetal, 1);
      face.position.z = 8.1;
      model.add(face);

      const lens = new THREE.Mesh(new THREE.CylinderGeometry(13.7, 13.7, 1.35, 64), lensMaterial);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(-1.5, 0, 9.55);
      model.add(lens);

      const innerDisk = new THREE.Mesh(new THREE.CylinderGeometry(9.2, 9.2, 0.55, 64), innerMaterial);
      innerDisk.rotation.x = Math.PI / 2;
      innerDisk.position.set(-1.5, 0, 10.36);
      model.add(innerDisk);

      // Arrow and the 12-segment ring, turned slightly toward a friend.
      const indicator = new THREE.Group();
      indicator.position.set(-1.5, 0, 10.85);
      indicator.rotation.z = -0.55;
      model.add(indicator);

      const segmentGeometry = new THREE.BoxGeometry(1.9, 5.1, 0.65);
      segmentGeometry.translate(0, 0.15, 0);
      for (let i = 0; i < 12; i += 1) {
        const angle = (i / 12) * Math.PI * 2;
        const segment = new THREE.Mesh(segmentGeometry, i === 0 ? ledOnMaterial : ledOffMaterial);
        segment.position.set(Math.sin(angle) * 10.85, Math.cos(angle) * 10.85, 0);
        segment.rotation.z = -angle;
        indicator.add(segment);
      }

      const arrowShape = new THREE.Shape();
      arrowShape.moveTo(0, 7.7);
      arrowShape.lineTo(3.2, 1.5);
      arrowShape.lineTo(1.25, 2.1);
      arrowShape.lineTo(1.25, -5.4);
      arrowShape.lineTo(-1.25, -5.4);
      arrowShape.lineTo(-1.25, 2.1);
      arrowShape.lineTo(-3.2, 1.5);
      arrowShape.closePath();
      const arrowGeometry = new THREE.ExtrudeGeometry(arrowShape, {
        depth: 0.55,
        bevelEnabled: true,
        bevelSize: 0.25,
        bevelThickness: 0.18,
        bevelSegments: 2,
      });
      arrowGeometry.center();
      const arrow = new THREE.Mesh(arrowGeometry, ledOnMaterial);
      arrow.position.z = 0.75;
      indicator.add(arrow);

      const button = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 1.15, 48), aluminum);
      button.rotation.x = Math.PI / 2;
      button.position.set(17.8, -11.2, 10.1);
      model.add(button);

      const buttonMark = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.35, 32), ledOffMaterial);
      buttonMark.position.set(17.8, -11.2, 10.72);
      model.add(buttonMark);

      const brandCanvas = document.createElement("canvas");
      brandCanvas.width = 512;
      brandCanvas.height = 128;
      const brandContext = brandCanvas.getContext("2d");
      if (brandContext) {
        brandContext.fillStyle = "#d8d8d2";
        brandContext.font = "700 70px sans-serif";
        brandContext.textAlign = "center";
        brandContext.textBaseline = "middle";
        brandContext.fillText("W•Y", 256, 65);
      }
      const brandMap = new THREE.CanvasTexture(brandCanvas);
      brandMap.colorSpace = THREE.SRGBColorSpace;
      brandMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const brand = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 2),
        new THREE.MeshBasicMaterial({ map: brandMap, transparent: true, opacity: 0.86 }),
      );
      brand.position.set(17.7, 11.3, 10.8);
      model.add(brand);

      const loop = new THREE.Group();
      loop.add(new THREE.Mesh(new THREE.TorusGeometry(5.2, 2.15, 18, 52), aluminum));
      const loopInner = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.62, 14, 52), darkMetal);
      loopInner.position.z = 0.2;
      loop.add(loopInner);
      loop.position.set(22.8, 18.5, 0.1);
      loop.rotation.z = -0.48;
      model.add(loop);

      const sidePort = roundedSlab(8.5, 2.2, 0.8, 1, gasketMaterial, 0.28);
      sidePort.rotation.y = Math.PI / 2;
      sidePort.rotation.z = Math.PI / 2;
      sidePort.position.set(-27.7, -6, 0.2);
      model.add(sidePort);

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

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("keydown", onKeyDown);

      const resize = () => {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
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

      // Only render while the model is on screen.
      let visible = true;
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      visibilityObserver.observe(stage);

      const timer = new THREE.Timer();
      let frame = 0;
      const animate = (time: number) => {
        frame = requestAnimationFrame(animate);
        if (!visible) return;
        timer.update(time);
        model.rotation.x += (target.x - model.rotation.x) * 0.075;
        model.rotation.y += (target.y - model.rotation.y) * 0.075;
        model.rotation.z += (target.z - model.rotation.z) * 0.075;
        camera.position.z += (targetZoom - camera.position.z) * 0.09;
        model.position.y = reducedMotion ? 0 : Math.sin(timer.getElapsed() * 0.8) * 0.35;
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("keydown", onKeyDown);
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          (object.material as Material).dispose();
        });
        brandMap.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={stageRef} className="relative w-full aspect-[4/3]">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label="3D model of the WAY compass. Drag to rotate, or use the arrow keys; plus and minus zoom, Home resets."
        className="block h-full w-full cursor-grab active:cursor-grabbing outline-none touch-pan-y"
      />
    </div>
  );
}
