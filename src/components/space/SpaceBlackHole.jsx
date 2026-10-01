import React, { useEffect, useRef } from 'react';
import blackHole from '../../assets/space/black-hole.webp';
import { setImmersed } from '../../lib/immersion';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Sagittarius A*, the black hole at the centre of the Milky Way, as
   photographed by the Event Horizon Telescope (2022). Scrolling is the
   approach: it grows out of the dark, the words arrive one at a time, and
   it all falls back to black before the page carries on. */
const SpaceBlackHole = () => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        let raf = 0;

        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const p = clamp(-rect.top / (rect.height - window.innerHeight));
            el.style.setProperty('--p', p.toFixed(4));
            setImmersed('black-hole', rect.top < window.innerHeight * 0.25 && rect.bottom > window.innerHeight * 0.75);
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(raf);
            setImmersed('black-hole', false);
        };
    }, []);

    return (
        <section ref={ref} className="bh" aria-labelledby="bh-title">
            <div className="bh-stage">
                <img src={blackHole} alt="The first image of Sagittarius A*, a glowing ring of gas around a dark centre" loading="lazy" className="bh-img" />

                <div className="bh-copy container-xl">
                    <p className="bh-step text-[13px] text-foreground/55" style={{ '--from': 0.18 }}>
                        Sagittarius A*  ·  27,000 light years from here
                    </p>
                    <h2 id="bh-title" className="bh-step bh-title" style={{ '--from': 0.34 }}>Someday.</h2>
                    <p className="bh-step mx-auto mt-6 max-w-md text-[17px] leading-relaxed font-light text-foreground/70" style={{ '--from': 0.5 }}>
                        A real photograph of the black hole at the centre of our galaxy, four million
                        times the mass of the Sun, taken by eight observatories working as one telescope
                        the size of Earth.
                    </p>
                    <p className="bh-step mx-auto mt-4 max-w-md text-[17px] leading-relaxed font-light text-foreground/70" style={{ '--from': 0.62 }}>
                        I build software for now. This is where I look when I think about later.
                    </p>
                    <p className="bh-step mt-8 text-[12px] text-foreground/35" style={{ '--from': 0.7 }}>
                        Image: EHT Collaboration, 2022
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SpaceBlackHole;
