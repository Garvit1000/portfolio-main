import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Github, Star, Terminal, ExternalLink, ChevronDown, ChevronUp, Code2, GitCommit, Image as ImageIcon } from 'lucide-react';
import { projects } from '../data/mock';
import { Link } from 'react-router-dom';

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

        const elements = sectionRef.current?.querySelectorAll('.blur-fade-in-element');
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
            `}</style>

            <section id="projects" className="py-20 tech-section" ref={sectionRef}>
                <div className="container-xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4 blur-fade-in-element">
                                <span className="text-primary font-mono text-lg flex items-center justify-center">
                                    <Terminal className="mr-2 h-4 w-4" />
                                    {'>'} ls -la ~/projects
                                </span>
                            </div>
                            <div className="relative blur-fade-in-element">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-6">
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
                    <div className="flex flex-wrap justify-center gap-4 mb-12 blur-fade-in-element">
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

                    {/* Projects Grid - 2 Columns */}
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredProjects.map((project) => {
                            const expanded = isExpanded(project.id);
                            const needsTruncation = project.description.length > 120;

                            return (
                                <div
                                    key={project.id}
                                    className="group blur-fade-in-element bg-card/50 backdrop-blur-sm rounded-xl border border-border/50
                                             hover:border-primary/30 transition-all duration-500 overflow-hidden
                                             hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col h-full"
                                >
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5
                                                  h-64 border-b border-border/50">
                                        {project.image ? (
                                            <>
                                                <img
                                                    src={project.image}
                                                    alt={`${project.title} preview`}
                                                    className="w-full h-full object-cover group-hover:scale-110
                                                             transition-transform duration-700 ease-out"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent
                                                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            </>
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

                                        {/* Featured Badge */}
                                        {project.featured && (
                                            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground
                                                          px-3 py-1.5 rounded-full text-xs font-mono font-semibold
                                                          flex items-center gap-1.5 shadow-lg">
                                                <Star className="h-3.5 w-3.5 fill-current" />
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Code2 className="h-5 w-5 text-primary flex-shrink-0" />
                                                    <h3 className="text-xl sm:text-2xl font-mono font-bold text-foreground
                                                                 group-hover:text-primary transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Action Links */}
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground
                                                                 transition-all duration-300 hover:scale-110"
                                                        title="View Live Demo"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground
                                                             transition-all duration-300 hover:scale-110"
                                                    title="View Source Code"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Project Description */}
                                        <div className="mb-5 flex-grow">
                                            <p className="text-muted-foreground text-base leading-relaxed">
                                                <span className="text-primary font-mono">{'// '}</span>
                                                {expanded ? project.description : truncateText(project.description)}
                                            </p>

                                            {needsTruncation && (
                                                <button
                                                    onClick={() => toggleExpanded(project.id)}
                                                    className="mt-2 text-xs font-mono text-primary hover:text-primary/80
                                                             transition-colors flex items-center gap-1.5 group/btn"
                                                >
                                                    {expanded ? (
                                                        <>
                                                            <ChevronUp className="h-3.5 w-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                            show less
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="h-3.5 w-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                                                            show more
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {/* Technologies */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <GitCommit className="h-3.5 w-3.5 text-primary" />
                                                <span className="text-xs font-mono text-muted-foreground font-semibold">
                                                    Tech Stack
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
                                                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-background/50 border border-border/60
                                                                     rounded-lg hover:border-primary/50 hover:bg-primary/5 hover:scale-105 
                                                                     transition-all duration-200 cursor-default shadow-sm"
                                                        >
                                                            <img
                                                                src={`https://cdn.simpleicons.org/${techInfo.logo}/${techInfo.color}`}
                                                                alt={tech}
                                                                className="w-3.5 h-3.5"
                                                            />
                                                            <span className="text-xs font-medium text-foreground">{tech}</span>
                                                        </div>
                                                    ) : (
                                                        <span
                                                            key={index}
                                                            className="text-xs font-mono text-primary/80 bg-primary/10 px-2.5 py-1.5
                                                                     rounded-lg border border-primary/20 hover:bg-primary/20 hover:scale-105
                                                                     transition-all duration-200 cursor-default"
                                                        >
                                                            {tech}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-16 blur-fade-in-element">
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