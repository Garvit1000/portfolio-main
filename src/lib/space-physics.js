/* A little physics for the space world, in one rAF loop that sleeps when
   nothing moves.

   1. Spacetime bend: scroll velocity curves the page. Each [data-warp]
      block tilts away from the viewer in proportion to how far it is from
      the middle of the screen, so above-centre and below-centre lean in
      opposite directions and the page reads as a cylinder. It relaxes to
      flat when you stop.
   2. Gravity: big headings are pulled faintly toward the cursor, through a
      damped spring, so they lag, overshoot a touch and settle.
   3. The porthole vignette darkens with speed (via --speed on <html>).
   4. In the VR view, moving the mouse turns your head: the world shifts
      the other way behind the lenses, on the same kind of spring. */

const GRAVITY_SELECTOR = '.space-title, .space-h2, .mission-name, .journey-title, .bh-title';
const MAX_TILT = 9;        // degrees at the screen edge, at full speed
const FULL_SPEED = 45;     // px per frame that counts as "full speed"
const PULL = 9;            // px, maximum gravitational offset
const RADIUS = 460;        // px, how far gravity reaches
const SPRING = 0.06;
const DAMPING = 0.82;

export function startSpacePhysics() {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return () => { };
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let raf = 0;
    let lastY = window.scrollY;
    let speed = 0;           // smoothed, signed px/frame
    let pointer = null;      // { x, y } in viewport coords
    const bodies = new Map(); // element -> { x, y, vx, vy }
    const head = { x: 0, y: 0, vx: 0, vy: 0 };

    const warpTargets = () => document.querySelectorAll('[data-warp]');

    const step = () => {
        raf = 0;
        const vh = window.innerHeight;

        // --- scroll velocity, eased so it rises and falls smoothly
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        speed += (delta - speed) * 0.18;
        const s = Math.max(-1, Math.min(1, speed / FULL_SPEED));
        const moving = Math.abs(speed) > 0.05;

        root.style.setProperty('--speed', Math.abs(s).toFixed(3));

        for (const el of warpTargets()) {
            if (!moving) { el.style.transform = ''; continue; }
            const r = el.getBoundingClientRect();
            if (r.bottom < -100 || r.top > vh + 100) continue;
            // -1 at the top edge of the screen, 0 at the middle, 1 at the bottom
            const d = Math.max(-1.4, Math.min(1.4, ((r.top + r.height / 2) - vh / 2) / (vh / 2)));
            const tilt = -d * Math.abs(s) * MAX_TILT;
            const sink = Math.abs(d) * Math.abs(s) * 60;
            el.style.transform = `perspective(1100px) translateZ(${(-sink).toFixed(1)}px) rotateX(${tilt.toFixed(2)}deg)`;
        }

        // --- gravity toward the cursor, with inertia
        let restless = false;
        if (finePointer) {
            for (const el of document.querySelectorAll(GRAVITY_SELECTOR)) {
                let b = bodies.get(el);
                if (!b) { b = { x: 0, y: 0, vx: 0, vy: 0 }; bodies.set(el, b); }
                let tx = 0, ty = 0;
                if (pointer) {
                    const r = el.getBoundingClientRect();
                    if (r.bottom > 0 && r.top < vh) {
                        // nearest point of the element to the cursor, minus our own offset
                        const cx = Math.max(r.left, Math.min(pointer.x, r.right)) - b.x;
                        const cy = Math.max(r.top, Math.min(pointer.y, r.bottom)) - b.y;
                        const dx = pointer.x - cx;
                        const dy = pointer.y - cy;
                        const dist = Math.hypot(dx, dy);
                        if (dist < RADIUS && dist > 0.5) {
                            const f = Math.pow(1 - dist / RADIUS, 2) * PULL;
                            tx = (dx / dist) * f;
                            ty = (dy / dist) * f;
                        }
                    }
                }
                b.vx = (b.vx + (tx - b.x) * SPRING) * DAMPING;
                b.vy = (b.vy + (ty - b.y) * SPRING) * DAMPING;
                b.x += b.vx;
                b.y += b.vy;
                if (Math.abs(b.vx) > 0.01 || Math.abs(b.vy) > 0.01 || Math.abs(tx - b.x) > 0.05 || Math.abs(ty - b.y) > 0.05) restless = true;
                el.style.translate = Math.abs(b.x) < 0.05 && Math.abs(b.y) < 0.05 ? '' : `${b.x.toFixed(2)}px ${b.y.toFixed(2)}px`;
            }
        }

        // --- head look, VR view only
        const main = document.querySelector('main');
        if (main) {
            const looking = finePointer && pointer && root.classList.contains('vr');
            const hx = looking ? (0.5 - pointer.x / window.innerWidth) * 30 : 0;
            const hy = looking ? (0.5 - pointer.y / vh) * 18 : 0;
            head.vx = (head.vx + (hx - head.x) * 0.04) * 0.86;
            head.vy = (head.vy + (hy - head.y) * 0.04) * 0.86;
            head.x += head.vx;
            head.y += head.vy;
            const still = Math.abs(head.x) < 0.05 && Math.abs(head.y) < 0.05;
            main.style.translate = still ? '' : `${head.x.toFixed(2)}px ${head.y.toFixed(2)}px`;
            if (Math.abs(head.vx) > 0.01 || Math.abs(head.vy) > 0.01 || Math.abs(hx - head.x) > 0.05 || Math.abs(hy - head.y) > 0.05) restless = true;
        }

        if (moving || restless) raf = requestAnimationFrame(step);
    };

    const wake = () => { if (!raf) raf = requestAnimationFrame(step); };
    const onPointer = (e) => { pointer = { x: e.clientX, y: e.clientY }; wake(); };
    const onLeave = () => { pointer = null; wake(); };

    window.addEventListener('scroll', wake, { passive: true });
    if (finePointer) {
        window.addEventListener('pointermove', onPointer, { passive: true });
        document.addEventListener('pointerleave', onLeave);
    }
    wake();

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', wake);
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('pointerleave', onLeave);
        root.style.removeProperty('--speed');
        for (const el of warpTargets()) el.style.transform = '';
        for (const el of bodies.keys()) el.style.translate = '';
        const main = document.querySelector('main');
        if (main) main.style.translate = '';
    };
}
