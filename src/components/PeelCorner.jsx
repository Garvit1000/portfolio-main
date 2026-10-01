import React, { useEffect, useState } from 'react';
import { useWorld } from './WorldProvider';
import earthset from '../assets/space/earthset.webp';

const REST = 46;
const LIFTED = 84;
const PEEK = 68;

/* A dog-eared page corner, bottom-right. The fold is the square's diagonal:
   below it, the gap shows the other world; above it, the flap is the back of
   the current page, folded over flat. Click (or Enter) to peel the page. */
const PeelCorner = () => {
    const { world, peel } = useWorld();
    const [size, setSize] = useState(REST);
    const [hover, setHover] = useState(false);
    const toSpace = world === 'paper';

    // A single gentle peek per visit so people notice the corner
    useEffect(() => {
        let seen = false;
        try { seen = sessionStorage.getItem('peel-peeked') === '1'; } catch { /* ignore */ }
        if (seen || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const up = setTimeout(() => setSize(s => (s === REST ? PEEK : s)), 2200);
        const down = setTimeout(() => {
            setSize(s => (s === PEEK ? REST : s));
            try { sessionStorage.setItem('peel-peeked', '1'); } catch { /* ignore */ }
        }, 3000);
        return () => { clearTimeout(up); clearTimeout(down); };
    }, []);

    const lift = (on) => {
        setHover(on);
        setSize(on ? LIFTED : REST);
        // warm the cache so the hero photo is ready the moment the page peels
        if (on && toSpace) new Image().src = earthset;
    };

    return (
        <div className="peel-dock fixed bottom-0 right-0 z-[60]">
            <span
                className={`peel-hint pointer-events-none absolute bottom-3 whitespace-nowrap transition-[opacity,transform] duration-300 ${hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
                style={{ right: LIFTED + 12 }}
            >
                {toSpace ? 'Enter space' : 'Back to paper'}
            </span>
            <button
                type="button"
                onClick={(e) => {
                    peel(size);
                    setHover(false);
                    setSize(REST);
                    if (!e.currentTarget.matches(':focus-visible')) e.currentTarget.blur();
                }}
                onMouseEnter={() => lift(true)}
                onMouseLeave={() => lift(false)}
                // lift on keyboard focus only, so a mouse click doesn't leave it stuck open
                onFocus={(e) => e.currentTarget.matches(':focus-visible') && lift(true)}
                onBlur={() => lift(false)}
                aria-label={toSpace ? 'Peel the page to enter space mode' : 'Peel back to paper mode'}
                data-sound="off"
                className="peel-corner block"
                style={{ width: size, height: size }}
            >
                <span
                    className={`peel-gap ${toSpace ? 'is-space' : 'is-paper'}`}
                    style={toSpace ? { backgroundImage: `url(${earthset})` } : undefined}
                    aria-hidden="true"
                />
                <span className="peel-flap-shadow" aria-hidden="true">
                    <span className={`peel-dogear ${toSpace ? 'is-paper' : 'is-space'}`} />
                </span>
            </button>
        </div>
    );
};

export default PeelCorner;
