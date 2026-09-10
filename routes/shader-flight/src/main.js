import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const errBox = document.getElementById('err');
window.addEventListener('error', (e) => {
  errBox.hidden = false;
  errBox.textContent += (e.message || e.error) + '\n';
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= 3D SCENE ================= */
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.setClearColor(0x030304, 1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030304, 0.016);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
camera.position.set(0, -0.5, 22);

/* ---- studio lights for the 3D logo (shade only, never recolor) ---- */
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.add(new THREE.AmbientLight(0xffffff, 0.15));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
keyLight.position.set(5, 8, 7);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xc8ff3d, 1.8);
rimLight.position.set(-6, -2, -5);
scene.add(rimLight);
const fillLight = new THREE.PointLight(0x88aaff, 50, 60);
fillLight.position.set(-4, 2, 6);
scene.add(fillLight);
/* mouse-follow spotlight: cursor becomes the studio lamp */
const mouseSpot = new THREE.SpotLight(0xffffff, 150, 80, 0.45, 0.55, 1.8);
mouseSpot.position.set(0, 7, 11);
scene.add(mouseSpot);
scene.add(mouseSpot.target);

/* ---- particle field ---- */
const COUNT = 900;
const pos = new Float32Array(COUNT * 3);
const aRand = new Float32Array(COUNT);
const aScale = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const r = 8 + Math.random() * 24;
  const th = Math.random() * Math.PI * 2;
  const ph = Math.acos(2 * Math.random() - 1);
  pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
  pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
  pos[i * 3 + 2] = r * Math.cos(ph);
  aRand[i] = Math.random();
  aScale[i] = 0.5 + Math.random() * 1.6;
}
const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
pGeo.setAttribute('aRand', new THREE.BufferAttribute(aRand, 1));
pGeo.setAttribute('aScale', new THREE.BufferAttribute(aScale, 1));
const pUni = {
  uTime: { value: 0 },
  uPR: { value: Math.min(devicePixelRatio || 1, 1.75) },
  uColA: { value: new THREE.Color(0.95, 0.93, 0.85) },
  uColB: { value: new THREE.Color(0.78, 1.0, 0.24) },
};
const pMat = new THREE.ShaderMaterial({
  uniforms: pUni,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexShader: `
    attribute float aRand; attribute float aScale;
    uniform float uTime; uniform float uPR;
    varying vec3 vCol; varying float vTw;
    uniform vec3 uColA; uniform vec3 uColB;
    void main(){
      vec3 p = position;
      p.y += sin(uTime*0.25 + aRand*6.2831)*0.8;
      p.x += cos(uTime*0.18 + aRand*6.2831)*0.8;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float tw = 0.55 + 0.45*sin(uTime*2.0 + aRand*40.0);
      vTw = tw;
      vCol = mix(uColA, uColB, fract(aRand*7.0));
      gl_PointSize = min(aScale * uPR * tw * (170.0 / -mv.z), 56.0 * uPR);
    }`,
  fragmentShader: `
    varying vec3 vCol; varying float vTw;
    void main(){
      float d = length(gl_PointCoord - 0.5);
      float m = smoothstep(0.5, 0.05, d);
      gl_FragColor = vec4(vCol * vTw, m * 0.55);
    }`,
});
scene.add(new THREE.Points(pGeo, pMat));

/* ---- core: fresnel icosahedron + wire edges + rings + satellites ---- */
const core = new THREE.Group();
scene.add(core);

