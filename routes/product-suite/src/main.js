/**
 * MindX Interactive Suite — Main Application Core
 * Proprietary Live Interactive Engine for MindX Corporate Showcase
 */

// ==========================================
// 00. GLOBAL UTILITIES & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMetricCounters();
  initHeroCanvas();
  initCaseSwitcher();
  initGolfLab();
  initSchoolSimulator();
  initExamBank();
  initHospitalityAgent();
  initContactForm();
});

// Mobile Drawer
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}

// Numbers Count-Up Animation
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.dataset.target;
        let current = 0;
        const duration = 1500;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(current);
          }
        }, stepTime);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

// Hero Background Canvas (Precision Grid & Subtle Particle Flow)
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const count = 45;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const gridSize = 48;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Particle nodes & connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Nearby connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - dist / 110)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// Main Case Switcher Tabs
function initCaseSwitcher() {
  const tabs = document.querySelectorAll('.case-tab');
  const views = document.querySelectorAll('.case-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      views.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetId = `view-${tab.dataset.case}`;
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
        // trigger resize on canvas
        window.dispatchEvent(new Event('resize'));
      }
    });
  });
}

// ==========================================
// 01. GOLF STUDIO UNMANNED LAB (IoT & 3D KINEMATICS)
// ==========================================
function initGolfLab() {
  const canvas = document.getElementById('golfCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let isPlaying = false;
  let playbackSpeed = 1.0;
  let currentFrame = 135; // 0 to 180 (corresponds to 0.00s ~ 1.80s)
  let yaw = -0.35; // horizontal view angle
  let pitch = 0.15; // vertical view angle
  let isDragging = false;
  let lastMouseX = 0, lastMouseY = 0;

  const slider = document.getElementById('golfTimeSlider');
  const timeVal = document.getElementById('golfTimeVal');
  const playBtn = document.getElementById('golfPlayBtn');
  const playIcon = document.getElementById('golfPlayIcon');
  const phaseName = document.getElementById('golfPhaseName');
  const hudBallSpeed = document.getElementById('hudBallSpeed');
  const hudSmash = document.getElementById('hudSmash');
  const valHeadSpeed = document.getElementById('valHeadSpeed');
  const valAttackAngle = document.getElementById('valAttackAngle');
  const valFaceAngle = document.getElementById('valFaceAngle');
  const valBackspin = document.getElementById('valBackspin');

  const chkSkeleton = document.getElementById('chkSkeleton');
  const chkKinetic = document.getElementById('chkKinetic');
  const chkTrail = document.getElementById('chkTrail');
  const chkPressure = document.getElementById('chkPressure');

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Mouse orbit controls
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    yaw += dx * 0.008;
    pitch = Math.max(-0.5, Math.min(0.6, pitch + dy * 0.008));
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  document.getElementById('golfResetCam')?.addEventListener('click', () => {
    yaw = -0.35;
    pitch = 0.15;
  });

  // Play / Pause
  playBtn?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playIcon.textContent = isPlaying ? '⏸ 一時停止' : '▶ 連続再生';
  });

  // Speed buttons
  document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playbackSpeed = parseFloat(btn.dataset.speed);
    });
  });

  // Phase marker shortcuts
  document.querySelectorAll('.phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      isPlaying = false;
      playIcon.textContent = '▶ 連続再生';
      const t = parseFloat(btn.dataset.time);
      currentFrame = Math.round(t * 100);
      slider.value = currentFrame;
      updateTelemetry();
    });
  });

  slider?.addEventListener('input', (e) => {
    isPlaying = false;
    playIcon.textContent = '▶ 連続再生';
    currentFrame = parseInt(e.target.value, 10);
    updateTelemetry();
  });

  // 3D Point Projection Helper
  function project(x, y, z) {
    // Center of stage
    const cx = width / 2;
    const cy = height / 2 + 30;
    const fov = 420;

    // Yaw rotation
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    let x1 = x * cosY - z * sinY;
    let z1 = z * cosY + x * sinY;

    // Pitch rotation
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    let y1 = y * cosP - z1 * sinP;
    let z2 = z1 * cosP + y * sinP + 320; // camera distance

    const scale = fov / Math.max(z2, 10);
    return {
      x: cx + x1 * scale,
      y: cy - y1 * scale,
      scale: scale,
      depth: z2
    };
  }

  // Head trail history
  const headTrail = [];

  function updateTelemetry() {
    const t = currentFrame / 100;
    timeVal.textContent = t.toFixed(2) + 's';

    let phaseStr = '構え (Address)';
    let hs = '34.2 m/s', bs = '0.0 m/s', smash = '1.00', aa = '0.0 deg', fa = '0.0 deg', spin = '0 rpm';

    if (t < 0.45) {
      phaseStr = '始動 (Takeaway)';
      hs = (34.2 + t * 10).toFixed(1) + ' m/s';
    } else if (t < 0.90) {
      phaseStr = 'トップ (Top of Swing)';
      hs = '12.4 m/s';
    } else if (t < 1.30) {
      phaseStr = 'ダウンスイング・タメ (Downswing)';
      const p = (t - 0.9) / 0.4;
      hs = (20 + p * 26).toFixed(1) + ' m/s';
    } else if (t <= 1.40) {
      phaseStr = 'インパクト！(IMPACT)';
      hs = '48.2 m/s';
      bs = '68.7 m/s';
      smash = '1.43';
      aa = '-3.2 deg';
      fa = '+0.6 deg';
      spin = '2,380 rpm';
    } else {
      phaseStr = 'フィニッシュ (Finish)';
      hs = '22.0 m/s';
      bs = '68.7 m/s';
      smash = '1.43';
      aa = '-3.2 deg';
      fa = '+0.6 deg';
      spin = '2,380 rpm';
    }

    phaseName.textContent = `${phaseStr} (${t.toFixed(2)}s)`;
    hudBallSpeed.textContent = bs;
    hudSmash.textContent = smash;
    valHeadSpeed.innerHTML = hs.replace('m/s', '<small>m/s</small>');
    valAttackAngle.innerHTML = aa.replace('deg', '<small>deg</small>');
    valFaceAngle.innerHTML = fa.replace('deg', '<small>deg</small>');
    valBackspin.innerHTML = spin.replace('rpm', '<small>rpm</small>');
  }

  // Animation Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    if (isPlaying) {
      currentFrame += playbackSpeed * 0.8;
      if (currentFrame > 180) currentFrame = 0;
      slider.value = Math.round(currentFrame);
      updateTelemetry();
    }

    const t = currentFrame / 100;

    // Ground Grid & Pressure Mat
    const gridY = -120;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let gx = -150; gx <= 150; gx += 30) {
      const pA = project(gx, gridY, -150);
      const pB = project(gx, gridY, 150);
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }
    for (let gz = -150; gz <= 150; gz += 30) {
      const pA = project(-150, gridY, gz);
      const pB = project(150, gridY, gz);
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }

    // Pressure Mat COP (Center of Pressure)
    if (chkPressure?.checked) {
      // Left foot around (-25, -120, 0), Right foot around (25, -120, 0)
      // Transition weight: top = 80% right, impact = 85% left
      let weightLeft = 0.5;
      if (t < 0.9) weightLeft = 0.5 - (t / 0.9) * 0.3; // shifts to right
      else if (t < 1.35) weightLeft = 0.2 + ((t - 0.9) / 0.45) * 0.65; // shifts to left
      else weightLeft = 0.85 + ((t - 1.35) / 0.45) * 0.08;

      const pFootL = project(-28, gridY + 1, 0);
      const pFootR = project(28, gridY + 1, 0);

      // Foot pads
      ctx.fillStyle = `rgba(59, 130, 246, ${weightLeft * 0.6 + 0.1})`;
      ctx.beginPath();
      ctx.ellipse(pFootL.x, pFootL.y, 18 * pFootL.scale, 10 * pFootL.scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(245, 158, 11, ${(1 - weightLeft) * 0.6 + 0.1})`;
      ctx.beginPath();
      ctx.ellipse(pFootR.x, pFootR.y, 18 * pFootR.scale, 10 * pFootR.scale, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Kinematic Skeleton Angles via Time $t$
    let shoulderRot = 0; // rotation around spine
    let pelvisRot = 0;
    let spineTilt = -0.15;
    let armSwing = 0;
    let clubAngle = 0;

    if (t < 0.9) {
      const p = t / 0.9;
      shoulderRot = p * Math.PI * 0.48;
      pelvisRot = p * Math.PI * 0.22;
      armSwing = p * 1.8;
      clubAngle = p * 2.2;
    } else if (t < 1.35) {
      const p = (t - 0.9) / 0.45;
      shoulderRot = Math.PI * 0.48 - p * Math.PI * 0.58;
      pelvisRot = Math.PI * 0.22 - p * Math.PI * 0.42; // pelvis leads!
      armSwing = 1.8 - p * 2.2;
      clubAngle = 2.2 - p * 3.0; // unhinge at impact
    } else {
      const p = (t - 1.35) / 0.45;
      shoulderRot = -Math.PI * 0.1 - p * Math.PI * 0.45;
      pelvisRot = -Math.PI * 0.2 - p * Math.PI * 0.35;
      armSwing = -0.4 - p * 1.2;
      clubAngle = -0.8 - p * 1.4;
    }

    // Joint Positions
    // Base pelvis
    const pelvis = { x: 0, y: -20, z: 0 };
    // Spine
    const neck = { x: 0, y: 40, z: 10 };
    const head = { x: 0, y: 56, z: 12 };

    // Shoulders
    const sWidth = 24;
    const lShoulder = {
      x: neck.x - Math.cos(shoulderRot) * sWidth,
      y: neck.y,
      z: neck.z - Math.sin(shoulderRot) * sWidth
    };
    const rShoulder = {
      x: neck.x + Math.cos(shoulderRot) * sWidth,
      y: neck.y,
      z: neck.z + Math.sin(shoulderRot) * sWidth
    };

    // Hands
    const hands = {
      x: -Math.sin(armSwing) * 35 - 5,
      y: neck.y - Math.cos(armSwing) * 30 - 15,
      z: 20 + Math.cos(armSwing) * 20
    };

    // Club Head
    const clubLen = 58;
    const clubHead = {
      x: hands.x - Math.sin(clubAngle) * clubLen,
      y: hands.y - Math.cos(clubAngle) * clubLen,
      z: hands.z - Math.sin(shoulderRot) * 25
    };

    // Feet
    const footL = { x: -28, y: -120, z: 0 };
    const footR = { x: 28, y: -120, z: 0 };
    const kneeL = { x: -24, y: -70, z: 6 };
    const kneeR = { x: 24, y: -70, z: 6 };

    // Record trail
    if (chkTrail?.checked) {
      headTrail.push({ ...clubHead });
      if (headTrail.length > 28) headTrail.shift();
    } else {
      headTrail.length = 0;
    }

    // Draw Head Trail
    if (headTrail.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < headTrail.length; i++) {
        const pt = project(headTrail[i].x, headTrail[i].y, headTrail[i].z);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Impact effect
    if (Math.abs(t - 1.35) < 0.05) {
      const pImp = project(clubHead.x, clubHead.y, clubHead.z);
      ctx.strokeStyle = 'rgba(250, 28, 24, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pImp.x, pImp.y, 25 * pImp.scale, 0, Math.PI * 2);
      ctx.stroke();

      // Ball flying out
      const pBall = project(-80, -110, 80);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pBall.x, pBall.y, 6 * pBall.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Skeleton Wireframe
    if (chkSkeleton?.checked) {
      const pts = {
        head: project(head.x, head.y, head.z),
        neck: project(neck.x, neck.y, neck.z),
        pelvis: project(pelvis.x, pelvis.y, pelvis.z),
        lShoulder: project(lShoulder.x, lShoulder.y, lShoulder.z),
        rShoulder: project(rShoulder.x, rShoulder.y, rShoulder.z),
        hands: project(hands.x, hands.y, hands.z),
        clubHead: project(clubHead.x, clubHead.y, clubHead.z),
        kneeL: project(kneeL.x, kneeL.y, kneeL.z),
        kneeR: project(kneeR.x, kneeR.y, kneeR.z),
        footL: project(footL.x, footL.y, footL.z),
        footR: project(footR.x, footR.y, footR.z)
      };

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#3b82f6';

      function line(p1, p2, col) {
        ctx.strokeStyle = col || 'rgba(59, 130, 246, 0.85)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Torso & Spine
      line(pts.head, pts.neck);
      line(pts.neck, pts.pelvis);
      line(pts.lShoulder, pts.rShoulder);

      // Arms
      line(pts.lShoulder, pts.hands, 'rgba(6, 182, 212, 0.9)');
      line(pts.rShoulder, pts.hands, 'rgba(6, 182, 212, 0.9)');

      // Club Shaft
      line(pts.hands, pts.clubHead, '#ffffff');

      // Legs
      line(pts.pelvis, pts.kneeL);
      line(pts.pelvis, pts.kneeR);
      line(pts.kneeL, pts.footL);
      line(pts.kneeR, pts.footR);

      // Joints
      ctx.fillStyle = '#ffffff';
      Object.values(pts).forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4 * pt.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Club Head highlight
      ctx.fillStyle = '#fa1c18';
      ctx.beginPath();
      ctx.arc(pts.clubHead.x, pts.clubHead.y, 6 * pts.clubHead.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Right Console IoT Interactivity
  const lockCard = document.getElementById('lockCard');
  const lockIcon = document.getElementById('lockIcon');
  const lockStateText = document.getElementById('lockStateText');
  const btnToggleLock = document.getElementById('btnToggleLock');
  const iotLogBanner = document.getElementById('iotLogBanner');

  let isLocked = true;
  btnToggleLock?.addEventListener('click', () => {
    isLocked = !isLocked;
    if (!isLocked) {
      lockCard.classList.add('active');
      lockIcon.textContent = '🔓';
      lockStateText.textContent = '一時解錠中 (OPEN)';
      iotLogBanner.textContent = '▶ [IoT GATEWAY] 日本橋打席03 遠隔解錠パルス送出 200 OK (5秒後に自動施錠)';
      setTimeout(() => {
        isLocked = true;
        lockCard.classList.remove('active');
        lockIcon.textContent = '🔒';
        lockStateText.textContent = '施錠中 (LOCKED)';
        iotLogBanner.textContent = '▶ [IoT GATEWAY] 自動施錠完了 (センサー検知: 入室完了)';
      }, 5000);
    }
  });

  const btnCycleScene = document.getElementById('btnCycleScene');
  const sceneStateText = document.getElementById('sceneStateText');
  const scenes = [
    '22.5℃ · 省エネ待機',
    '20.0℃ · 競技モード (高照度)',
    '21.0℃ · AIコーチング指導'
  ];
  let curScene = 0;
  btnCycleScene?.addEventListener('click', () => {
    curScene = (curScene + 1) % scenes.length;
    sceneStateText.textContent = scenes[curScene];
    iotLogBanner.textContent = `▶ [BACnet/IoT] 環境シーンを「${scenes[curScene]}」に更新しました`;
  });

  const btnTogglePower = document.getElementById('btnTogglePower');
  btnTogglePower?.addEventListener('click', () => {
    iotLogBanner.textContent = '▶ [POWER BUS] 打席機器リセット信号送信中... 完了 (全系統正常)';
  });
}

// ==========================================
// 02. TOKYO PRESTIGIOUS SCHOOL SIMULATOR
// ==========================================
function initSchoolSimulator() {
  const mapCanvas = document.getElementById('schoolMapCanvas');
  const radarCanvas = document.getElementById('schoolRadarCanvas');
  if (!mapCanvas || !radarCanvas) return;

  const mCtx = mapCanvas.getContext('2d');
  const rCtx = radarCanvas.getContext('2d');
  let mWidth, mHeight;

  function resize() {
    mWidth = mapCanvas.width = mapCanvas.parentElement.clientWidth;
    mHeight = mapCanvas.height = mapCanvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Tokyo Stations Coordinates on Canvas
  const stations = {
    nihombashi: { name: '日本橋', x: 0.54, y: 0.50 },
    shinjuku: { name: '新宿', x: 0.38, y: 0.46 },
    shinagawa: { name: '品川', x: 0.50, y: 0.65 },
    ikebukuro: { name: '池袋', x: 0.37, y: 0.32 },
    shibuya: { name: '渋谷', x: 0.40, y: 0.54 }
  };

  // Prestigious Schools Database
  const schools = [
    { id: 'kaisei', name: '開成中学校', x: 0.53, y: 0.30, dev: 72, type: 'thinking', commute: { nihombashi: 18, shinjuku: 24, shinagawa: 32, ikebukuro: 14, shibuya: 30 } },
    { id: 'azabu', name: '麻布中学校', x: 0.47, y: 0.56, dev: 68, type: 'thinking', commute: { nihombashi: 22, shinjuku: 19, shinagawa: 20, ikebukuro: 28, shibuya: 15 } },
    { id: 'musashi', name: '武蔵中学校', x: 0.28, y: 0.32, dev: 64, type: 'thinking', commute: { nihombashi: 42, shinjuku: 20, shinagawa: 40, ikebukuro: 12, shibuya: 28 } },
    { id: 'oin', name: '桜蔭中学校', x: 0.51, y: 0.41, dev: 71, type: 'balanced', commute: { nihombashi: 15, shinjuku: 21, shinagawa: 28, ikebukuro: 16, shibuya: 25 } },
    { id: 'jg', name: '女子学院中学校', x: 0.48, y: 0.47, dev: 69, type: 'speed', commute: { nihombashi: 16, shinjuku: 14, shinagawa: 24, ikebukuro: 22, shibuya: 18 } },
    { id: 'futaba', name: '雙葉中学校', x: 0.46, y: 0.45, dev: 67, type: 'balanced', commute: { nihombashi: 18, shinjuku: 12, shinagawa: 22, ikebukuro: 20, shibuya: 16 } },
    { id: 'tsukukoma', name: '筑波大附属駒場', x: 0.36, y: 0.58, dev: 74, type: 'thinking', commute: { nihombashi: 32, shinjuku: 22, shinagawa: 26, ikebukuro: 30, shibuya: 10 } },
    { id: 'keio', name: '慶應義塾普通部', x: 0.44, y: 0.78, dev: 65, type: 'balanced', commute: { nihombashi: 36, shinjuku: 32, shinagawa: 20, ikebukuro: 42, shibuya: 22 } },
    { id: 'waseda', name: '早稲田中学校', x: 0.42, y: 0.41, dev: 65, type: 'speed', commute: { nihombashi: 18, shinjuku: 12, shinagawa: 30, ikebukuro: 16, shibuya: 22 } },
    { id: 'shibushibu', name: '渋谷教育学園渋谷', x: 0.41, y: 0.53, dev: 70, type: 'thinking', commute: { nihombashi: 24, shinjuku: 10, shinagawa: 18, ikebukuro: 18, shibuya: 5 } }
  ];

  let selectedStation = 'nihombashi';
  let maxCommute = 45;
  let userDeviation = 65;
  let selectedExamType = 'thinking';

  // Controls Binding
  const commuteSlider = document.getElementById('commuteSlider');
  const commuteTimeVal = document.getElementById('commuteTimeVal');
  const deviationSlider = document.getElementById('deviationSlider');
  const deviationVal = document.getElementById('deviationVal');
  const examTypeVal = document.getElementById('examTypeVal');
  const schoolCardList = document.getElementById('schoolCardList');
  const schoolAdviceText = document.getElementById('schoolAdviceText');

  document.querySelectorAll('.btn-st').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-st').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedStation = btn.dataset.st;
      renderAll();
    });
  });

  commuteSlider?.addEventListener('input', (e) => {
    maxCommute = parseInt(e.target.value, 10);
    commuteTimeVal.textContent = maxCommute + '分以内';
    renderAll();
  });

  deviationSlider?.addEventListener('input', (e) => {
    userDeviation = parseInt(e.target.value, 10);
    deviationVal.textContent = userDeviation;
    renderAll();
  });

  document.querySelectorAll('.btn-et').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-et').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedExamType = btn.dataset.type;
      examTypeVal.textContent = btn.textContent;
      renderAll();
    });
  });

  // Map Animation Wave
  let waveRadius = 0;

  function renderMap() {
    mCtx.clearRect(0, 0, mWidth, mHeight);

    // Subtle Tokyo Bay Contour
    mCtx.fillStyle = 'rgba(6, 182, 212, 0.04)';
    mCtx.beginPath();
    mCtx.moveTo(mWidth * 0.55, mHeight);
    mCtx.bezierCurveTo(mWidth * 0.55, mHeight * 0.75, mWidth * 0.7, mHeight * 0.7, mWidth, mHeight * 0.75);
    mCtx.lineTo(mWidth, mHeight);
    mCtx.closePath();
    mCtx.fill();

    // Railway network curves (Yamanote ring, Chuo line, Chiyoda line)
    mCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    mCtx.lineWidth = 2;

    // Yamanote-like oval
    mCtx.beginPath();
    mCtx.ellipse(mWidth * 0.44, mHeight * 0.48, mWidth * 0.12, mHeight * 0.2, -0.2, 0, Math.PI * 2);
    mCtx.stroke();

    // Chuo Line east-west
    mCtx.beginPath();
    mCtx.moveTo(mWidth * 0.25, mHeight * 0.42);
    mCtx.lineTo(mWidth * 0.55, mHeight * 0.49);
    mCtx.stroke();

    // Departure Station Point
    const st = stations[selectedStation];
    const stX = mWidth * st.x;
    const stY = mHeight * st.y;

    // Isochrone Radius calculation
    const isoRadius = (maxCommute / 75) * (mWidth * 0.38);

    // Isochrone Pulse Circle
    waveRadius += 0.4;
    if (waveRadius > isoRadius) waveRadius = 0;

    mCtx.fillStyle = 'rgba(59, 130, 246, 0.08)';
    mCtx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    mCtx.lineWidth = 1.5;
    mCtx.beginPath();
    mCtx.arc(stX, stY, isoRadius, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.stroke();

    // Ripple wave
    mCtx.strokeStyle = `rgba(6, 182, 212, ${0.4 * (1 - waveRadius / isoRadius)})`;
    mCtx.beginPath();
    mCtx.arc(stX, stY, waveRadius, 0, Math.PI * 2);
    mCtx.stroke();

    // Draw Station Marker
    mCtx.fillStyle = '#10b981';
    mCtx.beginPath();
    mCtx.arc(stX, stY, 7, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.fillStyle = '#fff';
    mCtx.font = 'bold 12px sans-serif';
    mCtx.fillText(`★ 出発: ${st.name}`, stX + 10, stY - 4);

    // Draw Schools
    schools.forEach(sch => {
      const sx = mWidth * sch.x;
      const sy = mHeight * sch.y;
      const commuteTime = sch.commute[selectedStation] || 35;
      const isInRange = commuteTime <= maxCommute;
      const diff = userDeviation - sch.dev;

      let color = '#3b82f6';
      let tier = '適正圏 (Target)';
      if (diff < -3) {
        color = '#f59e0b';
        tier = '挑戦圏 (Reach)';
      } else if (diff > 4) {
        color = '#10b981';
        tier = '安全圏 (Safety)';
      }

      mCtx.save();
      if (!isInRange) {
        mCtx.globalAlpha = 0.25;
        mCtx.fillStyle = '#6b7280';
      } else {
        mCtx.globalAlpha = 1.0;
        mCtx.fillStyle = color;
      }

      mCtx.beginPath();
      mCtx.arc(sx, sy, isInRange ? 6 : 4, 0, Math.PI * 2);
      mCtx.fill();

      // Label
      mCtx.font = isInRange ? '11px sans-serif' : '9px sans-serif';
      mCtx.fillStyle = isInRange ? '#fff' : '#6b7280';
      mCtx.fillText(`${sch.name} (${commuteTime}分)`, sx + 8, sy + 4);
      mCtx.restore();
    });
  }

  // Draw 4-Subject Radar Chart
  function renderRadar() {
    rCtx.clearRect(0, 0, 220, 220);
    const cx = 110, cy = 110, maxR = 80;
    const subjects = ['算数', '国語', '理科', '社会'];
    const angles = [ -Math.PI / 2, 0, Math.PI / 2, Math.PI ];

    // Background webs
    rCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    rCtx.lineWidth = 1;
    for (let l = 1; l <= 4; l++) {
      const r = (l / 4) * maxR;
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

    // Axes
    angles.forEach((ang, i) => {
      rCtx.beginPath();
      rCtx.moveTo(cx, cy);
      rCtx.lineTo(cx + Math.cos(ang) * maxR, cy + Math.sin(ang) * maxR);
      rCtx.stroke();

      // Subject text
      const tx = cx + Math.cos(ang) * (maxR + 16);
      const ty = cy + Math.sin(ang) * (maxR + 16);
      rCtx.fillStyle = '#9ca3af';
      rCtx.font = '10px sans-serif';
      rCtx.textAlign = 'center';
      rCtx.textBaseline = 'middle';
      rCtx.fillText(subjects[i], tx, ty);
    });

    // Subject values calculated from deviation and exam type
    let sVals = [0.75, 0.7, 0.65, 0.68];
    if (selectedExamType === 'thinking') {
      sVals = [0.92, 0.74, 0.82, 0.62]; // Heavy Math & Science
    } else if (selectedExamType === 'speed') {
      sVals = [0.70, 0.88, 0.68, 0.85]; // Heavy Japanese & Social
    } else {
      sVals = [0.80, 0.80, 0.78, 0.78];
    }

    // Scale by user deviation relative to 70
    const scale = Math.min(1.0, Math.max(0.4, userDeviation / 72));
    const pts = sVals.map((v, i) => ({
      x: cx + Math.cos(angles[i]) * maxR * v * scale,
      y: cy + Math.sin(angles[i]) * maxR * v * scale
    }));

    rCtx.fillStyle = 'rgba(59, 130, 246, 0.35)';
    rCtx.strokeStyle = '#3b82f6';
    rCtx.lineWidth = 2;
    rCtx.beginPath();
    pts.forEach((p, i) => {
      if (i === 0) rCtx.moveTo(p.x, p.y);
      else rCtx.lineTo(p.x, p.y);
    });
    rCtx.closePath();
    rCtx.fill();
    rCtx.stroke();
  }

  // Update School Recommendation List
  function updateRecommendations() {
    if (!schoolCardList) return;
    const sorted = [...schools].map(s => {
      const commute = s.commute[selectedStation] || 30;
      const diff = userDeviation - s.dev;
      let prob = Math.round(50 + diff * 8);
      if (selectedExamType === s.type) prob += 8;
      prob = Math.max(12, Math.min(96, prob));

      let tier = 'target';
      let tierLabel = '適正圏';
      if (prob < 50) {
        tier = 'reach';
        tierLabel = '挑戦圏';
      } else if (prob > 78) {
        tier = 'safety';
        tierLabel = '安全圏';
      }
      return { ...s, commute, prob, tier, tierLabel };
    }).sort((a, b) => b.prob - a.prob);

    schoolCardList.innerHTML = sorted.map(s => `
      <div class="school-item-card ${s.tier}">
        <div class="sic-main">
          <span class="sic-name">${s.name} (偏差値 ${s.dev})</span>
          <span class="sic-commute">${stations[selectedStation].name}から ${s.commute}分 · ${s.type === 'thinking' ? '思考記述型' : s.type === 'speed' ? '処理速度型' : '総合型'}</span>
        </div>
        <div class="sic-prob">
          <div class="sic-num">${s.prob}%</div>
          <div class="sic-tier">${s.tierLabel}</div>
        </div>
      </div>
    `).join('');

    const targetSchool = sorted.find(s => s.prob >= 50 && s.prob <= 75) || sorted[0];
    schoolAdviceText.innerHTML = `
      💡 <strong>AI コンシェルジュ推奨:</strong> ${stations[selectedStation].name}駅から${targetSchool.name}まで通学約${targetSchool.commute}分。志望傾向（${selectedExamType === 'thinking' ? '思考記述型' : 'バランス型'}）との合致率が高く、算数配点の強化で合格確率はさらに向上します。
    `;
  }

  function renderAll() {
    renderRadar();
    updateRecommendations();
  }
  renderAll();

  function loop() {
    renderMap();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ==========================================
// 03. 2.4M EXAM QUESTION BANK (GALAXY & IRT)
// ==========================================
function initExamBank() {
  const canvas = document.getElementById('examGraphCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Knowledge Galaxy Nodes
  const nodes = [
    { id: 'rsa', name: '公開鍵暗号とRSA理論', subject: 'cs', x: 0.5, y: 0.45, r: 12 },
    { id: 'hash', name: '暗号学的ハッシュ関数', subject: 'cs', x: 0.42, y: 0.38, r: 8 },
    { id: 'jwt', name: 'OAuth2 & JWT認可トークン', subject: 'cs', x: 0.58, y: 0.35, r: 9 },
    { id: 'diffie', name: 'ディフィー・ヘルマン鍵共有', subject: 'cs', x: 0.48, y: 0.55, r: 10 },
    { id: 'math_prime', name: '素数判定法とフェルマーの小定理', subject: 'math', x: 0.36, y: 0.52, r: 11 },
    { id: 'math_euclid', name: '拡張ユークリッド互除法', subject: 'math', x: 0.44, y: 0.65, r: 10 },
    { id: 'math_matrix', name: '線形代数・固有値分解', subject: 'math', x: 0.28, y: 0.60, r: 12 },
    { id: 'physics_newton', name: '質点系力学・角運動量保存則', subject: 'physics', x: 0.22, y: 0.35, r: 11 },
    { id: 'physics_wave', name: '波動方程式とフーリエ変換', subject: 'physics', x: 0.30, y: 0.25, r: 10 },
    { id: 'fin_capm', name: '現代ポートフォリオ理論 (CAPM)', subject: 'finance', x: 0.70, y: 0.50, r: 12 },
    { id: 'fin_bs', name: 'ブラック・ショールズ方程式', subject: 'finance', x: 0.64, y: 0.62, r: 11 },
    { id: 'law_ip', name: '特許法・進歩性と新規性', subject: 'law', x: 0.72, y: 0.32, r: 10 }
  ];

  const links = [
    ['math_prime', 'rsa'],
    ['math_euclid', 'rsa'],
    ['rsa', 'jwt'],
    ['rsa', 'diffie'],
    ['hash', 'jwt'],
    ['math_matrix', 'physics_wave'],
    ['physics_newton', 'physics_wave'],
    ['math_matrix', 'fin_capm'],
    ['fin_capm', 'fin_bs'],
    ['law_ip', 'rsa']
  ];

  let selectedNode = nodes[0];
  const selectedNodeName = document.getElementById('selectedNodeName');
  const irtSlider = document.getElementById('irtSlider');
  const irtThetaVal = document.getElementById('irtThetaVal');
  const paramA = document.getElementById('paramA');
  const paramB = document.getElementById('paramB');
  const paramC = document.getElementById('paramC');
  const btnGenNewQuestion = document.getElementById('btnGenNewQuestion');

  // Quick subject filter
  document.querySelectorAll('.btn-gq').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-gq').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const subj = btn.dataset.subject;
      const found = nodes.find(n => n.subject === subj);
      if (found) {
        selectedNode = found;
        selectedNodeName.textContent = `${found.subject.toUpperCase()} · ${found.name}`;
      }
    });
  });

  // Canvas Click Detection
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / width;
    const my = (e.clientY - rect.top) / height;

    nodes.forEach(n => {
      const dx = (n.x - mx) * width;
      const dy = (n.y - my) * height;
      if (Math.sqrt(dx * dx + dy * dy) < n.r + 6) {
        selectedNode = n;
        selectedNodeName.textContent = `${n.subject.toUpperCase()} · ${n.name}`;
      }
    });
  });

  // IRT Slider
  irtSlider?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const theta = (val / 10).toFixed(2);
    let desc = '標準レベル';
    if (theta > 1.2) desc = '超難関レベル';
    else if (theta > 0.4) desc = '難関レベル';
    else if (theta < -0.5) desc = '基礎・確認レベル';

    irtThetaVal.textContent = `${theta > 0 ? '+' : ''}${theta} (${desc})`;
    paramB.textContent = `${theta > 0 ? '+' : ''}${(parseFloat(theta) * 0.95).toFixed(2)}`;
  });

  // Question Option Interaction
  const qOptionsList = document.getElementById('qOptionsList');
  const qResultBanner = document.getElementById('qResultBanner');

  qOptionsList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.opt-btn');
    if (!btn) return;

    const isCorrect = btn.dataset.correct === 'true';
    qOptionsList.querySelectorAll('.opt-btn').forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
    });

    qResultBanner.hidden = false;
    if (isCorrect) {
      qResultBanner.className = 'qp-result-banner success';
      qResultBanner.innerHTML = '🎉 正解です！ $e \\cdot d \\equiv 1 \\pmod{\\phi(n)}$ より、$\\phi(143)=120$、$7 \\times 43 = 301 = 120 \\times 2 + 1$ で成立します。';
    } else {
      qResultBanner.className = 'qp-result-banner error';
      qResultBanner.innerHTML = '❌ 不正解です。正解は B (43)。法 $\\phi(n)=(p-1)(q-1)=120$ に対する乗法逆元を算出します。';
    }
  });

  btnGenNewQuestion?.addEventListener('click', () => {
    btnGenNewQuestion.textContent = '⚡ AIが類題を合成中...';
    setTimeout(() => {
      btnGenNewQuestion.textContent = '✨ 新規類題をAI自動生成';
      qResultBanner.hidden = true;
      qOptionsList.querySelectorAll('.opt-btn').forEach(b => {
        b.disabled = false;
        b.classList.remove('correct', 'wrong');
      });
      document.getElementById('qCode').textContent = 'CODE: MX-AUTO-' + Math.floor(Math.random() * 9000 + 1000);
      document.getElementById('qPassRate').textContent = (Math.random() * 30 + 35).toFixed(1) + '%';
    }, 600);
  });

  // Galaxy Canvas Render Loop
  let tick = 0;
  function render() {
    ctx.clearRect(0, 0, width, height);
    tick += 0.02;

    // Draw Links
    links.forEach(([srcId, dstId]) => {
      const src = nodes.find(n => n.id === srcId);
      const dst = nodes.find(n => n.id === dstId);
      if (!src || !dst) return;

      const isHighlight = (src === selectedNode || dst === selectedNode);
      ctx.strokeStyle = isHighlight ? 'rgba(6, 182, 212, 0.7)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = isHighlight ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(src.x * width, src.y * height);
      ctx.lineTo(dst.x * width, dst.y * height);
      ctx.stroke();
    });

    // Draw Nodes
    nodes.forEach(n => {
      const nx = n.x * width;
      const ny = n.y * height;
      const isSel = (n === selectedNode);

      let color = '#3b82f6';
      if (n.subject === 'math') color = '#10b981';
      if (n.subject === 'physics') color = '#f59e0b';
      if (n.subject === 'finance') color = '#8b5cf6';
      if (n.subject === 'law') color = '#ec4899';

      if (isSel) {
        // Outer pulsing ring
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r + 6 + Math.sin(tick) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
      ctx.fill();

      // Node label
      ctx.fillStyle = isSel ? '#ffffff' : '#9ca3af';
      ctx.font = isSel ? 'bold 11px sans-serif' : '10px sans-serif';
      ctx.fillText(n.name, nx + n.r + 6, ny + 4);
    });

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// ==========================================
// 04. HOSPITALITY MULTIMODAL AGENT
// ==========================================
function initHospitalityAgent() {
  const waveCanvas = document.getElementById('audioWaveCanvas');
  if (!waveCanvas) return;
  const ctx = waveCanvas.getContext('2d');
  let width, height;

  function resize() {
    width = waveCanvas.width = waveCanvas.parentElement.clientWidth;
    height = waveCanvas.height = waveCanvas.parentElement.clientHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let isSpeaking = false;
  let waveTick = 0;

  function renderWave() {
    ctx.clearRect(0, 0, width, height);
    waveTick += 0.05;

    ctx.lineWidth = 2;
    const cy = height / 2;
    const lines = [
      { col: 'rgba(59, 130, 246, 0.6)', speed: 1.0, amp: isSpeaking ? 28 : 8 },
      { col: 'rgba(6, 182, 212, 0.7)', speed: 1.4, amp: isSpeaking ? 36 : 12 },
      { col: 'rgba(16, 185, 129, 0.5)', speed: 0.8, amp: isSpeaking ? 20 : 6 }
    ];

    lines.forEach(line => {
      ctx.strokeStyle = line.col;
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const p = x / width;
        const envelope = Math.sin(p * Math.PI); // fade at edges
        const y = cy + Math.sin(x * 0.03 + waveTick * line.speed) * line.amp * envelope;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    requestAnimationFrame(renderWave);
  }
  requestAnimationFrame(renderWave);

  // Chat Scenarios & Pipeline
  const chatStream = document.getElementById('chatStream');
  const chatInput = document.getElementById('chatInput');
  const conciergeForm = document.getElementById('conciergeForm');
  const audioStateText = document.getElementById('audioStateText');

  const step1Code = document.querySelector('#pipeStep1 code');
  const step2Code = document.querySelector('#pipeStep2 code');
  const step3Code = document.querySelector('#pipeStep3 code');
  const step4Code = document.querySelector('#pipeStep4 code');

  const scenarios = [
    {
      q: '深夜23時に到着予定ですが、無人チェックインと部屋のスマートキー発行はどうすれば良いですか？',
      a: 'ご連絡ありがとうございます。23時以降のエントランスはスマートロック自動施錠となります。お客様専用の解錠PIN【#9482#】をLINEおよびメールへ送付いたしました。タッチパネルへ入力いただくことで、お部屋602号室まで完全無人でスムーズにご入室いただけます。',
      p1: '{ "intent": "CHECKIN_KEYLESS_DISPATCH", "sentiment": 0.94, "urgency": "URGENT", "lang": "ja" }',
      p2: 'pms.query_reservation({ res_id: "BK-2026-904", status: "CONFIRMED", room: "602" })',
      p3: 'iot.generate_smartkey({ lock_id: "LOCK-602", expire: "2026-09-12T11:00:00Z" })',
      p4: '[ACTION] 暗証番号 #9482 発行完了 → 客室 602 空調プレ稼働 (23.5℃) 送信完了'
    },
    {
      q: '日本橋・人形町周辺で、ベジタリアン対応の美味しい江戸前割烹やディナーはありますか？',
      a: '人形町エリアにございます「日本橋 芳町 割烹 秀」にて、厳選された旬の加賀野菜と精進出汁を用いたベジタリアン特別懐石コースがございます。ホテルより徒歩4分、本日20時より2名様のお席確保が可能です。代行予約を完了させますか？',
      p1: '{ "intent": "CONCIERGE_DINING_RECOMMEND", "dietary": "VEGAN", "area": "NIHOMBASHI" }',
      p2: 'pms.guest_profile_get({ id: "G-4401", preferences: ["KAISEKI", "NON_SMOKING"] })',
      p3: 'dining_rag.search({ cuisine: "washoku", vegan: true, radius_km: 0.8, open_now: true })',
      p4: '[ACTION] 提携割烹「芳町 秀」空席仮押さえ API 発行完了 (予約番号 #H-104)'
    },
    {
      q: '明朝7時に羽田空港第3ターミナルへ向かいたい。最速の電車ルートかタクシー手配をお願いできますか？',
      a: '明朝の最短アクセスは、徒歩3分の都営浅草線「人形町駅」7:12発 エアポート快特（羽田空港第1・第2・第3直通）が最も確実で約34分で到着いたします。お荷物が多い場合は、6:50にホテル正面玄関へ提携タクシーをお手配可能です。',
      p1: '{ "intent": "TRANSIT_ROUTE_TAXI_DISPATCH", "destination": "HND_T3", "depart_time": "07:00" }',
      p2: 'transit_api.query({ from: "Ningyocho_Station", to: "Haneda_T3", speed_priority: true })',
      p3: 'taxi_dispatcher.check_fleet({ area: "CHUO_KU", pickup: "2026-09-11T06:50" })',
      p4: '[ACTION] 都営浅草線直通ルート案内カード生成 ＆ 配車事前枠キープ完了'
    }
  ];

  function triggerScenario(index) {
    const sc = scenarios[index];
    if (!sc) return;

    // Append User message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.innerHTML = `<div class="bot-bubble">${sc.q}</div>`;
    chatStream.appendChild(userMsg);

    // Audio status
    audioStateText.textContent = 'AI エージェント推論中... (TTS & Action Orchestrating)';
    isSpeaking = true;

    // Pipeline Update
    step1Code.textContent = sc.p1;
    step2Code.textContent = sc.p2;
    step3Code.textContent = sc.p3;
    step4Code.textContent = sc.p4;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg-bot';
      botMsg.innerHTML = `<div class="bot-avatar">MX</div><div class="bot-bubble">${sc.a}</div>`;
      chatStream.appendChild(botMsg);
      chatStream.scrollTop = chatStream.scrollHeight;
      audioStateText.textContent = '音声合成出力中 (24/7 Voice Synthesis Streaming)';

      setTimeout(() => {
        isSpeaking = false;
        audioStateText.textContent = '音声認識待機中 (Realtime Voice Synthesizer Ready)';
      }, 3500);
    }, 450);
  }

  document.querySelectorAll('.chip-prompt').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = parseInt(chip.dataset.p, 10);
      triggerScenario(p);
    });
  });

  conciergeForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = '';

    const userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.innerHTML = `<div class="bot-bubble">${val}</div>`;
    chatStream.appendChild(userMsg);

    audioStateText.textContent = '自然言語推論中...';
    isSpeaking = true;

    step1Code.textContent = `{ "query": "${val}", "intent": "GENERAL_INQUIRY", "status": "PROCESSING" }`;
    step2Code.textContent = `rag.search_hotel_knowledge({ query: "${val}" })`;
    step3Code.textContent = `llm.synthesize_response({ tone: "polite_japanese", persona: "concierge" })`;
    step4Code.textContent = `[OUTPUT] レスポンス生成完了`;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg-bot';
      botMsg.innerHTML = `<div class="bot-avatar">MX</div><div class="bot-bubble">ご質問ありがとうございます。「${val}」についてホテルシステムおよび周辺データベースを確認いたしました。専任スタッフへも共有済みでございますので、さらに詳細な手配が必要な際はお申し付けください。</div>`;
      chatStream.appendChild(botMsg);
      chatStream.scrollTop = chatStream.scrollHeight;
      isSpeaking = false;
      audioStateText.textContent = '音声認識待機中 (Realtime Ready)';
    }, 500);
  });
}

// ==========================================
// 05. CONTACT FORM INTERACTION
// ==========================================
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  const feedback = document.getElementById('formFeedback');
  const btnSubmit = document.getElementById('btnSubmitForm');

  document.querySelectorAll('.btn-tc').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-tc').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '送信処理中...';

    setTimeout(() => {
      form.reset();
      feedback.hidden = false;
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>送信する (24時間以内にご連絡)</span>';
      setTimeout(() => { feedback.hidden = true; }, 6000);
    }, 700);
  });
}
