import React, { useEffect, useRef } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Code, Monitor, Zap, Database, Terminal, Github, User, Briefcase, Code2, GitCommit } from 'lucide-react';
import { personalInfo, experience } from '../data/mock';

const About = () => {
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
    }, []);
    const features = [
        {
            icon: <Code className="h-5 w-5" />,
            title: "Clean Code",
            description: "Writing maintainable, scalable code following industry best practices."
        },
        {
            icon: <Monitor className="h-5 w-5" />,
            title: "UI/UX Focus",
            description: "Creating intuitive interfaces with seamless user experiences."
        },
        {
            icon: <Zap className="h-5 w-5" />,
            title: "Performance",
            description: "Optimizing applications for speed and accessibility."
        },
        {
            icon: <Database className="h-5 w-5" />,
            title: "System Design",
            description: "Architecting robust, scalable solutions."
        }
    ];

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
                    transform: translateY(30px);
                    transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                                transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .fade-in-element.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .fade-in-element:nth-child(1) { transition-delay: 0.1s; }
                .fade-in-element:nth-child(2) { transition-delay: 0.2s; }
                .fade-in-element:nth-child(3) { transition-delay: 0.3s; }
                .fade-in-element:nth-child(4) { transition-delay: 0.4s; }
            `}</style>

            <section id="about" className="py-20 tech-section" ref={sectionRef}>
                <div className="container-xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4 fade-in-element">
                              <span className="text-primary font-mono text-lg flex items-center justify-center">
                                  <Terminal className="mr-2 h-4 w-4" />
                                  {'>'} cat ~/about.md
                              </span>
                            </div>
                            <div className="relative fade-in-element">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight mb-6">
                                    About{' '}
                                    <span className="text-primary tech-text-glow inline-block">
                                      Developer
                                  </span>
                                </h2>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 md:w-36
                                            h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-16">

                        {/* Skills Section */}
                        <div className="text-left fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Code2 className="h-5 w-5 text-primary" />
                                <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    Technical Skills
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                                <span className="text-primary">{'// '}</span>
                                Technologies and frameworks I work with daily
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {personalInfo.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-2
                                               rounded border border-primary/20 hover:bg-primary/20
                                               transition-colors cursor-default"
                                    >
                                      {skill}
                                  </span>
                                ))}
                            </div>
                        </div>

                        {/* What I Do Section */}
                        <div className="text-left fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="h-5 w-5 text-primary" />
                                <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    What I Do
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
                                <span className="text-primary">{'// '}</span>
                                Core areas of expertise and focus
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex gap-4 p-6 rounded-lg border border-primary/10
                                                             hover:border-primary/30 hover:bg-primary/5
                                                             transition-all duration-300">
                                        <div className="text-primary mt-1">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-mono font-semibold text-lg mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-muted-foreground text-sm font-mono leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Work Experience Section */}
                        <div className="text-left fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="h-5 w-5 text-primary" />
                                <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    Work Experience
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-8">
                                <span className="text-primary">{'// '}</span>
                                Professional journey and key contributions
                            </p>

                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <div key={exp.id} className="relative pl-8 border-l-2 border-primary/20">
                                        <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full
                                                    border-4 border-background"></div>

                                        <div className="pb-8">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                                <div>
                                                    <h4 className="font-mono font-bold text-xl mb-1">
                                                        {exp.position}
                                                    </h4>
                                                    <div className="text-primary font-medium font-mono">
                                                        {exp.company}
                                                    </div>
                                                </div>
                                                <span className="text-xs font-mono text-primary/80 bg-primary/10
                                                             px-3 py-1 rounded border border-primary/20
                                                             w-fit mt-2 sm:mt-0">
                                                  {exp.period}
                                              </span>
                                            </div>

                                            <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                                <span className="text-primary">{'// '}</span>
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <div className="text-center mt-16">
                        <Button
                            variant="outline"
                            size="lg"
                            className="transition-all rounded-lg font-mono border-primary/50 hover:border-primary"
                        >
                            <Github className="mr-2 h-4 w-4" />
                            git clone --about-me
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;