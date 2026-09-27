import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { GithubIcon, LinkSquare02Icon, ArrowRight01Icon, Image01Icon } from '@hugeicons/core-free-icons';
import { projects } from '../data/mock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Scribble from './Scribble';
import TechPill from './TechPill';

const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'featured', label: 'Featured' },
];

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);
    const needsTruncation = project.description.length > 140;
    const description = expanded || !needsTruncation
        ? project.description
        : project.description.slice(0, 140).trimEnd() + '…';

    return (
        <article className="stagger-item surface lift flex flex-col p-2.5 pb-6">
            <div className="relative overflow-hidden rounded-[14px] aspect-[16/10] bg-white">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full grid place-items-center text-muted-foreground">
                        <HugeiconsIcon icon={Image01Icon} className="h-10 w-10" />
                    </div>
                )}
                {project.featured && (
                    <span className="pill absolute top-3 left-3 bg-white/85 backdrop-blur text-[13px]">Featured</span>
                )}
            </div>

            <div className="flex flex-col flex-grow px-3.5 pt-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl leading-[1.1]">{project.title}</h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {project.liveUrl && project.liveUrl !== project.githubUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-soft btn-icon h-9 w-9 rounded-[10px]"
                                aria-label={`Open ${project.title}`}
                                title="Live site"
                            >
                                <HugeiconsIcon icon={LinkSquare02Icon} className="h-4 w-4" />
                            </a>
                        )}
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-soft btn-icon h-9 w-9 rounded-[10px]"
                            aria-label={`${project.title} source code`}
                            title="Source code"
                        >
                            <HugeiconsIcon icon={GithubIcon} className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <p className="mt-2.5 text-muted-foreground leading-6 flex-grow">
                    {description}
                    {needsTruncation && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="ml-1.5 font-semibold text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground"
                        >
                            {expanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                        <TechPill key={tech} name={tech} className="text-[13px] px-2.5 py-1.5" />
                    ))}
                </div>
            </div>
        </article>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const gridRef = useScrollReveal({ staggerDelay: 80 });

    const filteredProjects = filter === 'featured'
        ? projects.filter(project => project.featured)
        : projects;

    // Reveal cards that mount after the initial scroll-reveal already fired
    useEffect(() => {
        gridRef.current?.querySelectorAll('.stagger-item:not(.revealed)').forEach(item => {
            item.style.transitionDelay = '0ms';
            item.classList.add('revealed');
        });
    }, [filter]);

    return (
        <section id="projects" className="container-xl py-20 sm:py-28">
            <div className="text-center mb-10">
                <h2 className="section-title">
                    Things I've <Scribble>shipped</Scribble>
                </h2>
                <p className="section-lede mt-4 max-w-xl mx-auto">
                    Libraries, tools and products, built end to end and used by real people.
                </p>

                <div className="mt-7 inline-flex p-1 rounded-[14px] bg-foreground/[0.05] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                    {FILTERS.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            aria-pressed={filter === f.id}
                            className={`px-4 py-2 rounded-[10px] text-[15px] font-semibold transition-[background-color,color,box-shadow] duration-200 ${filter === f.id
                                ? 'bg-white text-foreground shadow-[0_2px_1px_rgba(0,0,0,0.05),inset_0_-2px_2px_rgba(0,0,0,0.06)]'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5" ref={gridRef}>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            <div className="text-center mt-12">
                <a
                    href="https://github.com/Garvit1000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink btn-ink-lg"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
                    </svg>
                    More on GitHub
                    <HugeiconsIcon icon={ArrowRight01Icon} className="h-5 w-5" />
                </a>
            </div>
        </section>
    );
};

export default Projects;
