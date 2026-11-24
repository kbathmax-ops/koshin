import type * as THREE_NS from "three";

type Three = typeof THREE_NS;

/** Model units. The body is 52 × 40 with the eyelet past the upper-right corner. */
export const WAY_WIDTH = 52;
export const WAY_HEIGHT = 40;
export const WAY_BUTTON_POINT = [17.8, -11.2, 10.1] as const;

/** LED colours, lit and unlit. Shared with the flat SVG drawing in way-demo. */
export const WAY_LIME = "#d8ff36";
export const WAY_OLIVE = "#56633d";

export type WayLights = {
  /** Direction to point, in radians clockwise from the device's top edge. */
  bearing: number;
  /** How many ring segments to light around the bearing (1, 3, 5) or 12 for the full ring. */
  cluster: number;
  /** 0 = dark, 1 = fully lit. Drives blinking. */
  level: number;
};

export type Way = {
  group: THREE_NS.Group;
  setLights: (lights: WayLights | null) => void;
  dispose: () => void;
};

/**
 * Builds one WAY compass, facing +z with its top edge toward +y. The ring
 * segments stay fixed; only the arrow turns, as on the real display.
 */
export function buildWay(
  THREE: Three,
  { anisotropy = 1 }: { anisotropy?: number } = {},
): Way {
  const group = new THREE.Group();

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
    material: THREE_NS.Material,
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

  const metal = new THREE.MeshStandardMaterial({ color: 0xa7aaa9, roughness: 0.34, metalness: 0.9 });
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
    color: WAY_OLIVE,
    emissive: 0x0e1305,
    emissiveIntensity: 0.2,
    roughness: 0.45,
  });
  const ledOnMaterial = new THREE.MeshStandardMaterial({
    color: WAY_LIME,
    emissive: 0xb6ff12,
    emissiveIntensity: 2.2,
    roughness: 0.25,
  });
  const innerMaterial = new THREE.MeshStandardMaterial({ color: 0x0b0d0a, metalness: 0.1, roughness: 0.62 });

  group.add(roundedSlab(WAY_WIDTH, WAY_HEIGHT, 10.5, 7, metal, 1.9));

  const gasket = roundedSlab(49.7, 37.7, 2.1, 6, gasketMaterial, 1.1);
  gasket.position.z = 6.4;
  group.add(gasket);

  const face = roundedSlab(48.8, 36.8, 1.5, 5.5, darkMetal, 1);
  face.position.z = 8.1;
  group.add(face);

  const lens = new THREE.Mesh(new THREE.CylinderGeometry(13.7, 13.7, 1.35, 64), lensMaterial);
  lens.rotation.x = Math.PI / 2;
  lens.position.set(-1.5, 0, 9.55);
  group.add(lens);

  const innerDisk = new THREE.Mesh(new THREE.CylinderGeometry(9.2, 9.2, 0.55, 64), innerMaterial);
  innerDisk.rotation.x = Math.PI / 2;
  innerDisk.position.set(-1.5, 0, 10.36);
  group.add(innerDisk);

  const ring = new THREE.Group();
  ring.position.set(-1.5, 0, 10.85);
  group.add(ring);

  const segmentGeometry = new THREE.BoxGeometry(1.9, 5.1, 0.65);
  segmentGeometry.translate(0, 0.15, 0);
  const segments: THREE_NS.Mesh[] = [];
  for (let i = 0; i < 12; i += 1) {
    const angle = (i / 12) * Math.PI * 2;
    const segment = new THREE.Mesh(segmentGeometry, ledOffMaterial);
    segment.position.set(Math.sin(angle) * 10.85, Math.cos(angle) * 10.85, 0);
    segment.rotation.z = -angle;
    ring.add(segment);
    segments.push(segment);
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
  arrow.position.set(-1.5, 0, 11.6);
  group.add(arrow);

  const button = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 1.15, 48), metal);
  button.rotation.x = Math.PI / 2;
  button.position.set(...WAY_BUTTON_POINT);
  group.add(button);

  const buttonMark = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.35, 32), ledOffMaterial);
  buttonMark.position.set(WAY_BUTTON_POINT[0], WAY_BUTTON_POINT[1], 10.72);
  group.add(buttonMark);

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
  brandMap.anisotropy = anisotropy;
  const brand = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 2),
    new THREE.MeshBasicMaterial({ map: brandMap, transparent: true, opacity: 0.86 }),
  );
  brand.position.set(17.7, 11.3, 10.8);
  group.add(brand);

  const loop = new THREE.Group();
  loop.add(new THREE.Mesh(new THREE.TorusGeometry(5.2, 2.15, 18, 52), metal));
  const loopInner = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.62, 14, 52), darkMetal);
  loopInner.position.z = 0.2;
  loop.add(loopInner);
  loop.position.set(22.8, 18.5, 0.1);
  loop.rotation.z = -0.48;
  group.add(loop);

  const sidePort = roundedSlab(8.5, 2.2, 0.8, 1, gasketMaterial, 0.28);
  sidePort.rotation.y = Math.PI / 2;
  sidePort.rotation.z = Math.PI / 2;
  sidePort.position.set(-27.7, -6, 0.2);
  group.add(sidePort);

  const dim = new THREE.Color(WAY_OLIVE);
  const lime = new THREE.Color(WAY_LIME);

  const setLights = (lights: WayLights | null) => {
    if (!lights) {
      arrow.material = ledOffMaterial;
      segments.forEach((segment) => (segment.material = ledOffMaterial));
      return;
    }
    const { bearing, cluster, level } = lights;
    ledOnMaterial.color.copy(dim).lerp(lime, level);
    ledOnMaterial.emissiveIntensity = 0.2 + level * 2;
    arrow.material = ledOnMaterial;
    arrow.rotation.z = -bearing;
    const step = (Math.PI * 2) / 12;
    const nearest = Math.round(bearing / step);
    const reach = Math.floor(cluster / 2);
    segments.forEach((segment, i) => {
      const offset = ((((i - nearest) % 12) + 18) % 12) - 6;
      segment.material = cluster >= 12 || Math.abs(offset) <= reach ? ledOnMaterial : ledOffMaterial;
    });
  };

  // Matches the static product shots: arrow turned slightly right, one segment lit.
  setLights({ bearing: 0.55, cluster: 1, level: 1 });

  const dispose = () => {
    group.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    [metal, darkMetal, gasketMaterial, lensMaterial, ledOffMaterial, ledOnMaterial, innerMaterial].forEach((m) =>
      m.dispose(),
    );
    (brand.material as THREE_NS.Material).dispose();
    brandMap.dispose();
  };

  return { group, setLights, dispose };
}