const fresUni = { uColor: { value: new THREE.Color(0xc8ff3d) } };
const fres = new THREE.Mesh(
  new THREE.IcosahedronGeometry(2.6, 1),
  new THREE.ShaderMaterial({
    uniforms: fresUni,
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vV = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying vec3 vN; varying vec3 vV;
      void main(){
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.5);
        gl_FragColor = vec4(uColor * f * 1.7 + vec3(0.012), 1.0);
      }`,
  })
);
core.add(fres);

const edgeMat = new THREE.LineBasicMaterial({ color: 0xc8ff3d, transparent: true, opacity: 0.85 });
core.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.6, 1)), edgeMat));

const ringMat = new THREE.MeshBasicMaterial({ color: 0xc8ff3d, transparent: true, opacity: 0.5 });
const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.3, 0.015, 8, 160), ringMat);
const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.012, 8, 160), ringMat.clone());
ring2.rotation.x = Math.PI / 2.4;
core.add(ring1, ring2);

const satMat = new THREE.MeshBasicMaterial({ color: 0xc8ff3d });
const sats = [];
for (let i = 0; i < 3; i++) {
  const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), satMat);
  sats.push(s);
  core.add(s);
}
core.position.z = -3.5;

/* ---- 3D logo: brand colors locked (#000000 / #fa1c18), visibility from light only ---- */
const logoGroup = new THREE.Group();
logoGroup.scale.setScalar(0.001);
logoGroup.position.set(3.5, 1.2, -5);
scene.add(logoGroup);
const blackMat = new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.3, metalness: 0.65, clearcoat: 1, clearcoatRoughness: 0.25, side: THREE.DoubleSide });
const redMat = new THREE.MeshStandardMaterial({ color: 0xfa1c18, roughness: 0.4, metalness: 0.1, emissive: 0xfa1c18, emissiveIntensity: 0.5, side: THREE.DoubleSide });
new SVGLoader().load('./logo.svg',
  (data) => {
    const inner = new THREE.Group();
    for (const path of data.paths) {
      const fill = (path.userData.style.fill || '').toLowerCase();
      const mat = fill.indexOf('fa1c18') !== -1 ? redMat : blackMat;
      for (const shape of SVGLoader.createShapes(path)) {
        const g = new THREE.ExtrudeGeometry(shape, { depth: 36, bevelEnabled: true, bevelThickness: 3, bevelSize: 3, bevelSegments: 2 });
        inner.add(new THREE.Mesh(g, mat));
      }
    }
    const box = new THREE.Box3().setFromObject(inner);
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    inner.position.set(-c.x, -c.y, -c.z);
    const outer = new THREE.Group();
    outer.add(inner);
    const sc = 15 / Math.max(size.x, size.y);
    outer.scale.set(sc, -sc, sc);
    logoGroup.add(outer);
  },
  undefined,
  () => { /* logo unavailable: fresnel core remains the hero */ });

/* ---- post: bloom ---- */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.75, 0.5, 0.55);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  pUni.uPR.value = Math.min(devicePixelRatio || 1, 1.75);
}
addEventListener('resize', onResize);
onResize();

/* ---- flight states ---- */
const STATES = [
  { fog: 0x030304, core: 0xc8ff3d, spin: 1.0, scale: 1.0, bloom: 1.0 },
  { fog: 0x041210, core: 0x59f2c7, spin: 0.6, scale: 1.15, bloom: 0.9 },
  { fog: 0x0b0803, core: 0xc8ff3d, spin: 1.6, scale: 0.9, bloom: 1.25 },
  { fog: 0x030304, core: 0xc8ff3d, spin: 0.8, scale: 1.05, bloom: 1.1 },
  { fog: 0x060604, core: 0xe8e2d2, spin: 0.25, scale: 1.25, bloom: 0.7 },
  { fog: 0x04070f, core: 0x7aa2ff, spin: 0.6, scale: 1.0, bloom: 0.9 },
  { fog: 0x050603, core: 0xc8ff3d, spin: 0.4, scale: 0.8, bloom: 1.0 },
];
const CASECOL = [0xc8ff3d, 0x46d8ff, 0xff4dd2, 0xffb020];
const tgt = {
  fog: new THREE.Color(STATES[0].fog),
  core: new THREE.Color(STATES[0].core),
  spin: STATES[0].spin, scale: STATES[0].scale, bloom: STATES[0].bloom,
};
let flight = 0, tFlight = 0, energy = 0, lastY = scrollY;
let mx = 0, my = 0, smx = 0, smy = 0;
addEventListener('pointermove', (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
}, { passive: true });

const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
let tG = 0;
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (!reduced) tG += dt;

  smx += (mx - smx) * 0.05;
  smy += (my - smy) * 0.05;
  flight += (tFlight - flight) * 0.06;
  energy *= 0.93;

  scene.fog.color.lerp(tgt.fog, 0.05);
  renderer.setClearColor(scene.fog.color, 1);
  fresUni.uColor.value.lerp(tgt.core, 0.05);
  edgeMat.color.lerp(tgt.core, 0.05);
  ringMat.color.lerp(tgt.core, 0.05);
  ring2.material.color.lerp(tgt.core, 0.05);
  satMat.color.lerp(tgt.core, 0.05);
  pUni.uColB.value.lerp(tgt.core, 0.05);
  bloom.strength += (tgt.bloom - bloom.strength) * 0.05;

  const p = reduced ? 0 : easeIO(Math.min(Math.max(flight, 0), 1));
  camera.position.z = 22 - 15 * p;
  camera.position.x = smx * 2.4;
  camera.position.y = -0.5 + 2.2 * p + smy * 1.0;
  camera.lookAt(0, 0.3, 0);
  const fov = 55 + energy * 9;
  if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }

  const spin = tgt.spin;
  core.rotation.y += dt * 0.35 * spin;
  core.rotation.x += dt * 0.12 * spin;
  const s = tgt.scale;
  const cs = core.scale.x + (s - core.scale.x) * 0.05;
  core.scale.setScalar(cs * 0.55);
  ring1.rotation.z -= dt * 0.4 * spin;
  ring2.rotation.z += dt * 0.25 * spin;
  sats.forEach((sat, i) => {
    const a = tG * (0.5 + i * 0.2) * spin + (i * Math.PI * 2) / 3;
    sat.position.set(Math.cos(a) * 5.2, Math.sin(a * 1.3) * 1.6, Math.sin(a) * 5.2);
    sat.rotation.x += dt; sat.rotation.y += dt * 1.3;
  });

  logoGroup.rotation.y = Math.sin(tG * 0.12) * 0.35 + smx * 0.4;
  logoGroup.rotation.x = Math.sin(tG * 0.18) * 0.1 + smy * 0.25;
  const ls = Math.max(tgt.scale * (1 - p * 0.4), 0.001);
  logoGroup.scale.setScalar(logoGroup.scale.x + (ls - logoGroup.scale.x) * 0.05);
  logoGroup.position.y = 1.2 + p * 1.5;
  mouseSpot.target.position.set(smx * 10, 1.2 + smy * 6, -5);

  pUni.uTime.value = tG;
  composer.render();
}
animate();

/* ================= DOM ================= */
const secs = [...document.querySelectorAll('section[data-ph]')];
const links = [...document.querySelectorAll('nav a.nl')];
const order = ['home', 'services', 'services', 'cases', 'about', 'about', 'contact'];
let cur = -1, ci = 0;
const skewEls = [...document.querySelectorAll('.skew')];

function applyPhase(ph) {
  const st = STATES[ph];
  tgt.fog.set(st.fog);
  if (!(ph === 3)) tgt.core.set(st.core);
  else tgt.core.set(CASECOL[ci]);
  tgt.spin = st.spin; tgt.scale = st.scale; tgt.bloom = st.bloom;
  document.getElementById('rsec').textContent = '0' + (ph + 1);
  const id = order[ph];
  links.forEach((a) => a.classList.toggle('on', a.dataset.s === id));
}

function onScroll() {
  const y = scrollY, H = innerHeight;
  const max = document.body.scrollHeight - H;
  tFlight = max > 0 ? y / max : 0;
  const v = y - lastY; lastY = y;
  energy = Math.min(Math.abs(v) / 60, 1);
  document.getElementById('rfill').style.height = tFlight * 100 + '%';
  const mid = y + H * 0.45;
  let ph = 0;
  for (const s of secs) if (s.offsetTop <= mid) ph = +s.dataset.ph;
  if (ph !== cur) { cur = ph; applyPhase(ph); }
  const sk = Math.max(-6, Math.min(6, -v * 0.03));
  skewEls.forEach((el) => { el.style.transform = `skewY(${sk}deg)`; });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* loader */
let lp = 0;
const lpct = document.getElementById('lpct'), lbar = document.getElementById('lbar');
const ltick = setInterval(() => {
  lp = Math.min(lp + 8 + Math.random() * 18, 100);
  lpct.textContent = ('00' + Math.floor(lp)).slice(-3);
  lbar.style.width = lp + '%';
  if (lp >= 100) {
    clearInterval(ltick);
    document.getElementById('loader').classList.add('done');
    document.body.classList.add('ready');
  }
}, 110);

/* marquee */
const mqt = 'AI AGENT <b>—</b> 自社開発 <b>—</b> ROBOTICS <b>—</b> コンサルティング <b>—</b> 医療 <b>—</b> 教育 <b>—</b> 小売 <b>—</b> 金融 <b>—</b> ';
document.getElementById('mqin').innerHTML = mqt + mqt + mqt + mqt;

/* hero char split (per line, controlled break) */
document.querySelectorAll('#heroH .hline').forEach((line) => {
  const t = line.textContent;
  line.textContent = '';
  [...t].forEach((c, i) => {
    const mask = document.createElement('span');
    mask.className = 'mask';
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c === ' ' ? ' ' : c;
    s.style.transitionDelay = (i * 30) + 'ms';
    mask.appendChild(s);
    line.appendChild(mask);
  });
});

/* cursor + magnetic */
const dot = document.getElementById('cdot'), ring = document.getElementById('cring');
let tx = -100, ty = -100, rx = -100, ry = -100;
addEventListener('pointermove', (e) => {
  tx = e.clientX; ty = e.clientY;
  dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
}, { passive: true });
(function cl() {
  rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(cl);
})();
document.querySelectorAll('a,button,.dots i').forEach((el) => {
  el.addEventListener('pointerenter', () => ring.classList.add('big'));
  el.addEventListener('pointerleave', () => ring.classList.remove('big'));
});
document.querySelectorAll('.mag').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

/* reveal */
const io = new IntersectionObserver((es) => {
  es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

/* count up */
const cio = new IntersectionObserver((es) => {
  es.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.n;
    let t1 = null;
    const step = (ts) => {
      if (!t1) t1 = ts;
      const p = Math.min((ts - t1) / 1300, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.cu').forEach((el) => cio.observe(el));

/* carousel */
const cases = [
  ['インドアゴルフシステム', 'IoT & AI VISION', '多言語予約機能、自動解錠システム、決済機能、AIスイング改善を実装したインドアゴルフ予約システムを開発しました。'],
  ['240種類の過去問題練習サイト', 'EdTech & Adaptive Learning', 'AI学習支援機能を備えた、240種類の資格試験の過去問題集サイトを開発しました。学習状況をAIが分析し、最適な学習計画を提案します。'],
  ['中学受験AIコンシェルジュ', 'GeoAI & Matching', '家を中心にある学校を地図で可視化し、AIが学校の偏差値・特徴、試験傾向、お子様との相性診断、学校イベントの情報を提供することで、最適な学校選びをサポートするツールです。'],
  ['AIコンシェルジュサービス', '24/7 Hospitality Agent', 'ゲストにより快適で安心な滞在を提供するための 24時間AIサポート製品を開発しました。滞在中のゲストのあらゆる疑問や困りごとにリアルタイムで対応します。'],
];
const ct = document.getElementById('ct'), cs = document.getElementById('cs'),
  cd = document.getElementById('cd'), cidx = document.getElementById('cidx'),
  ghost = document.getElementById('ghost'), dots = document.getElementById('cdots').children;
function show(n) {
  ci = (n + cases.length) % cases.length;
  ct.textContent = cases[ci][0]; cs.textContent = cases[ci][1]; cd.textContent = cases[ci][2];
  cidx.textContent = ('0' + (ci + 1)) + ' / 04 — VIEW PROJECT';
  ghost.textContent = '0' + (ci + 1);
  for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('on', i === ci);
  tgt.core.set(CASECOL[ci]);
}
document.getElementById('cprev').onclick = () => show(ci - 1);
document.getElementById('cnext').onclick = () => show(ci + 1);
for (let d = 0; d < dots.length; d++) ((k) => { dots[k].onclick = () => show(k); })(d);
addEventListener('keydown', (e) => {
  const r = document.getElementById('cases').getBoundingClientRect();
  if (r.top < innerHeight * 0.6 && r.bottom > 0) {
    if (e.key === 'ArrowRight') show(ci + 1);
    if (e.key === 'ArrowLeft') show(ci - 1);
  }
});
