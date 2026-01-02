import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ComputerTerminalIcon, GithubIcon, Briefcase01Icon, CodeIcon, SparklesIcon, Rocket01Icon, Layers01Icon, DashboardSpeed01Icon } from '@hugeicons/core-free-icons';
import { experience } from '../data/mock';
import { WorkExperience } from './work-experience';

const About = () => {
    const sectionRef = useRef(null);


    const features = [
        {
            icon: <HugeiconsIcon icon={CodeIcon} className="h-5 w-5" />,
            title: "Clean Code",
            description: "Writing maintainable, scalable code following industry best practices."
        },
        {
            icon: <HugeiconsIcon icon={SparklesIcon} className="h-5 w-5" />,
            title: "UI/UX Focus",
            description: "Creating intuitive interfaces with seamless user experiences."
        },
        {
            icon: <HugeiconsIcon icon={DashboardSpeed01Icon} className="h-5 w-5" />,
            title: "Performance",
            description: "Optimizing applications for speed and accessibility."
        },
        {
            icon: <HugeiconsIcon icon={Layers01Icon} className="h-5 w-5" />,
            title: "System Design",
            description: "Architecting robust, scalable solutions."
        }
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

                .font-serif {
                    font-family: 'Playfair Display', serif;
                }

                .elegant-shadow {
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04);
                }
            `}</style>

            <section id="about" className="py-20 tech-section relative" ref={sectionRef}>
                {/* Horizontal line at start of section */}
                <div className="absolute top-0 left-0 right-0 pointer-events-none z-0">
                    <div className="container-xl mx-auto">
                        <div className="max-w-4xl mx-auto h-px bg-border/50"></div>
                    </div>
                </div>
                <div className="container-xl relative" style={{ zIndex: 2 }}>
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="space-y-6">
                            <div className="mb-4">

                            </div>
                            <div className="relative">
                                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-6">
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

                    <div className="max-w-4xl mx-auto space-y-12">

                        {/* Skills Section */}
                        <div>
                            <div className="px-4 md:px-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <HugeiconsIcon icon={CodeIcon} className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">
                                        Technical Skills
                                    </h3>
                                </div>

                                <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed mb-6">
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
                        </div>

                        {/* What I Do Section */}
                        <div className="blur-fade-in-element">
                            <div className="px-4 md:px-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <HugeiconsIcon icon={Rocket01Icon} className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">
                                        What I Do
                                    </h3>
                                </div>

                                <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed mb-8">
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
                        </div>

                        {/* Work Experience Section */}
                        <div className="blur-fade-in-element">
                            <div className="px-4 md:px-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <HugeiconsIcon icon={Briefcase01Icon} className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">
                                        Work Experience
                                    </h3>
                                </div>

                                <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed mb-8">
                                    <span className="text-primary">{'// '}</span>
                                    Professional journey and key contributions
                                </p>

                                <div className="space-y-10">
                                    <WorkExperience
                                        experiences={experience.map(exp => ({
                                            id: exp.id.toString(),
                                            companyName: exp.company,
                                            // companyLogo: "", 
                                            isCurrentEmployer: exp.period.toLowerCase().includes('present'),
                                            positions: [
                                                {
                                                    id: `${exp.id}-1`,
                                                    title: exp.position,
                                                    employmentPeriod: exp.period,
                                                    employmentType: "Full-time",
                                                    description: exp.description,
                                                    icon: "code",
                                                    isExpanded: true
                                                }
                                            ]
                                        }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connect Button */}
                    <div className="text-center mt-16">
                        <Button
                            variant="outline"
                            size="lg"
                            className="transition-all rounded-lg font-mono border-primary/50 hover:border-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
                        >
                            <HugeiconsIcon icon={GithubIcon} className="mr-2 h-5 w-5" />
                            git clone --about-me
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;