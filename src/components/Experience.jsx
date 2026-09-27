import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { experience } from '../data/mock';

// App-icon colours for company monograms, assigned in order
const ICON_COLORS = [
    'linear-gradient(180deg, #ffa24c 0%, #ee5a1c 100%)',
    'linear-gradient(180deg, #7aa2ff 0%, #4a63e7 100%)',
    'linear-gradient(180deg, #5fd58a 0%, #22a35a 100%)',
    'linear-gradient(180deg, #c59bff 0%, #8a55e6 100%)',
];

const monogram = (name) =>
    name.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('') || name[0];

const markdownComponents = {
    ul: ({ children }) => <ul className="space-y-2">{children}</ul>,
    li: ({ children }) => (
        <li className="relative pl-5 text-[15px] leading-6 text-muted-foreground">
            <span className="absolute left-1 top-[9px] h-1.5 w-1.5 rounded-full bg-[#ff7700]/70" />
            {children}
        </li>
    ),
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    p: ({ children }) => <p className="text-[15px] leading-6 text-muted-foreground">{children}</p>,
};

const Role = ({ job, index, defaultOpen }) => {
    const [open, setOpen] = useState(defaultOpen);
    const current = job.period.toLowerCase().includes('present');
    const panelId = `role-${job.id}`;

    return (
        <li className="relative pl-14 sm:pl-16">
            {/* Company icon sits on the timeline */}
            <span
                className="app-icon absolute left-0 top-4 h-11 w-11 sm:h-12 sm:w-12 overflow-hidden font-display font-bold text-white text-[17px] tracking-[-0.04em]"
                style={{ background: job.logo ? '#fff' : ICON_COLORS[index % ICON_COLORS.length] }}
                aria-hidden="true"
            >
                {job.logo
                    ? <img src={job.logo} alt="" className="h-full w-full object-cover" />
                    : monogram(job.company)}
            </span>

            <div className="surface">
                <button
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="w-full text-left flex items-start gap-3 px-5 py-4 sm:px-6 sm:py-5 rounded-[22px]"
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <h4 className="text-[22px] sm:text-2xl leading-tight">{job.company}</h4>
                            {current && (
                                <span className="pill text-[12px] px-2 py-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-subtle" />
                                    Current
                                </span>
                            )}
                        </div>
                        <p className="mt-1 text-[15px] font-semibold text-foreground/75">{job.position}</p>
                    </div>
                    <span className="hidden sm:inline-flex pill text-[13px] mt-0.5 text-muted-foreground">{job.period}</span>
                    <span
                        className={`grid place-items-center h-8 w-8 flex-shrink-0 rounded-[10px] text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                        style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}
                    >
                        <HugeiconsIcon icon={ArrowDown01Icon} className="h-5 w-5" />
                    </span>
                </button>

                <div
                    id={panelId}
                    className="grid transition-[grid-template-rows] duration-300"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr', transitionTimingFunction: 'var(--ease-out-strong)' }}
                >
                    <div className="overflow-hidden">
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                            <p className="sm:hidden text-sm text-muted-foreground mb-3">{job.period}</p>
                            <div className="pt-4 border-t border-foreground/[0.06]">
                                <ReactMarkdown components={markdownComponents}>{job.description}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

const Experience = () => (
    <ol className="relative space-y-4">
        {/* Dotted timeline through the company icons */}
        <span
            className="absolute left-[21px] sm:left-[23px] top-8 bottom-8 w-px"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(60,58,56,0.3) 1.5px, transparent 1.5px)', backgroundSize: '1px 7px' }}
            aria-hidden="true"
        />
        {experience.map((job, i) => (
            <Role key={job.id} job={job} index={i} defaultOpen={i === 0} />
        ))}
    </ol>
);

export default Experience;
