import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Terminal, Github, Briefcase, Code2, Sparkles, Rocket, Layers, Gauge } from 'lucide-react';
import { experience } from '../data/mock';

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

        const elements = sectionRef.current?.querySelectorAll('.blur-fade-in-element');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
    const features = [
        {
            icon: <Code2 className="h-5 w-5" />,
            title: "Clean Code",
            description: "Writing maintainable, scalable code following industry best practices."
        },
        {
            icon: <Sparkles className="h-5 w-5" />,
            title: "UI/UX Focus",
            description: "Creating intuitive interfaces with seamless user experiences."
        },
        {
            icon: <Gauge className="h-5 w-5" />,
            title: "Performance",
            description: "Optimizing applications for speed and accessibility."
        },
        {
            icon: <Layers className="h-5 w-5" />,
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
            `}</style>

            <section id="about" className="py-20 tech-section" ref={sectionRef}>
                <div className="container-xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4 blur-fade-in-element">
                                <span className="text-primary font-mono text-lg flex items-center justify-center">
                                    <Terminal className="mr-2 h-4 w-4" />
                                    {'>'} cat ~/about.md
                                </span>
                            </div>
                            <div className="relative blur-fade-in-element">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-6">
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
                        <div className="text-left blur-fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Code2 className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl sm:text-3xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    Technical Skills
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-base leading-relaxed mb-6">
                                <span className="text-primary">{'// '}</span>
                                Technologies and frameworks I work with daily
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: 'React', logo: 'react', color: '61DAFB' },
                                    { name: 'JavaScript', logo: 'javascript', color: 'F7DF1E' },
                                    // { name: 'TypeScript', logo: 'typescript', color: '3178C6' },
                                    { name: 'Tailwind CSS', logo: 'tailwindcss', color: '06B6D4' },
                                    { name: 'Node.js', logo: 'nodedotjs', color: '339933' },
                                    { name: 'Express', logo: 'express', color: '000000' },
                                    { name: 'MongoDB', logo: 'mongodb', color: '47A248' },
                                    { name: 'PostgreSQL', logo: 'postgresql', color: '4169E1' },
                                    { name: 'Firebase', logo: 'firebase', color: 'FFCA28' },
                                    { name: 'Vite', logo: 'vite', color: '646CFF' },
                                    { name: 'Git', logo: 'git', color: 'F05032' },
                                    { name: 'Vercel', logo: 'vercel', color: '000000' },
                                    { name: 'Postman', logo: 'postman', color: 'FF6C37' },
                                ].map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="flex items-center gap-2 px-4 py-2 bg-card border border-border 
                                                 rounded-lg hover:border-primary/50 hover:scale-105 transition-all duration-200
                                                 cursor-default shadow-sm"
                                    >
                                        <img
                                            src={`https://cdn.simpleicons.org/${tech.logo}/${tech.color}`}
                                            alt={tech.name}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-sm font-medium text-foreground">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What I Do Section */}
                        <div className="text-left blur-fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Rocket className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl sm:text-3xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    What I Do
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-base leading-relaxed mb-8">
                                <span className="text-primary">{'// '}</span>
                                Core areas of expertise and focus
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-primary">
                                                {feature.icon}
                                            </div>
                                            <h4 className="font-mono font-bold text-base text-foreground">
                                                {feature.title}
                                            </h4>
                                        </div>
                                        <p className="text-muted-foreground text-sm font-mono leading-relaxed pl-7">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Work Experience Section */}
                        <div className="text-left blur-fade-in-element">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="h-6 w-6 text-primary" />
                                <h3 className="text-2xl sm:text-3xl font-mono font-bold underline decoration-primary/50 decoration-2
                                           underline-offset-4 hover:decoration-primary transition-colors">
                                    Work Experience
                                </h3>
                            </div>

                            <p className="text-muted-foreground font-mono text-base leading-relaxed mb-8">
                                <span className="text-primary">{'// '}</span>
                                Professional journey and key contributions
                            </p>

                            <div className="space-y-10">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                            <div>
                                                <h4 className="font-mono font-bold text-xl sm:text-2xl text-foreground">
                                                    {exp.position}
                                                </h4>
                                                <div className="text-primary font-medium font-mono text-base sm:text-lg">
                                                    {exp.company}
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono text-muted-foreground bg-primary/10
                                                         px-3 py-1 rounded border border-primary/20 w-fit">
                                                {exp.period}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            {exp.description.split('•').filter(item => item.trim()).map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-muted-foreground text-base font-mono leading-relaxed">
                                                    <span className="text-primary mt-1 flex-shrink-0">▸</span>
                                                    <span>{item.trim()}</span>
                                                </div>
                                            ))}
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