import React, { createContext, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useUiSounds } from './SoundProvider';
import { playPeel } from '../lib/tear-sound';

/* Two worlds: "paper" (the warm light site) and "space" (dark mode).
   Switching peels the current page off from the bottom-right corner.

   How the peel works: inside a View Transition, the old page is a snapshot
   (::view-transition-old(root)) sitting on top of the new one. Each frame we
   move a 45° fold line in from the corner and set three clip-paths:
     --peel-old   what's left of the old page (above-left of the fold)
     --peel-hole  the revealed area (below-right of the fold), for a soft shadow
     --peel-flap  the peeled part reflected across the fold: the paper's back
   The flap and shadow are empty elements whose transition pseudos we paint
   with CSS gradients (see index.css), so they can change every frame. */

const STORAGE_KEY = 'portfolio.world';
const VR_KEY = 'portfolio.vr';
const PEEL_MS = 1150;

const WorldContext = createContext({ world: 'paper', peel: () => { }, peelingFrom: null, vr: false, toggleVr: () => { } });
export const useWorld = () => useContext(WorldContext);

const initialWorld = () => {
    if (typeof document === 'undefined') return 'paper';
    return document.documentElement.classList.contains('space') ? 'space' : 'paper';
};

// Sutherland-Hodgman: clip a polygon to the half-plane where keep(p) >= 0
function clipPolygon(points, f) {
    const out = [];
    for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        const fa = f(a), fb = f(b);
        if (fa >= 0) out.push(a);
        if ((fa >= 0) !== (fb >= 0)) {
            const t = fa / (fa - fb);
            out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        }
    }
    return out;
}

const toPolygon = (pts) => (pts.length < 3
    ? 'polygon(0 0, 0 0, 0 0)'
    : `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(', ')})`);

/* c = how far the fold has travelled from the corner, measured as u + v where
   u, v are distances from the right and bottom edges. */
function setPeelGeometry(root, c) {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const rect = [[0, 0], [W, 0], [W, H], [0, H]]; // in (u, v)
    const toScreen = ([u, v]) => [W - u, H - v];

    const kept = clipPolygon(rect, ([u, v]) => u + v - c);
    const peeled = clipPolygon(rect, ([u, v]) => c - (u + v));
    const flap = peeled.map(([u, v]) => [c - v, c - u]); // mirror across u + v = c

    root.style.setProperty('--peel-old', toPolygon(kept.map(toScreen)));
    root.style.setProperty('--peel-hole', toPolygon(peeled.map(toScreen)));
    root.style.setProperty('--peel-flap', toPolygon(flap.map(toScreen)));
    // fold position along the 135° diagonal, for the gradients (0% top-left, 100% bottom-right)
    root.style.setProperty('--peel-fold', `${(((W + H - c) / (W + H)) * 100).toFixed(2)}%`);
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function animate(duration, onFrame) {
    return new Promise((resolve) => {
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            onFrame(easeInOutCubic(t));
            if (t < 1) requestAnimationFrame(tick);
            else resolve();
        };
        requestAnimationFrame(tick);
    });
}

export function WorldProvider({ children }) {
    const [world, setWorld] = useState(initialWorld);
    const [peelingFrom, setPeelingFrom] = useState(null); // the world being peeled away
    const busy = useRef(false);
    // VR headset view: an opt-in way of looking at the space world
    const [vr, setVr] = useState(() => {
        try { return localStorage.getItem(VR_KEY) === '1'; } catch { return false; }
    });
    const toggleVr = useCallback(() => setVr(v => {
        try { localStorage.setItem(VR_KEY, v ? '0' : '1'); } catch { /* private mode */ }
        return !v;
    }), []);
    const { enabled: soundOn } = useUiSounds();

    useLayoutEffect(() => {
        const root = document.documentElement;
        const space = world === 'space';
        root.classList.toggle('space', space);
        root.style.colorScheme = space ? 'dark' : 'light';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', space ? '#000000' : '#f2f0ec');
        try { localStorage.setItem(STORAGE_KEY, world); } catch { /* private mode */ }
    }, [world]);

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('vr', vr && world === 'space');
    }, [vr, world]);

    // `startSize` lets the peel continue from however far the corner is lifted
    const peel = useCallback(async (startSize = 56) => {
        if (busy.current) return;
        busy.current = true;
        const from = world;
        const next = world === 'space' ? 'paper' : 'space';
        const root = document.documentElement;
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (!document.startViewTransition || reduce) {
            setWorld(next);
            busy.current = false;
            return;
        }

        if (soundOn) playPeel();
        const start = startSize; // a curl of size s has its fold at u + v = s, so we continue from there
        setPeelGeometry(root, start);
        root.classList.add('peeling');
        root.dataset.peelFrom = from;

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                setPeelingFrom(from);
                setWorld(next);
            });
        });

        try {
            await transition.ready;
            const end = (window.innerWidth + window.innerHeight) * 1.02;
            await animate(PEEL_MS, (t) => setPeelGeometry(root, start + (end - start) * t));
            await transition.finished;
        } catch {
            // transition skipped or interrupted: the new world is already applied
        } finally {
            root.classList.remove('peeling');
            delete root.dataset.peelFrom;
            setPeelingFrom(null);
            busy.current = false;
        }
    }, [world, soundOn]);

    return (
        <WorldContext.Provider value={{ world, peel, peelingFrom, vr, toggleVr }}>
            {children}
            {/* Empty layers captured by the transition and painted via CSS */}
            {peelingFrom && (
                <>
                    <div className="peel-shade" aria-hidden="true" />
                    <div className="peel-flap" aria-hidden="true" />
                </>
            )}
        </WorldContext.Provider>
    );
}
