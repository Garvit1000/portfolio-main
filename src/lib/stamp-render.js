/* Renderer for the Lab's stamp tool ("Postmarked").
   A photo becomes a one-ink line engraving, framed as a perforated postage
   stamp and cancelled with a postmark carrying the place and date.
   Everything happens on <canvas> in the browser; nothing is uploaded. */

// Stamp geometry in design units. Width and height are multiples of the
// perforation step so holes land exactly on the corners.
export const STAMP_W = 300;
export const STAMP_H = 380;
const STEP = 20;
const HOLE_R = 6;
const MARGIN = 20;
const ART = { x: MARGIN, y: MARGIN, w: STAMP_W - MARGIN * 2, h: 280 };

export const PAPER = '#fbf6ea';
const PAPER_RGB = [251, 246, 234];

// Classic stamp inks
export const INKS = {
    carmine: { label: 'Carmine', color: '#b1243d' },
    ultramarine: { label: 'Ultramarine', color: '#26409a' },
    olive: { label: 'Olive', color: '#4f5e27' },
    sepia: { label: 'Sepia', color: '#6b4325' },
    ink: { label: 'Black', color: '#1f1d1b' },
};

const DISPLAY = '"Averia Sans Libre", ui-sans-serif, system-ui, sans-serif';
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DEG = Math.PI / 180;

const hexRgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const setSpacing = (ctx, px) => { if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`; };

export async function ensureStampFonts() {
    try {
        await Promise.all([
            document.fonts.load(`700 34px ${DISPLAY}`),
            document.fonts.load(`700 12px ${DISPLAY}`),
        ]);
    } catch { /* fall back to system fonts */ }
}

/* ---------- engraving ---------- */

// Separable box blur on a luminance buffer; softens JPEG noise so lines stay clean
function boxBlur(src, w, h, r) {
    const tmp = new Float32Array(src.length);
    const out = new Float32Array(src.length);
    const size = r * 2 + 1;
    for (let y = 0; y < h; y++) {
        let acc = 0;
        for (let x = -r; x <= r; x++) acc += src[y * w + Math.min(w - 1, Math.max(0, x))];
        for (let x = 0; x < w; x++) {
            tmp[y * w + x] = acc / size;
            acc += src[y * w + Math.min(w - 1, x + r + 1)] - src[y * w + Math.max(0, x - r)];
        }
    }
    for (let x = 0; x < w; x++) {
        let acc = 0;
        for (let y = -r; y <= r; y++) acc += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
        for (let y = 0; y < h; y++) {
            out[y * w + x] = acc / size;
            acc += tmp[Math.min(h - 1, y + r + 1) * w + x] - tmp[Math.max(0, y - r) * w + x];
        }
    }
    return out;
}

const smoothstep = (e0, e1, x) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
};

/* Turns an image into a line engraving on paper, w x h device pixels.
   Line thickness follows darkness; a cross-hatch layer fills the shadows;
   the line phase bends with the tones so contours read like a real plate. */
export function engrave(img, w, h, inkHex, { focusY = 0.5 } = {}) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });

    // cover-fit the photo into the art window
    const s = Math.max(w / img.width, h / img.height);
    const iw = img.width * s, ih = img.height * s;
    ctx.drawImage(img, (w - iw) / 2, (h - ih) * focusY, iw, ih);
    const data = ctx.getImageData(0, 0, w, h);
    const px = data.data;

    // luminance + auto-levels (2nd to 98th percentile)
    const n = w * h;
    let lum = new Float32Array(n);
    const hist = new Uint32Array(256);
    for (let i = 0; i < n; i++) {
        const l = 0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2];
        lum[i] = l;
        hist[l | 0]++;
    }
    let lo = 0, hi = 255, acc = 0;
    for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc > n * 0.02) { lo = i; break; } }
    acc = 0;
    for (let i = 255; i >= 0; i--) { acc += hist[i]; if (acc > n * 0.02) { hi = i; break; } }
    const range = Math.max(24, hi - lo);
    for (let i = 0; i < n; i++) lum[i] = Math.min(1, Math.max(0, (lum[i] - lo) / range));

    // Half-strength histogram equalisation: dark or flat photos spread their
    // tones so detail survives the engraving, without over-cooking good ones
    const eqHist = new Uint32Array(256);
    for (let i = 0; i < n; i++) eqHist[(lum[i] * 255) | 0]++;
    const cdf = new Float32Array(256);
    let run = 0;
    for (let i = 0; i < 256; i++) { run += eqHist[i]; cdf[i] = run / n; }
    for (let i = 0; i < n; i++) lum[i] = 0.5 * lum[i] + 0.5 * cdf[(lum[i] * 255) | 0];

    lum = boxBlur(lum, w, h, Math.max(1, Math.round(w / 400)));

    const [ir, ig, ib] = hexRgb(inkHex);
    const [pr, pg, pb] = PAPER_RGB;
    const spacing = Math.max(4, w / 110);          // line pitch in device px
    const a1 = -14 * DEG, a2 = 52 * DEG;           // main lines and cross-hatch
    const c1 = Math.cos(a1) / spacing, s1 = Math.sin(a1) / spacing;
    const c2 = Math.cos(a2) / (spacing * 1.15), s2 = Math.sin(a2) / (spacing * 1.15);
    const aa = 0.75 / spacing;                     // ~1px anti-aliasing, in line units

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = y * w + x;
            const l = lum[i];
            // gentle S-curve so midtones keep separation
            const d = 1 - (l < 0.5 ? 2 * l * l : 1 - 2 * (1 - l) * (1 - l));

            // main lines: phase bends with tone
            let u = x * c1 + y * s1 + l * 0.9;
            let f = Math.abs(u - Math.floor(u) - 0.5);
            // lines never fully close up, so paper shows through even in shadow
            const hw = 0.36 * Math.pow(d, 0.9);
            let ink = smoothstep(hw + aa, hw - aa, f);

            // cross-hatching only in the shadows
            if (d > 0.58) {
                u = x * c2 + y * s2;
                f = Math.abs(u - Math.floor(u) - 0.5);
                const hw2 = 0.26 * Math.pow((d - 0.58) / 0.42, 1.2);
                ink = Math.max(ink, smoothstep(hw2 + aa, hw2 - aa, f));
            }

            const k = ink * 0.94;
            px[i * 4] = pr + (ir - pr) * k;
            px[i * 4 + 1] = pg + (ig - pg) * k;
            px[i * 4 + 2] = pb + (ib - pb) * k;
            px[i * 4 + 3] = 255;
        }
    }
    ctx.putImageData(data, 0, 0);
    return c;
}

/* ---------- postmark ---------- */

export const formatPostmarkDate = (date) => {
    const d = date instanceof Date && !isNaN(date) ? date : new Date();
    return { day: `${d.getDate()} ${MONTHS[d.getMonth()]}`, year: String(d.getFullYear()) };
};

// Deterministic PRNG so the ink texture is stable between re-renders
function rng(seed) {
    let s = seed % 2147483647 || 1;
    return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const hashString = (str) => [...str].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) | 0, 7) >>> 0;

// Draws the cancellation (ring + date + wavy lines) centred at (cx, cy), radius r
function drawPostmark(ctx, { cx, cy, r, place, country, date, scale }) {
    const { day, year } = formatPostmarkDate(date);
    const ring = [place, country].filter(Boolean).map(t => t.toUpperCase()).join(' ★ ') + ' ★ ';

    // Draw on its own layer so we can knock out specks of "missed" ink
    const size = Math.ceil((r * 2 + 220) * scale);
    const layer = document.createElement('canvas');
    layer.width = size;
    layer.height = Math.ceil((r * 2 + 20) * scale);
    const x = layer.getContext('2d');
    x.scale(scale, scale);
    const ox = 210 + r, oy = r + 10; // circle centre inside the layer; waves extend left

    x.strokeStyle = x.fillStyle = '#1b1a19';
    x.lineCap = 'round';
    x.lineWidth = 2.6;
    x.beginPath(); x.arc(ox, oy, r, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 1.4;
    x.beginPath(); x.arc(ox, oy, r - 17, 0, Math.PI * 2); x.stroke();

    // Wavy cancellation lines to the left of the circle
    x.lineWidth = 2.2;
    [-24, -8, 8, 24].forEach((dy) => {
        x.beginPath();
        const y0 = oy + dy;
        let wx = ox - r - 8;
        x.moveTo(wx, y0);
        for (let k = 0; k < 8; k++) {
            x.quadraticCurveTo(wx - 8, y0 + (k % 2 ? 5 : -5), wx - 16, y0);
            wx -= 16;
        }
        x.stroke();
    });

    // Ring text, spaced to wrap the circle exactly once
    const radius = r - 8.5;
    x.font = `700 10px ${DISPLAY}`;
    setSpacing(x, 0);
    const chars = [...ring];
    const widths = chars.map(ch => x.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0);
    const extra = (2 * Math.PI * radius - total) / Math.max(chars.length, 1);
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    let along = 0;
    chars.forEach((ch, i) => {
        const a = -Math.PI / 2 - Math.PI / 2 + (along + widths[i] / 2) / radius;
        x.save();
        x.translate(ox + radius * Math.cos(a), oy + radius * Math.sin(a));
        x.rotate(a + Math.PI / 2);
        x.fillText(ch, 0, 0);
        x.restore();
        along += widths[i] + extra;
    });

    // Date in the middle
    x.font = `700 15px ${DISPLAY}`;
    setSpacing(x, 0.5);
    x.fillText(day, ox, oy - 8);
    x.fillRect(ox - 20, oy + 1, 40, 1.2);
    x.fillText(year, ox, oy + 12);

    // Uneven ink: punch out tiny specks
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.globalCompositeOperation = 'destination-out';
    const rand = rng(hashString(ring + day + year));
    const specks = Math.round(layer.width * layer.height / 900);
    for (let i = 0; i < specks; i++) {
        x.globalAlpha = 0.35 + rand() * 0.65;
        x.beginPath();
        x.arc(rand() * layer.width, rand() * layer.height, (0.4 + rand() * 1.4) * scale, 0, Math.PI * 2);
        x.fill();
    }

    ctx.save();
    ctx.globalAlpha = 0.78;
    ctx.globalCompositeOperation = 'multiply';
    ctx.translate(cx, cy);
    ctx.rotate(-9 * DEG);
    ctx.drawImage(layer, -ox, -oy, layer.width / scale, layer.height / scale);
    ctx.restore();
}

/* ---------- stamp ---------- */

function punchPerforations(ctx, w, h) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    for (let i = 0; i <= w / STEP; i++) {
        ctx.moveTo(i * STEP + HOLE_R, 0); ctx.arc(i * STEP, 0, HOLE_R, 0, Math.PI * 2);
        ctx.moveTo(i * STEP + HOLE_R, h); ctx.arc(i * STEP, h, HOLE_R, 0, Math.PI * 2);
    }
    for (let j = 0; j <= h / STEP; j++) {
        ctx.moveTo(HOLE_R, j * STEP); ctx.arc(0, j * STEP, HOLE_R, 0, Math.PI * 2);
        ctx.moveTo(w + HOLE_R, j * STEP); ctx.arc(w, j * STEP, HOLE_R, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.restore();
}

function fitText(ctx, text, maxW, size, weight = 700) {
    let s = size;
    ctx.font = `${weight} ${s}px ${DISPLAY}`;
    while (s > 9 && ctx.measureText(text).width > maxW) {
        s -= 1;
        ctx.font = `${weight} ${s}px ${DISPLAY}`;
    }
    return s;
}

/* Renders one stamp to a transparent canvas at `scale` px per design unit.
   `engraved` is the output of engrave() sized for ART at the same scale. */
export function renderStamp({ engraved, ink, place, country, date, value, postmark = true, scale = 3 }) {
    const c = document.createElement('canvas');
    c.width = STAMP_W * scale;
    c.height = STAMP_H * scale;
    const ctx = c.getContext('2d');
    ctx.scale(scale, scale);
    const inkHex = INKS[ink]?.color || INKS.carmine.color;

    // paper with a faint fibre texture
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, STAMP_W, STAMP_H);
    const rand = rng(1234);
    ctx.fillStyle = 'rgba(120, 100, 70, 0.05)';
    for (let i = 0; i < 380; i++) ctx.fillRect(rand() * STAMP_W, rand() * STAMP_H, 0.6 + rand() * 2.2, 0.4);

    // artwork + double frame
    ctx.drawImage(engraved, ART.x, ART.y, ART.w, ART.h);
    ctx.strokeStyle = inkHex;
    ctx.lineWidth = 1.6;
    ctx.strokeRect(ART.x - 5, ART.y - 5, ART.w + 10, ART.h + 10);
    ctx.lineWidth = 0.7;
    ctx.strokeRect(ART.x - 1.5, ART.y - 1.5, ART.w + 3, ART.h + 3);

    // caption band: value on the left, place on the right
    const bandTop = ART.y + ART.h + 5;
    const bandMid = bandTop + (STAMP_H - MARGIN - bandTop) / 2 + 2;
    ctx.fillStyle = inkHex;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const val = (value || '').trim() || '1';
    fitText(ctx, val, 90, 34);
    setSpacing(ctx, -1);
    ctx.fillText(val, ART.x - 4, bandMid);
    const valW = ctx.measureText(val).width;

    ctx.textAlign = 'right';
    const label = (place || 'Somewhere').toUpperCase();
    setSpacing(ctx, 2.4);
    fitText(ctx, label, ART.w - valW - 18, 19);
    ctx.fillText(label, ART.x + ART.w + 4, bandMid - (country ? 7 : 0));
    if (country) {
        ctx.font = `700 10px ${DISPLAY}`;
        setSpacing(ctx, 2.2);
        ctx.globalAlpha = 0.7;
        ctx.fillText(country.toUpperCase(), ART.x + ART.w + 4, bandMid + 12);
        ctx.globalAlpha = 1;
    }

    if (postmark) {
        drawPostmark(ctx, { cx: STAMP_W - 72, cy: STAMP_H - 148, r: 50, place, country, date, scale });
    }

    punchPerforations(ctx, STAMP_W, STAMP_H);
    return c;
}

/* ---------- sheet ---------- */

// Grid for n stamps: 2 -> 2x1, 3 -> 3x1, 4 -> 2x2, 5-6 -> 3x2
export const sheetGrid = (n) => (n <= 3 ? [n, 1] : n === 4 ? [2, 2] : [3, 2]);

/* Several stamps on one sheet. Neighbouring stamps share perforations
   (their half-holes meet), with a printed selvage around the edge. */
export function renderSheet(stamps, { scale = 2 } = {}) {
    const [cols, rows] = sheetGrid(stamps.length);
    const pad = 56;
    const W = cols * STAMP_W + pad * 2;
    const H = rows * STAMP_H + pad * 2;
    const c = document.createElement('canvas');
    c.width = W * scale;
    c.height = H * scale;
    const ctx = c.getContext('2d');
    ctx.scale(scale, scale);

    ctx.fillStyle = '#f3ecdc';
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 10);
    ctx.fill();

    stamps.forEach((stamp, i) => {
        const x = pad + (i % cols) * STAMP_W;
        const y = pad + Math.floor(i / cols) * STAMP_H;
        ctx.drawImage(stamp, x, y, STAMP_W, STAMP_H);
    });
    // empty slots keep their perforated outline so the grid reads as a sheet
    for (let i = stamps.length; i < cols * rows; i++) {
        const x = pad + (i % cols) * STAMP_W;
        const y = pad + Math.floor(i / cols) * STAMP_H;
        ctx.strokeStyle = 'rgba(60,50,40,0.18)';
        ctx.setLineDash([2, 6]);
        ctx.strokeRect(x + 0.5, y + 0.5, STAMP_W - 1, STAMP_H - 1);
        ctx.setLineDash([]);
    }

    // selvage print: title, credit and colour registration marks
    ctx.fillStyle = 'rgba(60,50,40,0.55)';
    ctx.font = `700 12px ${DISPLAY}`;
    setSpacing(ctx, 3);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText('POSTMARKED', pad, pad / 2);
    ctx.textAlign = 'right';
    ctx.fillText('GARVIT.ME/LAB', W - pad, H - pad / 2);
    Object.values(INKS).forEach(({ color }, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(W - pad - i * 16, pad / 2, 4.5, 0, Math.PI * 2);
        ctx.fill();
    });
    return c;
}

// Pixel size of the art window, for callers that engrave at a given scale
export const artSize = (scale) => ({ w: Math.round(ART.w * scale), h: Math.round(ART.h * scale) });
