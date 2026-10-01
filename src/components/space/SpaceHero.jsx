import React, { useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { personalInfo } from '../../data/mock';
import earthset from '../../assets/space/earthset.webp';

/* Space-world hero, built around one real photograph: Earthset, taken by the
   Artemis II crew from Orion during their lunar flyby (NASA, 6 April 2026).
   No painted stars: at this exposure the real sky is pure black. */
const SpaceHero = () => {
    const sectionRef = useRef(null);

    // The Moon sinks a little slower than the page as you scroll
    useEffect(() => {
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const el = sectionRef.current;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => el?.style.setProperty('--sy', Math.min(window.scrollY, 900).toFixed(1)));
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
    }, []);

    return (
        <section id="hero" ref={sectionRef} className="space-hero relative isolate overflow-hidden">
            <img src={earthset} alt="Earth setting behind the Moon's horizon, photographed by the Artemis II crew" className="space-earthset" fetchPriority="high" />

            <div className="space-hero-copy container-xl flex flex-col items-center text-center">
                <h1 className="space-title space-in" style={{ '--d': '250ms' }}>
                    <span className="metal-text">I build apps</span>
                    <br />
                    <span className="metal-text">that feel good</span>
                </h1>

                <p className="space-lede space-in" style={{ '--d': '420ms' }}>
                    {personalInfo.name}, full stack developer at Advran.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3 space-in" style={{ '--d': '560ms' }}>
                    <button
                        type="button"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="space-btn space-btn-primary"
                    >
                        See my work
                        <HugeiconsIcon icon={ArrowRight01Icon} className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="space-btn"
                    >
                        Get in touch
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SpaceHero;
