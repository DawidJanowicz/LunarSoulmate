// ============================================================================
// PUBLIC FIGURES POOL
// How to add more celebrities / public figures:
// Add a new object to the PUBLIC_FIGURES array below using the exact format:
// { name: "Full Name", date: "YYYY-MM-DD" },
// On every page load, the app randomly selects 6 figures from this pool.
// ============================================================================
const PUBLIC_FIGURES = [
    { name: "Taylor Swift", date: "1989-12-13" },
    { name: "Pedro Pascal", date: "1975-04-02" },
    { name: "Zendaya", date: "1996-09-01" },
    { name: "Billie Eilish", date: "2001-12-18" },
    { name: "Timothée Chalamet", date: "1995-12-27" },
    { name: "Keanu Reeves", date: "1964-09-02" },
    { name: "Sabrina Carpenter", date: "1999-05-11" },
    { name: "Jenna Ortega", date: "2002-09-27" },
    { name: "Cillian Murphy", date: "1976-05-25" },
    { name: "Rihanna", date: "1988-02-20" },
    { name: "Harry Styles", date: "1994-02-01" },
    { name: "Lady Gaga", date: "1986-03-28" },
    { name: "Tom Holland", date: "1996-06-01" },
    { name: "Margot Robbie", date: "1990-07-02" },
    { name: "The Weeknd", date: "1990-02-16" },
    { name: "Ariana Grande", date: "1993-06-26" },
    { name: "Ryan Gosling", date: "1980-11-12" },
    { name: "Dua Lipa", date: "1995-08-22" }
];

const FEATURED_CELEBS_COUNT = 6;

function renderRandomCelebrityChips() {
    const container = document.getElementById('celeb-chips-container');
    if (!container) return;

    const shuffled = [...PUBLIC_FIGURES];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, FEATURED_CELEBS_COUNT);
    container.innerHTML = '';

    selected.forEach(person => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'celeb-btn';
        btn.textContent = person.name;
        btn.onclick = () => fillCelebrity(person.name, person.date);
        container.appendChild(btn);
    });
}

function reshuffleCelebrities() {
    const btn = document.getElementById('btn-reshuffle-celebs');
    if (btn) {
        btn.classList.remove('spinning');
        void btn.offsetWidth; // trigger reflow to restart rotation
        btn.classList.add('spinning');
    }
    renderRandomCelebrityChips();
}

let moonTextureCanvas = null;

