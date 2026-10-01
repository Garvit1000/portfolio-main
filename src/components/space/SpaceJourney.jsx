import React, { useEffect, useRef, useState } from 'react';
import { experience } from '../../data/mock';
import launch from '../../assets/space/launch.webp';
import horizon from '../../assets/space/horizon.webp';
import cityLights from '../../assets/space/city-lights.webp';
import { setImmersed } from '../../lib/immersion';

const byCompany = (name) => experience.find(e => e.company.startsWith(name));

/* The career, told as a flight: one photograph per chapter. */
const CHAPTERS = [
    {
        image: launch,
        position: '50% 70%',
        title: 'Liftoff',
        job: byCompany('Dtodstint'),
        when: 'Dec 2024',
        text: 'My first real job. I built the company website, an e-commerce cart, a services page and the admin panel the team used to manage clients. It is where I learned the gap between code that works and code that holds up once real people start clicking.',
    },
    {
        image: horizon,
        position: '50% 50%',
        title: 'Building from zero',
        job: byCompany('Founder Flow'),
        when: 'Jun 2025',
        text: 'No codebase, no servers, no team yet. I turned Figma files into a live product: onboarding, landing page, database, auth, and an admin panel to watch the first signups arrive. Then I led the first developers through to the MVP.',
    },
    {
        image: cityLights,
        position: '50% 50%',
        title: 'Lights on',
        job: byCompany('Advran'),
        when: 'Jan 2026',
        text: 'Today I ship production features end to end at Advran and help shape the architecture behind them. Every light down there is someone using something. The job is making sure it works for all of them.',
    },
];

const N = CHAPTERS.length;
const ZOOM = 0.2; // share of the scroll spent opening the window
const pad = (n) => String(n).padStart(2, '0');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* A pinned stage. Scrolling first pulls the framed photo out to fill the
   screen, as if you're flying into it; then each chapter takes over the
   whole view, its photo slowly drifting closer while you read. */
const SpaceJourney = () => {
    const ref = useRef(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const el = ref.current;
        let raf = 0;
        let last = -1;

        const update = () => {
            raf = 0;
            const rect = el.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            const p = clamp(-rect.top / total);
            const z = clamp(p / ZOOM);
            const q = clamp((p - ZOOM) / (1 - ZOOM)) * N;
            const now = Math.min(N - 1, Math.floor(q));

            el.style.setProperty('--z', z.toFixed(4));
            for (let i = 0; i < N; i++) {
                el.style.setProperty(`--c${i}`, clamp(q - i).toFixed(4));
            }
            setImmersed('journey', z > 0.9 && rect.bottom > window.innerHeight * 0.5);
            if (now !== last) { last = now; setActive(now); }
        };

        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(raf);
            setImmersed('journey', false);
        };
    }, []);

    return (
        <section id="about" ref={ref} className="journey" style={{ height: `${100 + 80 + N * 110}svh` }}>
            <div className="journey-stage">
                <div className="journey-intro container-xl">
                    <h2 className="space-h2">Every launch starts on the ground.</h2>
                    <p className="mt-4 text-muted-foreground font-light">
                        Two years, three companies, one direction. Here is the flight so far.
                    </p>
                </div>

                <div className="journey-window">
                    {CHAPTERS.map((c, i) => (
                        <img
                            key={c.title}
                            src={c.image}
                            alt=""
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className={`journey-photo ${i === active ? 'is-active' : ''}`}
                            style={{ objectPosition: c.position, '--k': `var(--c${i})` }}
                        />
                    ))}
                    <div className="journey-veil" aria-hidden="true" />
                </div>

                <div className="journey-copy container-xl">
                    {CHAPTERS.map((c, i) => (
                        <article key={c.title} className={`journey-chapter ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
                            <p className="journey-line text-[13px] text-foreground/55 tabular-nums">
                                <span>{pad(i + 1)}  ·  {c.when}</span>
                            </p>
                            <h3 className="journey-line mt-3">
                                <span className="journey-title">{c.title}</span>
                            </h3>
                            <p className="journey-fade mt-5 max-w-lg text-[17px] leading-relaxed font-light text-foreground/75">{c.text}</p>
                            {c.job && (
                                <div className="journey-fade mt-7 flex items-center gap-3" style={{ transitionDelay: '160ms' }}>
                                    <img src={c.job.logo} alt="" className="h-8 w-8 rounded-[7px] object-cover bg-white/90" />
                                    <div className="leading-tight">
                                        <p className="text-[14px] text-foreground/90">{c.job.company}</p>
                                        <p className="text-[13px] text-foreground/50">{c.job.position}  ·  {c.job.period}</p>
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default SpaceJourney;
