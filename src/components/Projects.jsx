import React, { useState } from 'react';
import { Button } from './ui/button';
import { Github, Star, Terminal, ExternalLink, ChevronDown, ChevronUp, Code2, GitCommit, Image as ImageIcon } from 'lucide-react';
import { projects } from '../data/mock';
import {Link} from 'react-router-dom';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [expandedProjects, setExpandedProjects] = useState(new Set());

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

            <section id="projects" className="py-20 tech-section">
                <div className="container-xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4">
                                <span className="text-primary font-mono text-lg flex items-center justify-center">
                                    <Terminal className="mr-2 h-4 w-4" />
                                    {'>'} ls -la ~/projects
                                </span>
                            </div>
                            <div className="relative">
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
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
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
                                <div key={project.id} className="group">

                                    {/* Project Image */}
                                    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5
                                                  h-48 mb-6 border border-primary/10 hover:border-primary/30
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
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-2
                                                         rounded border border-primary/20 hover:bg-primary/20
                                                         transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View More Button */}
                    <div className="text-center mt-16">
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