function createBaseMoonTexture(size = 512) {
    if (moonTextureCanvas) return moonTextureCanvas;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.48;

    let seed = 4219;
    function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const baseGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.1, cx, cy, r);
    baseGrad.addColorStop(0, '#f4f1ea');
    baseGrad.addColorStop(0.65, '#dcd7c9');
    baseGrad.addColorStop(0.92, '#b5afa2');
    baseGrad.addColorStop(1, '#8c867a');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, size, size);

    const maria = [
        { x: 0.36, y: 0.34, rx: 0.16, ry: 0.13, rot: -0.3 },
        { x: 0.56, y: 0.38, rx: 0.12, ry: 0.10, rot: 0.2 },
        { x: 0.66, y: 0.48, rx: 0.13, ry: 0.11, rot: 0.4 },
        { x: 0.28, y: 0.52, rx: 0.15, ry: 0.22, rot: -0.1 },
        { x: 0.52, y: 0.56, rx: 0.10, ry: 0.09, rot: 0.1 },
        { x: 0.75, y: 0.42, rx: 0.06, ry: 0.08, rot: 0.0 }
    ];

    maria.forEach(m => {
        ctx.save();
        ctx.translate(size * m.x, size * m.y);
        ctx.rotate(m.rot);
        const mGrad = ctx.createRadialGradient(0, 0, size * m.rx * 0.1, 0, 0, size * m.rx);
        mGrad.addColorStop(0, 'rgba(115, 112, 108, 0.42)');
        mGrad.addColorStop(0.7, 'rgba(130, 127, 122, 0.25)');
        mGrad.addColorStop(1, 'rgba(130, 127, 122, 0)');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, size * m.rx, size * m.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    for (let i = 0; i < 140; i++) {
        const angle = rand() * Math.PI * 2;
        const dist = Math.sqrt(rand()) * (r * 0.94);
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        const cr = (Math.pow(rand(), 2.8) * 18 + 2) * (size / 512);

        ctx.beginPath();
        ctx.arc(x, y, cr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 88, 84, ${0.12 + rand() * 0.18})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x + cr * 0.15, y + cr * 0.15, cr * 0.95, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 252, 245, ${0.15 + rand() * 0.2})`;
        ctx.lineWidth = Math.max(0.8, cr * 0.12);
        ctx.stroke();
    }

    const tychoX = cx - r * 0.12;
    const tychoY = cy + r * 0.58;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1.2;
    for (let j = 0; j < 14; j++) {
        const rayAngle = (j / 14) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX + Math.cos(rayAngle) * r * 0.65, tychoY + Math.sin(rayAngle) * r * 0.65);
        ctx.stroke();
    }

    const limbGrad = ctx.createRadialGradient(cx, cy, r * 0.72, cx, cy, r);
    limbGrad.addColorStop(0, 'rgba(0,0,0,0)');
    limbGrad.addColorStop(1, 'rgba(10, 12, 24, 0.45)');
    ctx.fillStyle = limbGrad;
    ctx.fillRect(0, 0, size, size);

    ctx.restore();
    moonTextureCanvas = canvas;
    return canvas;
}

function renderMoonOnCanvas(targetCanvas, phase, customCx = null, customCy = null, customRadius = null) {
    const ctx = targetCanvas.getContext('2d');
    const w = targetCanvas.width;
    const h = targetCanvas.height;
    const cx = customCx !== null ? customCx : w / 2;
    const cy = customCy !== null ? customCy : h / 2;
    const r = customRadius !== null ? customRadius : Math.min(w, h) * 0.44;

    if (customCx === null) {
        ctx.clearRect(0, 0, w, h);
    }

    const tex = createBaseMoonTexture(512);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(245, 235, 210, 0.22)';
    ctx.shadowBlur = r * 0.22;
    ctx.fillStyle = '#090c18';
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(tex, cx - r * 1.04, cy - r * 1.04, r * 2.08, r * 2.08);

    const angle = phase * 2 * Math.PI;
    const cosAngle = Math.cos(angle);

    ctx.fillStyle = 'rgba(7, 9, 19, 0.93)';
    ctx.beginPath();
    if (phase <= 0.5) {
        ctx.arc(cx, cy, r + 1, Math.PI / 2, -Math.PI / 2, false);
        const rx = Math.abs(cosAngle) * r;
        const anticlockwise = cosAngle < 0;
        ctx.ellipse(cx, cy, rx, r + 1, 0, -Math.PI / 2, Math.PI / 2, anticlockwise);
    } else {
        ctx.arc(cx, cy, r + 1, -Math.PI / 2, Math.PI / 2, false);
        const rx = Math.abs(cosAngle) * r;
        const anticlockwise = cosAngle < 0;
        ctx.ellipse(cx, cy, rx, r + 1, 0, Math.PI / 2, -Math.PI / 2, anticlockwise);
    }
    ctx.closePath();
    ctx.shadowColor = 'rgba(7, 9, 19, 0.95)';
    ctx.shadowBlur = r * 0.08;
    ctx.fill();

    ctx.restore();
}

let currentSoloData = null;
let currentCompatData = null;
let isMoonsMerged = true;

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

function switchMode(mode) {
    const soloSec = document.getElementById('section-solo');
    const compatSec = document.getElementById('section-compat');
    const tabSolo = document.getElementById('tab-solo');
    const tabCompat = document.getElementById('tab-compat');

    if (mode === 'solo') {
        soloSec.classList.remove('hidden');
        compatSec.classList.add('hidden');
        tabSolo.classList.add('active');
        tabCompat.classList.remove('active');
    } else {
        soloSec.classList.add('hidden');
        compatSec.classList.remove('hidden');
        tabCompat.classList.add('active');
        tabSolo.classList.remove('active');
    }
}

function calculateSoloMoon(shouldScroll = true) {
    const dict = I18N[currentLang];
    const dateVal = document.getElementById('solo-date').value;
    const timeVal = document.getElementById('solo-time').value;
    const nameVal = document.getElementById('solo-name').value.trim();

    if (!dateVal) {
        showToast(dict.toastEnterDate);
        return;
    }

    const moon = getMoonData(dateVal, timeVal);
    currentSoloData = { ...moon, name: nameVal || dict.defaultSoloName };

    document.getElementById('solo-subtitle').textContent = nameVal
        ? dict.soloSubWithName(nameVal, moon.formattedDate)
        : dict.soloSubNoName(moon.formattedDate);

    document.getElementById('solo-phase-title').textContent = moon.phaseInfo.name;
    document.getElementById('solo-sun-zodiac').textContent = `${moon.sunZodiac.symbol} ${moon.sunZodiac.name}`;
    document.getElementById('solo-moon-zodiac').textContent = `${moon.moonZodiac.symbol} ${moon.moonZodiac.name}`;
    document.getElementById('solo-illumination').textContent = `${moon.illumination}%`;
    document.getElementById('solo-age').textContent = dict.daysUnit(moon.age);
    document.getElementById('solo-description').textContent = moon.phaseInfo.desc;

    const canvas = document.getElementById('solo-moon-canvas');
    renderMoonOnCanvas(canvas, moon.phase);

    updateUrlParams('solo', { name: nameVal, date: dateVal, time: timeVal });

    const resDiv = document.getElementById('solo-result');
    resDiv.classList.remove('hidden');
    if (shouldScroll) {
        resDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function fillCelebrity(name, date) {
    const dict = I18N[currentLang];
    document.getElementById('p2-name').value = name;
    document.getElementById('p2-date').value = date;
    document.getElementById('p2-time').value = '';

    if (!document.getElementById('p1-date').value) {
        const soloDate = document.getElementById('solo-date').value;
        if (soloDate) {
            document.getElementById('p1-date').value = soloDate;
            document.getElementById('p1-time').value = document.getElementById('solo-time').value;
            document.getElementById('p1-name').value = document.getElementById('solo-name').value || dict.defaultYou;
        }
    }
    showToast(dict.toastSelectedCeleb(name, date));
    if (document.getElementById('p1-date').value) {
        calculateCompatibility(true);
    }
}

function calculateCompatibility(shouldScroll = true) {
    const dict = I18N[currentLang];
    const d1 = document.getElementById('p1-date').value;
    const t1 = document.getElementById('p1-time').value;
    const d2 = document.getElementById('p2-date').value;
    const t2 = document.getElementById('p2-time').value;
    const n1 = document.getElementById('p1-name').value.trim() || dict.defaultSoul1;
    const n2 = document.getElementById('p2-name').value.trim() || dict.defaultSoul2;

    if (!d1 || !d2) {
        showToast(dict.toastEnterBothDates);
        return;
    }

    const m1 = getMoonData(d1, t1);
    const m2 = getMoonData(d2, t2);
    const analysis = analyzeMoonCompatibility(m1, m2);

    currentCompatData = {
        p1: { ...m1, name: n1 },
        p2: { ...m2, name: n2 },
        analysis
    };

    document.getElementById('compat-score').textContent = `${analysis.score}%`;
    document.getElementById('compat-title').textContent = analysis.title;
    document.getElementById('compat-description').textContent = analysis.desc;

    document.getElementById('res-p1-name').textContent = `${n1} (${m1.formattedDate})`;
    document.getElementById('res-p1-phase').textContent = m1.phaseInfo.name;
    document.getElementById('res-p1-illum').textContent = `${m1.illumination}%`;
    document.getElementById('res-p1-sun-zodiac').textContent = `${m1.sunZodiac.symbol} ${m1.sunZodiac.name}`;
    document.getElementById('res-p1-moon-zodiac').textContent = `${m1.moonZodiac.symbol} ${m1.moonZodiac.name}`;

    document.getElementById('res-p2-name').textContent = `${n2} (${m2.formattedDate})`;
    document.getElementById('res-p2-phase').textContent = m2.phaseInfo.name;
    document.getElementById('res-p2-illum').textContent = `${m2.illumination}%`;
    document.getElementById('res-p2-sun-zodiac').textContent = `${m2.sunZodiac.symbol} ${m2.sunZodiac.name}`;
    document.getElementById('res-p2-moon-zodiac').textContent = `${m2.moonZodiac.symbol} ${m2.moonZodiac.name}`;

    const c1 = document.getElementById('compat-moon1-canvas');
    const c2 = document.getElementById('compat-moon2-canvas');
    renderMoonOnCanvas(c1, m1.phase);
    renderMoonOnCanvas(c2, m2.phase);

    updateUrlParams('compat', {
        n1: document.getElementById('p1-name').value.trim(),
        d1,
        t1,
        n2: document.getElementById('p2-name').value.trim(),
        d2,
        t2
    });

    const resDiv = document.getElementById('compat-result');
    resDiv.classList.remove('hidden');

    if (shouldScroll) {
        const spread = window.innerWidth < 640 ? 64 : 85;
        document.getElementById('moon1-wrapper').style.transform = `translateX(-${spread}px)`;
        document.getElementById('moon2-wrapper').style.transform = `translateX(${spread}px)`;
        resDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        isMoonsMerged = false;
        setTimeout(() => {
            setMoonMergeState(true);
        }, 420);
    }
}

function setMoonMergeState(merge) {
    const w1 = document.getElementById('moon1-wrapper');
    const w2 = document.getElementById('moon2-wrapper');
    const spread = window.innerWidth < 640 ? 64 : 85;

    isMoonsMerged = merge;
    if (merge) {
        w1.style.transform = 'translateX(-4px) scale(1.04)';
        w2.style.transform = 'translateX(4px) scale(1.04)';
    } else {
        w1.style.transform = `translateX(-${spread}px) scale(1)`;
        w2.style.transform = `translateX(${spread}px) scale(1)`;
    }
}

function toggleMoonMergeAnimation() {
    setMoonMergeState(!isMoonsMerged);
}

function updateUrlParams(mode, data) {
    try {
        const url = new URL(window.location.href);
        url.search = '';
        url.searchParams.set('mode', mode);

        if (mode === 'solo') {
            if (data.name) url.searchParams.set('name', data.name);
            if (data.date) url.searchParams.set('date', data.date);
            if (data.time) url.searchParams.set('time', data.time);
        } else if (mode === 'compat') {
            if (data.n1) url.searchParams.set('n1', data.n1);
            if (data.d1) url.searchParams.set('d1', data.d1);
            if (data.t1) url.searchParams.set('t1', data.t1);
            if (data.n2) url.searchParams.set('n2', data.n2);
            if (data.d2) url.searchParams.set('d2', data.d2);
            if (data.t2) url.searchParams.set('t2', data.t2);
        }

        window.history.replaceState({}, '', url.toString());
    } catch (e) {
        // Ignore if opened via restricted file:// protocol
    }
}

function copyShareLink(mode) {
    const dict = I18N[currentLang];

    if (mode === 'solo' && currentSoloData) {
        updateUrlParams('solo', {
            name: document.getElementById('solo-name').value.trim(),
            date: currentSoloData.dateString,
            time: currentSoloData.timeString
        });
    } else if (mode === 'compat' && currentCompatData) {
        updateUrlParams('compat', {
            n1: document.getElementById('p1-name').value.trim(),
            d1: currentCompatData.p1.dateString,
            t1: currentCompatData.p1.timeString,
            n2: document.getElementById('p2-name').value.trim(),
            d2: currentCompatData.p2.dateString,
            t2: currentCompatData.p2.timeString
        });
    } else {
        showToast(dict.toastGenerateFirst);
        return;
    }

    const shareUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl)
            .then(() => showToast(dict.toastLinkCopied))
            .catch(() => fallbackCopyText(shareUrl, dict));
    } else {
        fallbackCopyText(shareUrl, dict);
    }
}

function fallbackCopyText(text, dict) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(dict.toastLinkCopied);
    } catch (err) {
        showToast(dict.toastLinkError);
    }
    document.body.removeChild(tempInput);
}

function loadStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const isValidDate = (str) => typeof str === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(str);
    const isValidTime = (str) => typeof str === 'string' && /^\d{2}:\d{2}$/.test(str);

    if (mode === 'compat') {
        const d1 = params.get('d1');
        const t1 = params.get('t1');
        const d2 = params.get('d2');
        const t2 = params.get('t2');
        const n1 = params.get('n1');
        const n2 = params.get('n2');

        switchMode('compat');
        if (n1) document.getElementById('p1-name').value = n1.slice(0, 20);
        if (n2) document.getElementById('p2-name').value = n2.slice(0, 20);

        if (isValidDate(d1)) document.getElementById('p1-date').value = d1;
        if (isValidTime(t1)) document.getElementById('p1-time').value = t1;
        if (isValidDate(d2)) document.getElementById('p2-date').value = d2;
        if (isValidTime(t2)) document.getElementById('p2-time').value = t2;

        if (isValidDate(d1) && isValidDate(d2)) {
            calculateCompatibility(false);
            setMoonMergeState(true);
            return true;
        }
    } else if (mode === 'solo') {
        const date = params.get('date');
        const time = params.get('time');
        const name = params.get('name');

        switchMode('solo');
        if (name) document.getElementById('solo-name').value = name.slice(0, 24);
        if (isValidTime(time)) document.getElementById('solo-time').value = time;
        if (isValidDate(date)) {
            document.getElementById('solo-date').value = date;
            calculateSoloMoon(false);
            return true;
        }
    }
    return false;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY;
}

function downloadStory(mode) {
    const dict = I18N[currentLang];
    const canvas = document.getElementById('story-export-canvas');
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;

    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(232, 228, 217, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, 54);
    ctx.lineTo(W / 2, H - 54);
    ctx.stroke();

    for (let i = 0; i < 120; i++) {
        const sx = Math.random() * W;
        const sy = Math.random() * H;
        const sr = Math.random() * 1.8 + 0.4;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 228, 217, ${Math.random() * 0.45 + 0.1})`;
        ctx.fill();
    }

    ctx.strokeStyle = 'rgba(207, 177, 109, 0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 54, W - 108, H - 108);
    ctx.strokeStyle = 'rgba(232, 228, 217, 0.12)';
    ctx.strokeRect(68, 68, W - 136, H - 136);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#cfb16d';
    ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(dict.storyHeader, W / 2, 165);

    if (mode === 'solo' && currentSoloData) {
        const d = currentSoloData;

        ctx.fillStyle = 'rgba(232, 228, 217, 0.6)';
        ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${d.name.toUpperCase()}  |  ${d.formattedDate}`, W / 2, 255);

        ctx.fillStyle = '#e8e4d9';
        ctx.font = '600 62px "Cinzel", serif';
        wrapCanvasText(ctx, d.phaseInfo.name, W / 2, 365, 880, 76);

        renderMoonOnCanvas(canvas, d.phase, W / 2, 830, 300);

        ctx.beginPath();
        ctx.arc(W / 2, 830, 340, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(232, 228, 217, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#cfb16d';
        ctx.font = '600 34px "Cinzel", serif';
        ctx.fillText(dict.storyStatsSolo(d.sunZodiac, d.moonZodiac), W / 2, 1270);

        ctx.fillStyle = 'rgba(232, 228, 217, 0.75)';
        ctx.font = '400 30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(dict.storyIllumSolo(d.illumination, d.age), W / 2, 1325);

        ctx.fillStyle = 'rgba(232, 228, 217, 0.85)';
        ctx.font = '300 33px "Plus Jakarta Sans", sans-serif';
        const shortDesc = d.phaseInfo.desc.split('. ').slice(0, 2).join('. ') + '.';
        wrapCanvasText(ctx, shortDesc, W / 2, 1425, 820, 52);

    } else if (mode === 'compat' && currentCompatData) {
        const { p1, p2, analysis } = currentCompatData;

        ctx.fillStyle = 'rgba(232, 228, 217, 0.75)';
        ctx.font = '400 34px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${p1.name}   &   ${p2.name}`, W / 2, 255);

        ctx.fillStyle = '#e8e4d9';
        ctx.font = '600 130px "Cinzel", serif';
        ctx.fillText(`${analysis.score}%`, W / 2, 420);

        ctx.fillStyle = '#cfb16d';
        ctx.font = '600 44px "Cinzel", serif';
        wrapCanvasText(ctx, analysis.title, W / 2, 515, 860, 58);

        const moonY = 930;
        const moonR = 250;

        ctx.beginPath();
        ctx.arc(W / 2, moonY, moonR + 38, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(232, 228, 217, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        renderMoonOnCanvas(canvas, p1.phase, W / 2 - 12, moonY, moonR);
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        renderMoonOnCanvas(canvas, p2.phase, W / 2 + 12, moonY, moonR);
        ctx.restore();

        ctx.fillStyle = '#cfb16d';
        ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${p1.name} (${p1.formattedDate})`, W / 2, 1305);
        ctx.fillStyle = 'rgba(232, 228, 217, 0.65)';
        ctx.font = '400 25px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(dict.storyPersonLine(p1), W / 2, 1348);

        ctx.fillStyle = '#cfb16d';
        ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${p2.name} (${p2.formattedDate})`, W / 2, 1435);
        ctx.fillStyle = 'rgba(232, 228, 217, 0.65)';
        ctx.font = '400 25px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(dict.storyPersonLine(p2), W / 2, 1478);

        ctx.fillStyle = 'rgba(232, 228, 217, 0.85)';
        ctx.font = '300 30px "Plus Jakarta Sans", sans-serif';
        const shortCompat = analysis.desc.split('. ').slice(0, 2).join('. ') + '.';
        wrapCanvasText(ctx, shortCompat, W / 2, 1580, 840, 46);
    } else {
        showToast(dict.toastGenerateFirst);
        return;
    }

    ctx.fillStyle = 'rgba(207, 177, 109, 0.65)';
    ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(dict.storyFooter, W / 2, 1810);

    try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = mode === 'solo' ? dict.storyFileSolo : dict.storyFileCompat;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(dict.toastStorySaved);
    } catch (err) {
        showToast(dict.toastStoryError);
    }
}

