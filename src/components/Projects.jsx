import React, { useState } from 'react';
import { Button } from './ui/button';
import { Github, Star, Terminal, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
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
                <div className="text-center mb-16">
                    <div className="mb-4">
                        <span className="text-primary font-mono text-lg">{'>'} ls -la ~/projects</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif ">
                        Featured{' '}
                        <span className="text-primary tech-text-glow inline-block">
              Projects
            </span>
                    </h2>
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

                {/* Minimalistic Projects List - Left aligned within centered container */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12">
                        {filteredProjects.map((project) => {
                            const expanded = isExpanded(project.id);
                            const needsTruncation = project.description.length > 120;

                            return (
                                <div key={project.id} className="group text-left">
                                    {/* Project Title with underline and italic */}
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-mono font-bold italic underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                                            {project.title}
                                            {project.featured && (
                                                <Star className="inline ml-2 h-5 w-5 text-primary fill-primary" />
                                            )}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            {/* Live Link */}
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
                                            {/* GitHub Link */}
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

                                    {/* Project Description with Show More/Less */}
                                    <div className="mb-4">
                                        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                            <span className="text-primary">{'// '}</span>
                                            {expanded ? project.description : truncateText(project.description)}
                                        </p>

                                        {needsTruncation && (
                                            <button
                                                onClick={() => toggleExpanded(project.id)}
                                                className="mt-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
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
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View More Button */}
                <div className="text-center mt-16">
                    <Link to="https://github.com/Garvit1000">
                    <Button variant="outline" size="lg" className="rounded-lg border-primary/50 hover:border-primary font-mono hover:tech-glow">
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