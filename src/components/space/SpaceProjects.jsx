import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { projects } from '../../data/mock';
import saturn from '../../assets/space/saturn.webp';

// Short, plain-spoken versions of each project for the space side, with the
// one number that says the most about it (only where there is a real one).
const NOTES = {
    8: { line: 'An assistant that lives in your Linux terminal. Five AI providers with automatic failover, long-term memory, and commands it checks before it runs them.', stat: '198', unit: 'automated tests' },
    1: { line: 'Animation components for React, installed with one shadcn command. Accessible, reduced-motion aware, ready for Next.js and Vite.', stat: '50+', unit: 'components' },
    2: { line: 'Lucide icons that move: entrances, hovers and loops, as plain React components.', stat: '3,500+', unit: 'icons' },
    3: { line: 'Resumes rewritten to get past applicant tracking systems, with LinkedIn headline tuning and PDF export.', stat: '80%+', unit: 'ATS score target' },
    4: { line: 'A job platform with skill-based matching, recruiter tools, PayPal payouts and a community forum.' },
    5: { line: 'One command scaffolds a full-stack React app with auth and Postgres already wired up.', stat: '1K+', unit: 'downloads on npm' },
};

const pad = (n) => String(n).padStart(2, '0');
const nameOf = (p) => p.title.split(' - ')[0];

const Links = ({ project }) => {
    const hasLive = project.liveUrl && project.liveUrl !== project.githubUrl;
    return (
        <div className="flex items-center gap-5">
            {hasLive && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="space-link">
                    Visit <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
                </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="space-link">
                Source <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
            </a>
        </div>
    );
};

const Detail = ({ project, className = '', hidden }) => {
    const note = NOTES[project.id] || { line: project.description };
    return (
        <div className={className} aria-hidden={hidden}>
            {note.stat && (
                <p className="mission-stat">
                    <span className="tabular-nums">{note.stat}</span>
                    <span className="mission-unit">{note.unit}</span>
                </p>
            )}
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed font-light text-foreground/75">{note.line}</p>
            <p className="mt-5 text-[13px] text-foreground/40">{project.technologies.join('  ·  ')}</p>
            <div className="mt-6"><Links project={project} /></div>
        </div>
    );
};

/* Side missions: just the names, very large, on black. The one crossing the
   middle of the screen lights up; its story sits beside it. */
const SpaceProjects = () => {
    const [active, setActive] = useState(0);
    const refs = useRef([]);
    const sectionRef = useRef(null);

    // Scrolling through the list slowly brings Saturn closer
    useEffect(() => {
        const el = sectionRef.current;
        let raf = 0;
        const update = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
            el.style.setProperty('--sp', p.toFixed(4));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) setActive(Number(e.target.dataset.index));
            }),
            { rootMargin: '-48% 0px -48% 0px' }
        );
        refs.current.forEach(el => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="missions-section">
            <div className="missions-sky" aria-hidden="true">
                <div className="missions-sky-view">
                    <img src={saturn} alt="" loading="lazy" />
                </div>
            </div>

            <div className="container-xl relative py-28 sm:py-44">
            <div data-warp>
            <p className="text-[13px] text-foreground/45">Between the day jobs</p>
            <h2 className="space-h2 mt-3">Side missions</h2>
            <p className="mt-4 max-w-md text-muted-foreground font-light">
                Things I built because I wanted them to exist. All of them in the open.
            </p>
            </div>

            <div className="mt-20 sm:mt-28 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
                <ol>
                    {projects.map((p, i) => (
                        <li
                            key={p.id}
                            ref={el => (refs.current[i] = el)}
                            data-index={i}
                            className={`mission ${i === active ? 'is-active' : ''}`}
                            data-warp
                            onMouseEnter={() => setActive(i)}
                        >
                            <span className="mission-index tabular-nums">{pad(i + 1)}</span>
                            <h3 className="mission-name">{nameOf(p)}</h3>
                            <Detail project={p} className="md:hidden mt-6 mb-6" />
                        </li>
                    ))}
                </ol>

                {/* Desktop: the active mission's story, held beside the list */}
                <div className="hidden md:block">
                    <div className="mission-detail">
                        {projects.map((p, i) => (
                            <Detail
                                key={p.id}
                                project={p}
                                hidden={i !== active}
                                className={`mission-panel ${i === active ? 'is-active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <a href="https://github.com/Garvit1000" target="_blank" rel="noopener noreferrer" className="space-link mt-20">
                Everything else on GitHub <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-3.5 w-3.5" />
            </a>
            </div>
        </section>
    );
};

export default SpaceProjects;
