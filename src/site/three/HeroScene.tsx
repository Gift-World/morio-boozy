import { useEffect, useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  Fog,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SpotLight,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/*
 * "The studio is lit": the Morio logo, extruded from the traced SVG, standing
 * in front of a deep-green wall. A spotlight follows the pointer (or drifts on
 * its own on touch / idle) and throws the logo's shadow onto the wall, an echo
 * of the founders' spotlight portraits. Plain three.js with named imports so
 * the chunk only carries what it uses.
 */

const LOGO_URL = "/assets/brand/morio-logo.svg";
const LOGO_W = 1421; // traced logo width in SVG units

export default function HeroScene({ onReady }: { onReady: () => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const ready = useRef(onReady);
  ready.current = onReady;

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let disposed = false;

    // renderer + scene
    const renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    scene.background = new Color("#0a1210");
    scene.fog = new Fog("#0a1210", 9, 22);
    const camera = new PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    scene.add(new AmbientLight("#ffffff", 0.12));
    scene.add(new HemisphereLight("#d4e0da", "#183c38", 0.25));
    const rim = new DirectionalLight("#9fb6ad", 0.35);
    rim.position.set(-6, 2, 3);
    scene.add(rim);

    const target = new Object3D();
    target.position.set(0, 0, -2);
    scene.add(target);
    const spot = new SpotLight("#fffaf0", 260, 30, 0.42, 0.85, 2);
    spot.position.set(0, 3.2, 6);
    spot.target = target;
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.bias = -0.0004;
    scene.add(spot);

    const wallGeo = new PlaneGeometry(60, 30);
    const wallMat = new MeshStandardMaterial({ color: "#183c38", roughness: 0.92, metalness: 0 });
    const wall = new Mesh(wallGeo, wallMat);
    wall.position.z = -2.4;
    wall.receiveShadow = true;
    scene.add(wall);

    const logoMat = new MeshStandardMaterial({ color: "#f4f1ea", roughness: 0.42, metalness: 0.08 });
    let logo: Mesh | null = null;
    let logoGeo: ExtrudeGeometry | null = null;

    fetch(LOGO_URL)
      .then((r) => r.text())
      .then((text) => {
        if (disposed) return;
        const data = new SVGLoader().parse(text);
        const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
        logoGeo = new ExtrudeGeometry(shapes, { depth: 46, bevelEnabled: true, bevelThickness: 6, bevelSize: 3, bevelSegments: 3, curveSegments: 10 });
        logoGeo.center();
        logoGeo.scale(1, -1, 1); // SVG y points down
        logoGeo.computeVertexNormals();
        logo = new Mesh(logoGeo, logoMat);
        logo.castShadow = true;
        scene.add(logo);
        layout();
      })
      .catch(() => {});

    // sizing
    let mobile = false;
    const layout = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      mobile = w < 768;
      if (logo) {
        const viewW = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
        const s = Math.min(viewW * (mobile ? 0.82 : 0.46), 6.6) / LOGO_W;
        logo.scale.setScalar(s);
      }
    };
    const ro = new ResizeObserver(layout);
    ro.observe(host);
    layout();

    // pointer (window-level: hero text sits above the canvas); touch uses idle drift
    const pointer = new Vector2();
    let lastMove = -1e9;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // render loop, paused while off-screen
    const start = performance.now();
    let prev = start;
    let raf = 0;
    let visible = true;
    let firstFrame = true;
    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const t = (now - start) / 1000;
      const idle = now - lastMove > 2500;
      const px = idle ? Math.sin(t * 0.35) * 0.7 : pointer.x;
      const py = idle ? Math.cos(t * 0.27) * 0.35 + 0.1 : pointer.y;
      const k = 1 - Math.pow(0.0015, dt);
      spot.position.x += (px * 6 - spot.position.x) * k;
      spot.position.y += (py * 4 + 3.2 - spot.position.y) * k;
      target.position.x += (px * 1.6 - target.position.x) * k;
      target.position.y += (py * 0.9 - target.position.y) * k;
      if (logo) {
        logo.rotation.y += (px * 0.22 - logo.rotation.y) * k;
        logo.rotation.x += (-py * 0.12 - logo.rotation.x) * k;
        logo.position.y = (mobile ? 0.35 : 0.2) + Math.sin(t * 0.8) * 0.06;
      }
      renderer.render(scene, camera);
      if (firstFrame && logo) {
        firstFrame = false;
        ready.current();
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(host);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      logoGeo?.dispose();
      logoMat.dispose();
      wallGeo.dispose();
      wallMat.dispose();
      spot.shadow.map?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" />;
}
