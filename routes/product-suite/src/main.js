/**
 * MindX Flagship Edition — Tokyo Minimal Precision
 * Proprietary Interactive Specimen Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroAtmosphere();
  initSpecimenTabs();
  initGolfSpecimen();
  initSchoolSpecimen();
  initExamSpecimen();
  initHospitalitySpecimen();
});

// ==========================================
// 00. Hero Atmospheric Canvas (Deep Quietude)
// ==========================================
function initHeroAtmosphere() {
  const canvas = document.getElementById('heroAtmosphere');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let stars = [];

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
    stars = [];
    const count = Math.floor((w * h) / 18000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.4 + 0.1
      });
    }
  }
  window.addEventListener('resize', resize);
  resize();

  function loop() {
    ctx.clearRect(0, 0, w, h);

    // Subtle Precision Dots
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      ctx.fillStyle = `rgba(242, 237, 228, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Hairline connections
      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dx = s.x - s2.x;
        const dy = s.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.strokeStyle = `rgba(216, 255, 56, ${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ==========================================
// Specimen Tab Ribbon Switching
// ==========================================
function initSpecimenTabs() {
  const tabs = document.querySelectorAll('.specimen-tab-btn');
  const views = document.querySelectorAll('.specimen-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      views.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetView = document.getElementById(`view-${tab.dataset.specimen}`);
      if (targetView) {
        targetView.classList.add('active');
        window.dispatchEvent(new Event('resize'));
      }
    });
  });
}

// ==========================================
// 01. GOLF KINEMATICS SPECIMEN
// ==========================================
function initGolfSpecimen() {
  const canvas = document.getElementById('golfCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let currentFrame = 135; // 0 to 180 (1.35s is impact)
  let isPlaying = false;
  let yaw = -0.32, pitch = 0.12;
  let isDragging = false, lastX = 0, lastY = 0;

  const scrubber = document.getElementById('golfScrubber');
  const timeReadout = document.getElementById('golfTimeReadout');
  const playToggle = document.getElementById('golfPlayToggle');
  const gHeadSpeed = document.getElementById('gHeadSpeed');
  const gBallSpeed = document.getElementById('gBallSpeed');
  const gSmash = document.getElementById('gSmash');

  function resize() {
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    yaw += dx * 0.007;
    pitch = Math.max(-0.4, Math.min(0.5, pitch + dy * 0.007));
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  document.getElementById('golfResetView')?.addEventListener('click', () => {
    yaw = -0.32;
    pitch = 0.12;
  });

  playToggle?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playToggle.textContent = isPlaying ? '⏸ 停止' : '▶ 再生';
  });

  scrubber?.addEventListener('input', (e) => {
    isPlaying = false;
    playToggle.textContent = '▶ 再生';
    currentFrame = parseInt(e.target.value, 10);
    updateReadout();
  });

  document.querySelectorAll('[data-snap]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-snap]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFrame = parseInt(btn.dataset.snap, 10);
      scrubber.value = currentFrame;
      isPlaying = false;
      playToggle.textContent = '▶ 再生';
      updateReadout();
    });
  });

  function updateReadout() {
    const t = currentFrame / 100;
    timeReadout.textContent = `${t.toFixed(2)}s / 1.80s`;

    if (t < 0.9) {
      gHeadSpeed.textContent = (24 + t * 12).toFixed(1);
      gBallSpeed.textContent = '0.0';
      gSmash.textContent = '1.00';
    } else if (t < 1.35) {
      const p = (t - 0.9) / 0.45;
      gHeadSpeed.textContent = (35 + p * 13.2).toFixed(1);
      gBallSpeed.textContent = (p * 50).toFixed(1);
      gSmash.textContent = (1.0 + p * 0.43).toFixed(2);
    } else {
      gHeadSpeed.textContent = '48.2';
      gBallSpeed.textContent = '68.7';
      gSmash.textContent = '1.43';
    }
  }

  function project(x, y, z) {
    const cx = w / 2;
    const cy = h / 2 + 20;
    const fov = 440;

    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    let x1 = x * cosY - z * sinY;
    let z1 = z * cosY + x * sinY;

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    let y1 = y * cosP - z1 * sinP;
    let z2 = z1 * cosP + y * sinP + 330;

    const scale = fov / Math.max(z2, 20);
    return { x: cx + x1 * scale, y: cy - y1 * scale, scale };
  }

  const trail = [];

  function render() {
    ctx.clearRect(0, 0, w, h);

    if (isPlaying) {
      currentFrame += 0.8;
      if (currentFrame > 180) currentFrame = 0;
      scrubber.value = Math.round(currentFrame);
      updateReadout();
    }

    const t = currentFrame / 100;

    // Minimal Ground Grid
    const gy = -110;
    ctx.strokeStyle = 'rgba(240, 237, 230, 0.04)';
    ctx.lineWidth = 0.5;
    for (let x = -120; x <= 120; x += 30) {
      const p1 = project(x, gy, -120);
      const p2 = project(x, gy, 120);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
    for (let z = -120; z <= 120; z += 30) {
      const p1 = project(-120, gy, z);
      const p2 = project(120, gy, z);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Kinematic Joint Angles
    let rotShoulder = 0, rotPelvis = 0, armAngle = 0, clubAngle = 0;
    if (t < 0.9) {
      const p = t / 0.9;
      rotShoulder = p * Math.PI * 0.48;
      rotPelvis = p * Math.PI * 0.22;
      armAngle = p * 1.8;
      clubAngle = p * 2.2;
    } else if (t < 1.35) {
      const p = (t - 0.9) / 0.45;
      rotShoulder = Math.PI * 0.48 - p * Math.PI * 0.58;
      rotPelvis = Math.PI * 0.22 - p * Math.PI * 0.42;
      armAngle = 1.8 - p * 2.2;
      clubAngle = 2.2 - p * 3.0;
    } else {
      const p = (t - 1.35) / 0.45;
      rotShoulder = -Math.PI * 0.1 - p * Math.PI * 0.45;
      rotPelvis = -Math.PI * 0.2 - p * Math.PI * 0.35;
      armAngle = -0.4 - p * 1.2;
      clubAngle = -0.8 - p * 1.4;
    }

    const neck = { x: 0, y: 38, z: 8 };
    const head = { x: 0, y: 52, z: 10 };
    const pelvis = { x: 0, y: -20, z: 0 };
    const sWidth = 22;
    const lShoulder = {
      x: neck.x - Math.cos(rotShoulder) * sWidth,
      y: neck.y,
      z: neck.z - Math.sin(rotShoulder) * sWidth
    };
    const rShoulder = {
      x: neck.x + Math.cos(rotShoulder) * sWidth,
      y: neck.y,
      z: neck.z + Math.sin(rotShoulder) * sWidth
    };
    const hands = {
      x: -Math.sin(armAngle) * 32 - 4,
      y: neck.y - Math.cos(armAngle) * 28 - 14,
      z: 18 + Math.cos(armAngle) * 18
    };
    const clubHead = {
      x: hands.x - Math.sin(clubAngle) * 56,
      y: hands.y - Math.cos(clubAngle) * 56,
      z: hands.z - Math.sin(rotShoulder) * 22
    };
    const footL = { x: -26, y: -110, z: 0 };
    const footR = { x: 26, y: -110, z: 0 };
    const kneeL = { x: -22, y: -65, z: 6 };
    const kneeR = { x: 22, y: -65, z: 6 };

    // Record trail
    trail.push({ ...clubHead });
    if (trail.length > 24) trail.shift();

    // Draw Trail Ribbon
    if (trail.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const p = project(trail[i].x, trail[i].y, trail[i].z);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(216, 255, 56, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Impact Wave
    if (Math.abs(t - 1.35) < 0.06) {
      const pImp = project(clubHead.x, clubHead.y, clubHead.z);
      ctx.strokeStyle = '#d8ff38';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pImp.x, pImp.y, 22 * pImp.scale, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw Skeleton Wireframe (Pure White & Acid Green Accent)
    const pts = {
      head: project(head.x, head.y, head.z),
      neck: project(neck.x, neck.y, neck.z),
      pelvis: project(pelvis.x, pelvis.y, pelvis.z),
      lS: project(lShoulder.x, lShoulder.y, lShoulder.z),
      rS: project(rShoulder.x, rShoulder.y, rShoulder.z),
      hands: project(hands.x, hands.y, hands.z),
      club: project(clubHead.x, clubHead.y, clubHead.z),
      kL: project(kneeL.x, kneeL.y, kneeL.z),
      kR: project(kneeR.x, kneeR.y, kneeR.z),
      fL: project(footL.x, footL.y, footL.z),
      fR: project(footR.x, footR.y, footR.z)
    };

    function wire(p1, p2, col = 'rgba(242, 237, 228, 0.7)') {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    wire(pts.head, pts.neck);
    wire(pts.neck, pts.pelvis);
    wire(pts.lS, pts.rS);
    wire(pts.lS, pts.hands, 'rgba(242, 237, 228, 0.9)');
    wire(pts.rS, pts.hands, 'rgba(242, 237, 228, 0.9)');
    wire(pts.hands, pts.club, '#ffffff');
    wire(pts.pelvis, pts.kL);
    wire(pts.pelvis, pts.kR);
    wire(pts.kL, pts.fL);
    wire(pts.kR, pts.fR);

    // Points
    Object.values(pts).forEach(p => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Club Head Accent
    ctx.fillStyle = '#d8ff38';
    ctx.beginPath();
    ctx.arc(pts.club.x, pts.club.y, 5 * pts.club.scale, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // IoT Buttons
  const btnUnlock = document.getElementById('btnGolfUnlock');
  const lockStatus = document.getElementById('lockStatus');
  const golfLogStream = document.getElementById('golfLogStream');
  let isUnlocked = false;

  btnUnlock?.addEventListener('click', () => {
    isUnlocked = !isUnlocked;
    if (isUnlocked) {
      lockStatus.textContent = 'UNLOCKED 🔓';
      lockStatus.style.color = '#d8ff38';
      golfLogStream.textContent = '▶ [IoT] 会員 #MX-8821 遠隔解錠パルス送出 200 OK (5秒後に自動施錠)';
      setTimeout(() => {
        isUnlocked = false;
        lockStatus.textContent = 'LOCKED 🔒';
        lockStatus.style.color = '';
        golfLogStream.textContent = '▶ [IoT] 自動施錠完了 (打席入室センサー検知)';
      }, 5000);
    }
  });

  const btnScene = document.getElementById('btnGolfScene');
  const sceneStatus = document.getElementById('sceneStatus');
  const sceneModes = ['競技モード (20℃)', 'AI指導モード (21.5℃)', '省エネ待機 (23℃)'];
  let sIdx = 0;
  btnScene?.addEventListener('click', () => {
    sIdx = (sIdx + 1) % sceneModes.length;
    sceneStatus.textContent = sceneModes[sIdx];
    golfLogStream.textContent = `▶ [BACnet] 環境プリセット切替: ${sceneModes[sIdx]}`;
  });
}

// ==========================================
// 02. TOKYO PRESTIGIOUS SCHOOL SIMULATOR
// ==========================================
function initSchoolSpecimen() {
  const mapCanvas = document.getElementById('schoolMapCanvas');
  const radarCanvas = document.getElementById('schoolRadarCanvas');
  if (!mapCanvas || !radarCanvas) return;

  const mCtx = mapCanvas.getContext('2d');
  const rCtx = radarCanvas.getContext('2d');
  let mw, mh;

  function resize() {
    mw = mapCanvas.width = mapCanvas.parentElement.clientWidth;
    mh = mapCanvas.height = mapCanvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const stations = {
    nihombashi: { name: '日本橋', x: 0.54, y: 0.48 },
    shinjuku: { name: '新宿', x: 0.36, y: 0.44 },
    shinagawa: { name: '品川', x: 0.50, y: 0.66 },
    ikebukuro: { name: '池袋', x: 0.36, y: 0.28 },
    shibuya: { name: '渋谷', x: 0.38, y: 0.54 }
  };

  const schools = [
    { name: '開成中学校', x: 0.53, y: 0.26, dev: 72, commute: { nihombashi: 18, shinjuku: 24, shinagawa: 32, ikebukuro: 14, shibuya: 30 } },
    { name: '麻布中学校', x: 0.47, y: 0.55, dev: 68, commute: { nihombashi: 22, shinjuku: 19, shinagawa: 20, ikebukuro: 28, shibuya: 15 } },
    { name: '桜蔭中学校', x: 0.50, y: 0.38, dev: 71, commute: { nihombashi: 15, shinjuku: 21, shinagawa: 28, ikebukuro: 16, shibuya: 25 } },
    { name: '女子学院中学校', x: 0.47, y: 0.46, dev: 69, commute: { nihombashi: 16, shinjuku: 14, shinagawa: 24, ikebukuro: 22, shibuya: 18 } },
    { name: '雙葉中学校', x: 0.45, y: 0.44, dev: 67, commute: { nihombashi: 18, shinjuku: 12, shinagawa: 22, ikebukuro: 20, shibuya: 16 } },
    { name: '筑波大附属駒場', x: 0.34, y: 0.58, dev: 74, commute: { nihombashi: 32, shinjuku: 22, shinagawa: 26, ikebukuro: 30, shibuya: 10 } },
    { name: '慶應義塾普通部', x: 0.42, y: 0.80, dev: 65, commute: { nihombashi: 36, shinjuku: 32, shinagawa: 20, ikebukuro: 42, shibuya: 22 } },
    { name: '早稲田中学校', x: 0.41, y: 0.39, dev: 65, commute: { nihombashi: 18, shinjuku: 12, shinagawa: 30, ikebukuro: 16, shibuya: 22 } },
    { name: '武蔵中学校', x: 0.26, y: 0.30, dev: 64, commute: { nihombashi: 42, shinjuku: 20, shinagawa: 40, ikebukuro: 12, shibuya: 28 } },
    { name: '渋谷教育学園渋谷', x: 0.39, y: 0.52, dev: 70, commute: { nihombashi: 24, shinjuku: 10, shinagawa: 18, ikebukuro: 18, shibuya: 5 } }
  ];

  let selectedStation = 'nihombashi';
  let maxCommute = 45;
  let currentDev = 65;
  let pulseWave = 0;

  const commuteSlider = document.getElementById('schoolCommuteSlider');
  const commuteReadout = document.getElementById('schoolCommuteReadout');
  const devSlider = document.getElementById('devSlider');
  const devReadout = document.getElementById('devReadout');
  const schoolList = document.getElementById('schoolList');

  document.querySelectorAll('#stGroup button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#stGroup button').forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      selectedStation = b.dataset.st;
      updateCards();
    });
  });

  commuteSlider?.addEventListener('input', (e) => {
    maxCommute = parseInt(e.target.value, 10);
    commuteReadout.textContent = `${maxCommute}分以内`;
    updateCards();
  });

  devSlider?.addEventListener('input', (e) => {
    currentDev = parseInt(e.target.value, 10);
    devReadout.textContent = `偏差値 ${currentDev}`;
    updateCards();
  });

  function updateCards() {
    if (!schoolList) return;
    const sorted = [...schools].map(s => {
      const c = s.commute[selectedStation] || 30;
      const inRange = c <= maxCommute;
      const prob = Math.min(95, Math.max(15, Math.round(50 + (currentDev - s.dev) * 8)));
      return { ...s, c, inRange, prob };
    }).sort((a, b) => b.prob - a.prob).slice(0, 4);

    schoolList.innerHTML = sorted.map(s => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(255,255,255,0.03);border:1px solid ${s.inRange ? 'var(--line)' : 'transparent'};border-radius:8px;opacity:${s.inRange ? 1 : 0.4};">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--ink);">${s.name}</div>
          <div class="mono" style="font-size:11px;color:var(--ink-dim);">${stations[selectedStation].name}から ${s.c}分 · 偏差値 ${s.dev}</div>
        </div>
        <div class="mono" style="text-align:right;">
          <div style="font-size:14px;font-weight:700;color:${s.prob >= 60 ? 'var(--accent)' : '#f59e0b'};">${s.prob}%</div>
          <div style="font-size:10px;color:var(--ink-dim);">${s.prob >= 75 ? '安全校' : s.prob >= 50 ? '適正校' : '挑戦校'}</div>
        </div>
      </div>
    `).join('');
  }
  updateCards();

  // Render Radar
  function renderRadar() {
    rCtx.clearRect(0, 0, 200, 200);
    const cx = 100, cy = 100, R = 70;
    const angles = [-Math.PI/2, 0, Math.PI/2, Math.PI];
    const labels = ['算数', '国語', '理科', '社会'];

    // Web
    rCtx.strokeStyle = 'rgba(240, 237, 230, 0.1)';
    rCtx.lineWidth = 1;
    for (let l = 1; l <= 3; l++) {
      const r = (l / 3) * R;
      rCtx.beginPath();
      for (let a = 0; a < 4; a++) {
        const x = cx + Math.cos(angles[a]) * r;
        const y = cy + Math.sin(angles[a]) * r;
        if (a === 0) rCtx.moveTo(x, y);
        else rCtx.lineTo(x, y);
      }
      rCtx.closePath();
      rCtx.stroke();
    }

    // Axes & Labels
    angles.forEach((ang, i) => {
      rCtx.beginPath();
      rCtx.moveTo(cx, cy);
      rCtx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
      rCtx.stroke();

      rCtx.fillStyle = '#9e9a8f';
      rCtx.font = '10px sans-serif';
      rCtx.textAlign = 'center';
      rCtx.textBaseline = 'middle';
      rCtx.fillText(labels[i], cx + Math.cos(ang) * (R + 14), cy + Math.sin(ang) * (R + 14));
    });

    // Polygon
    const scale = Math.min(1.0, currentDev / 72);
    const vals = [0.92, 0.75, 0.85, 0.70];
    rCtx.fillStyle = 'rgba(216, 255, 56, 0.2)';
    rCtx.strokeStyle = '#d8ff38';
    rCtx.lineWidth = 1.5;
    rCtx.beginPath();
    angles.forEach((ang, i) => {
      const r = R * vals[i] * scale;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r;
      if (i === 0) rCtx.moveTo(x, y);
      else rCtx.lineTo(x, y);
    });
    rCtx.closePath();
    rCtx.fill();
    rCtx.stroke();
  }

  function loop() {
    renderRadar();
    mCtx.clearRect(0, 0, mw, mh);

    // Coastline
    mCtx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    mCtx.beginPath();
    mCtx.moveTo(mw * 0.55, mh);
    mCtx.bezierCurveTo(mw * 0.55, mh * 0.75, mw * 0.72, mh * 0.7, mw, mh * 0.75);
    mCtx.lineTo(mw, mh);
    mCtx.closePath();
    mCtx.fill();

    // Railway network
    mCtx.strokeStyle = 'rgba(240, 237, 230, 0.06)';
    mCtx.lineWidth = 1;
    mCtx.beginPath();
    mCtx.ellipse(mw * 0.44, mh * 0.48, mw * 0.12, mh * 0.22, -0.2, 0, Math.PI * 2);
    mCtx.stroke();

    // Isochrone Echo
    const st = stations[selectedStation];
    const sx = mw * st.x, sy = mh * st.y;
    const maxR = (maxCommute / 75) * (mw * 0.38);

    pulseWave += 0.3;
    if (pulseWave > maxR) pulseWave = 0;

    mCtx.strokeStyle = 'rgba(216, 255, 56, 0.3)';
    mCtx.lineWidth = 1;
    mCtx.beginPath();
    mCtx.arc(sx, sy, maxR, 0, Math.PI * 2);
    mCtx.stroke();

    mCtx.strokeStyle = `rgba(216, 255, 56, ${0.4 * (1 - pulseWave / maxR)})`;
    mCtx.beginPath();
    mCtx.arc(sx, sy, pulseWave, 0, Math.PI * 2);
    mCtx.stroke();

    // Station
    mCtx.fillStyle = '#d8ff38';
    mCtx.beginPath();
    mCtx.arc(sx, sy, 5, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.font = '11px sans-serif';
    mCtx.fillText(`出発: ${st.name}`, sx + 8, sy - 4);

    // Schools
    schools.forEach(sch => {
      const px = mw * sch.x, py = mh * sch.y;
      const c = sch.commute[selectedStation] || 30;
      const inRange = c <= maxCommute;

      mCtx.save();
      mCtx.globalAlpha = inRange ? 1 : 0.25;
      mCtx.fillStyle = inRange ? '#ffffff' : '#66635a';
      mCtx.beginPath();
      mCtx.arc(px, py, inRange ? 4 : 2.5, 0, Math.PI * 2);
      mCtx.fill();

      mCtx.font = '10px sans-serif';
      mCtx.fillText(sch.name, px + 6, py + 3);
      mCtx.restore();
    });

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ==========================================
// 03. 2.4M EXAM QUESTION BANK (GALAXY)
// ==========================================
function initExamSpecimen() {
  const canvas = document.getElementById('examGraphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const nodes = [
    { id: 'rsa', name: '公開鍵暗号とRSA理論', sub: 'cs', x: 0.50, y: 0.46, r: 8 },
    { id: 'jwt', name: 'OAuth2 & JWT認可', sub: 'cs', x: 0.60, y: 0.36, r: 6 },
    { id: 'hash', name: '暗号学的ハッシュ関数', sub: 'cs', x: 0.42, y: 0.38, r: 6 },
    { id: 'prime', name: '素数判定とフェルマー定理', sub: 'math', x: 0.36, y: 0.54, r: 7 },
    { id: 'matrix', name: '線形代数・固有値分解', sub: 'math', x: 0.28, y: 0.62, r: 8 },
    { id: 'newton', name: '力学・角運動量保存則', sub: 'physics', x: 0.24, y: 0.36, r: 7 },
    { id: 'wave', name: '波動方程式・フーリエ変換', sub: 'physics', x: 0.32, y: 0.26, r: 7 },
    { id: 'capm', name: '現代ポートフォリオ理論', sub: 'finance', x: 0.72, y: 0.52, r: 8 }
  ];

  const links = [
    ['prime', 'rsa'],
    ['rsa', 'jwt'],
    ['hash', 'jwt'],
    ['matrix', 'wave'],
    ['newton', 'wave'],
    ['matrix', 'capm']
  ];

  let selected = nodes[0];

  document.querySelectorAll('#examSubjGroup button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#examSubjGroup button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const found = nodes.find(n => n.sub === btn.dataset.sub);
      if (found) selected = found;
    });
  });

  // Variant generator button
  document.getElementById('btnGenVariant')?.addEventListener('click', () => {
    const feedback = document.getElementById('eqFeedback');
    feedback.style.display = 'block';
    feedback.textContent = '▶ AIが類題を合成中... 項目困難度 b=+1.42 で再キャリブレーション完了';
    document.querySelectorAll('.eic-opt-btn').forEach(b => {
      b.disabled = false;
      b.classList.remove('correct', 'wrong');
    });
  });

  // Option Click
  document.querySelectorAll('.eic-opt-btn').forEach(b => {
    b.addEventListener('click', () => {
      const isC = b.dataset.c === '1';
      document.querySelectorAll('.eic-opt-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.c === '1') btn.classList.add('correct');
        else if (btn === b) btn.classList.add('wrong');
      });
      const feedback = document.getElementById('eqFeedback');
      feedback.style.display = 'block';
      feedback.textContent = isC ? '🎉 正解です！ φ(143)=120 に対する乗法逆元 d=43 を算出。' : '❌ 不正解です。正解は B (43)。';
    });
  });

  let tick = 0;
  function render() {
    ctx.clearRect(0, 0, w, h);
    tick += 0.02;

    // Links
    links.forEach(([src, dst]) => {
      const n1 = nodes.find(n => n.id === src);
      const n2 = nodes.find(n => n.id === dst);
      if (!n1 || !n2) return;
      const isH = (n1 === selected || n2 === selected);
      ctx.strokeStyle = isH ? 'rgba(216, 255, 56, 0.6)' : 'rgba(240, 237, 230, 0.08)';
      ctx.lineWidth = isH ? 1.5 : 0.8;
      ctx.beginPath();
      ctx.moveTo(n1.x * w, n1.y * h);
      ctx.lineTo(n2.x * w, n2.y * h);
      ctx.stroke();
    });

    // Nodes
    nodes.forEach(n => {
      const x = n.x * w;
      const y = n.y * h;
      const isSel = (n === selected);

      if (isSel) {
        ctx.strokeStyle = '#d8ff38';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, n.r + 6 + Math.sin(tick) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = isSel ? '#d8ff38' : '#ffffff';
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isSel ? '#ffffff' : '#9e9a8f';
      ctx.font = isSel ? 'bold 11px sans-serif' : '10px sans-serif';
      ctx.fillText(n.name, x + n.r + 6, y + 3);
    });

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ==========================================
// 04. HOSPITALITY MULTIMODAL AGENT
// ==========================================
function initHospitalitySpecimen() {
  const canvas = document.getElementById('audioWaveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, tick = 0;

  function resize() {
    w = canvas.width = canvas.parentElement.clientWidth;
    h = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function loop() {
    ctx.clearRect(0, 0, w, h);
    tick += 0.04;
    const cy = h / 2;

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#d8ff38';
    ctx.beginPath();
    for (let x = 0; x < w; x += 4) {
      const env = Math.sin((x / w) * Math.PI);
      const y = cy + Math.sin(x * 0.04 + tick * 1.5) * 16 * env;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
    ctx.beginPath();
    for (let x = 0; x < w; x += 4) {
      const env = Math.sin((x / w) * Math.PI);
      const y = cy + Math.sin(x * 0.05 + tick * 1.1) * 24 * env;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  const prompts = [
    {
      q: '深夜チェックインと客室キー発行をお願いできますか？',
      a: 'ご連絡ありがとうございます。客室602号室のスマートキー解錠PIN【#9482#】を発行いたしました。入口タッチパネルへご入力ください。',
      nlu: '{ "intent": "KEYLESS_CHECKIN", "sentiment": 0.95 }',
      pms: 'pms.query_reservation("BK-904") -> Room 602 Confirmed'
    },
    {
      q: '日本橋周辺でヴィーガン対応の割烹ディナーはありますか？',
      a: '徒歩4分の提携割烹「日本橋 芳町 秀」にて、旬の加賀野菜を用いた精進懐石コースの仮予約枠（20:00〜 2名様）を押さえました。',
      nlu: '{ "intent": "DINING_VEGAN_RAG", "cuisine": "KAISEKI" }',
      pms: 'rag.search_dining("vegan washoku nihombashi") -> Hit 2'
    },
    {
      q: '明朝7時に羽田空港第3ターミナルへ向かう最短ルートは？',
      a: '徒歩3分の「人形町駅」7:12発 都営浅草線エアポート快特が乗り換えなし約34分で羽田直通となります。',
      nlu: '{ "intent": "TRANSIT_AIRPORT", "dest": "HND_T3" }',
      pms: 'transit.query("Ningyocho", "HND_T3") -> Asakusa Rapid'
    }
  ];

  const chatStream = document.getElementById('hospChatStream');
  const pipeNLU = document.getElementById('pipeNLU');
  const pipePMS = document.getElementById('pipePMS');

  document.querySelectorAll('[data-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = prompts[parseInt(btn.dataset.prompt, 10)];
      if (!p) return;

      const u = document.createElement('div');
      u.className = 'dialog-bubble user';
      u.textContent = p.q;
      chatStream.appendChild(u);

      pipeNLU.textContent = p.nlu;
      pipePMS.textContent = p.pms;

      setTimeout(() => {
        const b = document.createElement('div');
        b.className = 'dialog-bubble bot';
        b.textContent = p.a;
        chatStream.appendChild(b);
        chatStream.scrollTop = chatStream.scrollHeight;
      }, 350);
    });
  });
}
