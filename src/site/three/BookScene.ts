// A 3D magazine built from real page images. Each leaf is hinged at the spine
// and turns with a soft bend; the book sits on a shadowed surface and leans
// gently towards the pointer. Rendering is on demand (nothing runs while the
// book is still).
import {
  AmbientLight,
  BufferAttribute,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from "three";

const PAGE_W = 1;
const PAGE_H = 1280 / 905; // matches the exported page images
const SEG = 14; // horizontal segments, for the bend
const GAP = 0.004; // stack spacing between leaves

export interface BookHandle {
  /** number of leaves turned to the left (0 = closed on the cover) */
  setPage: (n: number) => void;
  dispose: () => void;
}

interface Leaf {
  group: Group;
  front: Mesh;
  back: Mesh;
  t: number; // 0 = lying right, 1 = lying left
  base: Float32Array;
}

export function createBook(canvas: HTMLCanvasElement, pages: string[], onReady: () => void): BookHandle {
  const leavesCount = Math.ceil(pages.length / 2);
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);

  scene.add(new AmbientLight(0xffffff, 1.45));
  const key = new DirectionalLight(0xfff4e6, 1.9);
  key.position.set(-2.2, 3.4, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -3;
  key.shadow.camera.right = 3;
  key.shadow.camera.top = 3;
  key.shadow.camera.bottom = -3;
  key.shadow.radius = 9;
  key.shadow.bias = -0.0006;
  scene.add(key);

  // the surface only shows the book's shadow
  const floor = new Mesh(new PlaneGeometry(12, 12), new ShadowMaterial({ opacity: 0.32 }));
  floor.position.z = -0.03;
  floor.receiveShadow = true;
  scene.add(floor);

  const book = new Group();
  scene.add(book);

  const loader = new TextureLoader();
  const textures: (Texture | null)[] = pages.map(() => null);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  let dirty = true;
  const invalidate = () => (dirty = true);

  const paper = () => new MeshStandardMaterial({ color: 0xf2efe8, roughness: 0.82, metalness: 0 });
  const leaves: Leaf[] = [];
  for (let i = 0; i < leavesCount; i++) {
    const geo = new PlaneGeometry(PAGE_W, PAGE_H, SEG, 1);
    geo.translate(PAGE_W / 2, 0, 0); // hinge on the left edge
    const front = new Mesh(geo, paper());
    const backGeo = geo.clone();
    // mirror the back face's texture so it reads correctly once turned
    const uv = backGeo.attributes.uv as BufferAttribute;
    for (let k = 0; k < uv.count; k++) uv.setX(k, 1 - uv.getX(k));
    const back = new Mesh(backGeo, paper());
    (back.material as MeshStandardMaterial).side = 1; // BackSide
    front.castShadow = back.castShadow = true;
    front.receiveShadow = back.receiveShadow = true;
    const group = new Group();
    group.add(front, back);
    book.add(group);
    leaves.push({ group, front, back, t: 0, base: Float32Array.from(geo.attributes.position.array as Float32Array) });
  }

  const load = (index: number) => {
    if (index < 0 || index >= pages.length || textures[index]) return;
    const tex = loader.load(pages[index], () => {
      invalidate();
      if (index === 0) onReady();
    });
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = Math.min(8, maxAniso);
    textures[index] = tex;
    const leaf = leaves[index >> 1];
    const mat = (index % 2 === 0 ? leaf.front : leaf.back).material as MeshStandardMaterial;
    mat.map = tex;
    mat.color.set(0xffffff);
    mat.needsUpdate = true;
  };
  // only the pages around the open spread are fetched
  const loadAround = (page: number) => {
    for (let k = page * 2 - 3; k <= page * 2 + 4; k++) load(k);
  };

  let target = 0;
  let shift = -PAGE_W / 2; // closed book is centred on its cover
  const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
  loadAround(0);

  const bend = (leaf: Leaf) => {
    // a page bows most at the middle of its turn
    const amount = Math.sin(Math.PI * leaf.t) * 0.34;
    for (const mesh of [leaf.front, leaf.back]) {
      const pos = mesh.geometry.attributes.position as BufferAttribute;
      for (let k = 0; k < pos.count; k++) {
        const x = leaf.base[k * 3];
        const u = x / PAGE_W;
        const a = amount * u * u; // curl grows towards the free edge
        pos.setX(k, x * Math.cos(a));
        pos.setZ(k, x * Math.sin(a));
      }
      pos.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }
  };

  const layout = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the open spread (two pages wide) inside the frame, with air around it
    const fov = (camera.fov * Math.PI) / 180;
    const fitH = (PAGE_H * 1.28) / (2 * Math.tan(fov / 2));
    const fitW = (PAGE_W * 2 * 1.14) / (2 * Math.tan(fov / 2) * camera.aspect);
    camera.position.set(0, -0.55, Math.max(fitH, fitW));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(canvas);

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    tilt.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.16;
    tilt.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.1;
    invalidate();
  };
  canvas.addEventListener("pointermove", onMove, { passive: true });

  let raf = 0;
  let last = performance.now();
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    let moving = false;

    leaves.forEach((leaf, i) => {
      const goal = i < target ? 1 : 0;
      if (Math.abs(leaf.t - goal) > 0.0005) {
        // leaves follow one another with a short delay so a jump fans the pages
        leaf.t += (goal - leaf.t) * Math.min(1, dt * 5.2);
        if (Math.abs(leaf.t - goal) < 0.0005) leaf.t = goal;
        moving = true;
        const e = leaf.t * leaf.t * (3 - 2 * leaf.t);
        leaf.group.rotation.y = -Math.PI * e;
        // right-hand stack counts down from the cover; left-hand stack builds up
        leaf.group.position.z = (1 - e) * (leavesCount - i) * GAP + e * (i + 1) * GAP + Math.sin(Math.PI * e) * 0.02;
        bend(leaf);
      }
    });

    const goalShift = target === 0 ? -PAGE_W / 2 : target === leavesCount ? PAGE_W / 2 : 0;
    if (Math.abs(shift - goalShift) > 0.0005) {
      shift += (goalShift - shift) * Math.min(1, dt * 4.5);
      moving = true;
    }
    if (Math.abs(tilt.x - tilt.tx) > 0.0005 || Math.abs(tilt.y - tilt.ty) > 0.0005) {
      tilt.x += (tilt.tx - tilt.x) * Math.min(1, dt * 5);
      tilt.y += (tilt.ty - tilt.y) * Math.min(1, dt * 5);
      moving = true;
    }
    if (!moving && !dirty) return;
    dirty = false;
    book.position.x = shift;
    book.rotation.set(-0.2 + tilt.y, tilt.x, -0.035);
    renderer.render(scene, camera);
  };
  // initial stack positions
  leaves.forEach((leaf, i) => (leaf.group.position.z = (leavesCount - i) * GAP));
  raf = requestAnimationFrame(frame);

  return {
    setPage(n) {
      target = Math.max(0, Math.min(leavesCount, n));
      loadAround(target);
      invalidate();
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      textures.forEach((t) => t?.dispose());
      leaves.forEach((l) => {
        l.front.geometry.dispose();
        l.back.geometry.dispose();
        (l.front.material as MeshStandardMaterial).dispose();
        (l.back.material as MeshStandardMaterial).dispose();
      });
      renderer.dispose();
    },
  };
}