function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 7500);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.4 + 0.3,
                alpha: Math.random(),
                speed: (Math.random() * 0.014 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
                isGold: Math.random() < 0.15
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let s of stars) {
            s.alpha += s.speed;
            if (s.alpha > 0.9 || s.alpha < 0.15) s.speed *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.isGold
                ? `rgba(207, 177, 109, ${s.alpha})`
                : `rgba(232, 228, 217, ${s.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

function renderLiveMoonBar() {
    const canvas = document.getElementById('live-moon-canvas');
    if (!canvas || typeof getLiveMoonStatus !== 'function') return;

    const dict = I18N[currentLang];
    const { moon, nextEvent } = getLiveMoonStatus();

    renderMoonOnCanvas(canvas, moon.phase);
    document.getElementById('live-moon-phase').textContent = moon.phaseInfo.name;
    document.getElementById('live-moon-illum').textContent = `${moon.illumination}%`;
    document.getElementById('live-moon-zodiac').textContent = `${moon.moonZodiac.symbol} ${moon.moonZodiac.name}`;
    document.getElementById('live-moon-next').textContent = nextEvent.type === 'full'
        ? dict.liveNextFull(nextEvent.days)
        : dict.liveNextNew(nextEvent.days);
}

window.onload = function () {
    const detectedLang = detectDeviceLanguage();
    setLanguage(detectedLang);
    renderLiveMoonBar();
    renderRandomCelebrityChips();
    initStarfield();

    const loadedFromUrl = loadStateFromUrl();
    if (!loadedFromUrl) {
        document.getElementById('solo-date').value = '1999-07-28';
        document.getElementById('p1-date').value = '1999-07-28';
    }
};