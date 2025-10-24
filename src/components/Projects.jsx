import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Github, Star, Terminal, ExternalLink, ChevronDown, ChevronUp, Code2, GitCommit, Image as ImageIcon } from 'lucide-react';
import { projects } from '../data/mock';
import {Link} from 'react-router-dom';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [expandedProjects, setExpandedProjects] = useState(new Set());
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = sectionRef.current?.querySelectorAll('.fade-in-element');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [filter]);

    const filteredProjects = filter === 'all'
        ? projects
        : filter === 'featured'
            ? projects.filter(project => project.featured)
            : projects;

    const toggleExpanded = (projectId) => {
        const newExpanded = new Set(expandedProjects);
        if (newExpanded.has(projectId)) {
            newExpanded.delete(projectId);
        } else {
            newExpanded.add(projectId);
        }
        setExpandedProjects(newExpanded);
    };

    const isExpanded = (projectId) => expandedProjects.has(projectId);

    const truncateText = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

                .font-serif {
                    font-family: 'Playfair Display', serif;
                }

                .elegant-shadow {
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
                }

                .fade-in-element {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.8s ease-out,
                                transform 0.8s ease-out;
                }

                .fade-in-element.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .fade-in-element:nth-child(1) { transition-delay: 0.1s; }
                .fade-in-element:nth-child(2) { transition-delay: 0.15s; }
                .fade-in-element:nth-child(3) { transition-delay: 0.2s; }
                .fade-in-element:nth-child(4) { transition-delay: 0.25s; }
                .fade-in-element:nth-child(5) { transition-delay: 0.3s; }
            `}</style>

            <section id="projects" className="py-20 tech-section" ref={sectionRef}>
                <div className="container-xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4 fade-in-element">
                                <span className="text-primary font-mono text-lg flex items-center justify-center">
                                    <Terminal className="mr-2 h-4 w-4" />
                                    {'>'} ls -la ~/projects
                                </span>
                            </div>
                            <div className="relative fade-in-element">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight mb-6">
                                    Featured{' '}
                                    <span className="text-primary tech-text-glow inline-block">
                                        Projects
                                    </span>
                                </h2>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 md:w-36
                                              h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-element">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="transition-all rounded-lg font-mono border-primary/50"
                        >
                            <Terminal className="mr-2 h-4 w-4" />
                            --all
                        </Button>
                        <Button
                            variant={filter === 'featured' ? 'default' : 'outline'}
                            onClick={() => setFilter('featured')}
                            className="transition-all rounded-lg font-mono border-primary/50"
                        >
                            <Star className="mr-2 h-4 w-4" />
                            --featured
                        </Button>
                    </div>

                    {/* Projects List - Clean and Minimal */}
                    <div className="max-w-4xl mx-auto space-y-12">
                        {filteredProjects.map((project) => {
                            const expanded = isExpanded(project.id);
                            const needsTruncation = project.description.length > 120;

                            return (
                                <div key={project.id} className="group fade-in-element">

                                    {/* Project Image */}
                                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5
                                                  h-64 mb-6 border border-primary/10 hover:border-primary/30
                                                  transition-colors duration-300">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={`${project.title} preview`}
                                                className="w-full h-full object-cover group-hover:scale-105
                                                         transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="text-center">
                                                    <ImageIcon className="mx-auto mb-2 text-primary/40 h-12 w-12" />
                                                    <p className="text-sm font-mono text-primary/60">
                                                        project preview
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Project Header */}
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Code2 className="h-5 w-5 text-primary" />
                                                <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2
                                                             underline-offset-4 hover:decoration-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.featured && (
                                                    <Star className="h-5 w-5 text-primary fill-primary" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex items-center gap-3">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                    title="View Live Demo"
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </a>
                                            )}
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                                title="View Source Code"
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Project Description */}
                                    <div className="mb-6">
                                        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                            <span className="text-primary">{'// '}</span>
                                            {expanded ? project.description : truncateText(project.description)}
                                        </p>

                                        {needsTruncation && (
                                            <button
                                                onClick={() => toggleExpanded(project.id)}
                                                className="mt-2 text-xs font-mono text-primary hover:text-primary/80
                                                         transition-colors flex items-center gap-1"
                                            >
                                                {expanded ? (
                                                    <>
                                                        <ChevronUp className="h-3 w-3" />
                                                        show less
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="h-3 w-3" />
                                                        show more
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <GitCommit className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-mono text-muted-foreground">
                                            Tech Stack:
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => {
                                            // Map tech names to logo identifiers
                                            const techMap = {
                                                'React': { logo: 'react', color: '61DAFB' },
                                                'JavaScript': { logo: 'javascript', color: 'F7DF1E' },
                                                'TypeScript': { logo: 'typescript', color: '3178C6' },
                                                'Typescript': { logo: 'typescript', color: '3178C6' },
                                                'Tailwind CSS': { logo: 'tailwindcss', color: '06B6D4' },
                                                'Shadcn': { logo: 'react', color: '000000' },
                                                'shadcn': { logo: 'react', color: '000000' },
                                                'shadcn/ui': { logo: 'react', color: '000000000' },
                                                'Node.js': { logo: 'nodedotjs', color: '339933' },
                                                'Express': { logo: 'express', color: '000000' },
                                                'MongoDB': { logo: 'mongodb', color: '47A248' },
                                                'PostgrSql': { logo: 'postgresql', color: '4169E1' },
                                                'PostgreSQL': { logo: 'postgresql', color: '4169E1' },
                                                'Firebase': { logo: 'firebase', color: 'FFCA28' },
                                                'CSS': { logo: 'css3', color: '1572B6' },
                                                'CSS3': { logo: 'css3', color: '1572B6' },
                                                'HTML5': { logo: 'html5', color: 'E34F26' },
                                                'HTML': { logo: 'html5', color: 'E34F26' },
                                                'CLI': { logo: 'gnubash', color: '4EAA25' },
                                                'REST API': { logo: 'fastapi', color: '009688' },
                                                'Expo': { logo: 'expo', color: '000020' },
                                                'ReactNative': { logo: 'react', color: '61DAFB' }
                                            };

                                            const techInfo = techMap[tech];

                                            return techInfo ? (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border 
                                                             rounded-lg hover:border-primary/50 hover:scale-105 transition-all duration-200
                                                             cursor-default shadow-sm"
                                                >
                                                    <img
                                                        src={`https://cdn.simpleicons.org/${techInfo.logo}/${techInfo.color}`}
                                                        alt={tech}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-xs font-medium text-foreground">{tech}</span>
                                                </div>
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1.5
                                                             rounded border border-primary/20 hover:bg-primary/20
                                                             transition-colors cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-16 fade-in-element">
                        <Link to="https://github.com/Garvit1000">
                            <Button
                                variant="outline"
                                size="lg"
                                className="transition-all rounded-lg font-mono border-primary/50 hover:border-primary"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                git clone --all-repos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Projects;