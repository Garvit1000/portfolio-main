import React from 'react';
import Experience from './Experience';
import { useScrollReveal } from '../hooks/useScrollReveal';
import GitHubCard from './GitHubCard';
import Scribble from './Scribble';
import TechPill from './TechPill';

/* ---------- Card illustrations ---------- */

const CodeVisual = () => {
    const k = 'text-[#ff7ab2]', f = 'text-[#6bdfff]', t = 'text-[#ffa14f]', a = 'text-[#d9c97c]', s = 'text-[#ff8170]', p = 'text-[#e8e6e3]';
    const lines = [
        <><span className={k}>export function</span> <span className={f}>Button</span><span className={p}>{'({ children }) {'}</span></>,
        <><span className={k}>{'  return'}</span> <span className={p}>(</span></>,
        <><span className={p}>{'    <'}</span><span className={t}>button</span> <span className={a}>className</span><span className={p}>=</span><span className={s}>"btn"</span><span className={p}>{'>'}</span></>,
        <span className={p}>{'      {children}'}</span>,
        <><span className={p}>{'    </'}</span><span className={t}>button</span><span className={p}>{'>'}</span></>,
        <span className={p}>{'  )'}</span>,
        <span className={p}>{'}'}</span>,
    ];
    return (
        <div className="h-full w-full bg-[linear-gradient(160deg,#d9e6ff_0%,#e9ecff_50%,#f3e9ff_100%)] grid place-items-center p-4">
            <div className="w-full max-w-[340px] rounded-[12px] bg-[#292827] shadow-[0_18px_36px_-14px_rgba(30,30,60,0.45),0_0_0_1px_rgba(0,0,0,0.2)] overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[10px] font-semibold text-white/40">Button.jsx</span>
                </div>
                <pre className="px-3 py-2.5 font-code text-[10px] sm:text-[11px] leading-[1.65] overflow-hidden">
                    {lines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                            <span className="inline-block w-4 mr-2 text-right text-white/20 select-none">{i + 1}</span>
                            {line}
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};

const Toggle = ({ on }) => (
    <span className={`relative inline-flex h-[18px] w-[30px] rounded-full transition-colors ${on ? 'bg-[#34c759]' : 'bg-[#e5e4e2]'}`}>
        <span className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)] ${on ? 'left-[14px]' : 'left-[2px]'}`} />
    </span>
);

const UIVisual = () => (
    <div className="h-full w-full bg-[linear-gradient(160deg,#ffe3cc_0%,#ffeede_50%,#ffe1ea_100%)] grid place-items-center p-4">
        <div className="relative w-full max-w-[230px] rounded-[14px] bg-white p-3.5 shadow-[0_18px_36px_-14px_rgba(120,60,20,0.35),0_0_0_1px_rgba(0,0,0,0.04)]">
            <div className="text-[13px] font-bold">Preferences</div>
            <div className="mt-3 space-y-2.5 text-[12px] font-semibold text-foreground/80">
                <div className="flex items-center justify-between">Dark mode <Toggle on={false} /></div>
                <div className="flex items-center justify-between">Sounds <Toggle on /></div>
                <div className="flex items-center justify-between">Reduce motion <Toggle on={false} /></div>
            </div>
            <div className="mt-3.5 rounded-[9px] bg-[#3c3a38] text-white text-[12px] font-semibold text-center py-1.5 shadow-[0_0_0_1.5px_#3c3a38,0_2px_2px_rgba(0,0,0,0.15)]">
                Save changes
            </div>
            {/* pointer */}
            <svg className="absolute -bottom-3 right-6 h-6 w-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 3l14 8.2-6.3 1.3 3.6 6.9-2.6 1.3-3.6-6.9L5 18z" fill="#111" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </div>
    </div>
);

const Gauge = ({ label }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="#e7f8ee" stroke="#c8f0d7" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#0cce6b" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-code text-[13px] sm:text-[15px] font-medium text-[#0a8045]">100</span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-semibold text-foreground/70 text-center leading-tight">{label}</span>
    </div>
);

const PerfVisual = () => (
    <div className="h-full w-full bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf6_100%)] flex flex-col items-center justify-center gap-4 p-4">
        <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map(label => <Gauge key={label} label={label} />)}
        </div>
        <div className="flex items-center gap-3 text-[10px] font-semibold text-foreground/50">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ff4e42]" />0-49</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#ffa400]" />50-89</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#0cce6b]" />90-100</span>
        </div>
    </div>
);

const Node = ({ x, y, w, label, dot }) => (
    <g>
        <rect x={x} y={y} width={w} height="34" rx="9" fill="#2e2d2b" stroke="rgba(255,255,255,0.1)" />
        <circle cx={x + 15} cy={y + 17} r="3.5" fill={dot} />
        <text x={x + 26} y={y + 21.5} fill="#f2f0ed" fontSize="12.5" fontWeight="600" fontFamily="var(--font-body)">{label}</text>
    </g>
);

const SystemVisual = () => (
    <div className="h-full w-full bg-[#1f1e1d] bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px] grid place-items-center p-3">
        <svg viewBox="0 0 400 190" className="w-full max-w-[420px]" aria-hidden="true">
            <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeDasharray="3 4" className="flow-lines">
                <path d="M112 95 H 152" />
                <path d="M236 95 C 262 95, 262 52, 288 52" />
                <path d="M236 95 H 288" />
                <path d="M236 95 C 262 95, 262 138, 288 138" />
            </g>
            <Node x={22} y={78} w={90} label="Client" dot="#6bdfff" />
            <Node x={152} y={78} w={84} label="API" dot="#ffa14f" />
            <Node x={288} y={35} w={96} label="Postgres" dot="#7aa2ff" />
            <Node x={288} y={78} w={96} label="Queue" dot="#c59bff" />
            <Node x={288} y={121} w={96} label="Cache" dot="#ff6b6b" />
        </svg>
    </div>
);

const features = [
    { visual: CodeVisual, title: <>Write it <Scribble>clean</Scribble></>, description: "Readable, typed, well-structured code that the next person is happy to open." },
    { visual: UIVisual, title: 'Make it feel right', description: "Interfaces that are intuitive and polished, down to the small interactions." },
    { visual: PerfVisual, title: 'Keep it fast', description: "Quick loads, smooth motion, and accessible by default. Scores I actually check." },
    { visual: SystemVisual, title: 'Build it to scale', description: "Clear boundaries between client, API and data, so the product can grow." },
];

const skills = [
    'React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB',
    'PostgreSQL', 'Firebase', 'Vite', 'Git', 'Vercel', 'Postman',
];

const About = () => {
    const featuresRef = useScrollReveal({ staggerDelay: 70 });
    const githubRef = useScrollReveal();
    const skillsRef = useScrollReveal({ staggerDelay: 30 });
    const experienceRef = useScrollReveal();

    return (
        <section id="about" className="container-xl py-20 sm:py-28">
            <div className="text-center mb-12">
                <h2 className="section-title">How I work</h2>
                <p className="section-lede mt-4 max-w-xl mx-auto">
                    The things I focus on, the tools I reach for, and where I've done it.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5" ref={featuresRef}>
                {features.map(({ visual: Visual, title, description }, i) => (
                    <article key={i} className="stagger-item surface p-2.5 pb-6">
                        <div className="aspect-[2/1] rounded-[14px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
                            <Visual />
                        </div>
                        <div className="px-3.5 pt-5">
                            <h3 className="text-2xl leading-[1.1]">{title}</h3>
                            <p className="mt-2 text-muted-foreground leading-6">{description}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="scroll-reveal mt-4 sm:mt-5" ref={githubRef}>
                <GitHubCard />
            </div>

            <div className="mt-20 text-center" ref={skillsRef}>
                <h3 className="text-3xl">Tools I use daily</h3>
                <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                    {skills.map((tech) => (
                        <TechPill key={tech} name={tech} className="stagger-item py-2 px-3 text-[15px]" />
                    ))}
                </div>
            </div>

            <div className="scroll-reveal mt-20 max-w-3xl mx-auto" ref={experienceRef}>
                <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-4xl">Where I've worked</h3>
                    <p className="section-lede mt-3">Teams I've shipped with, most recent first.</p>
                </div>
                <Experience />
            </div>
        </section>
    );
};

export default About;
