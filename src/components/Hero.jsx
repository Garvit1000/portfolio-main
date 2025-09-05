import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2 } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/mock';

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getSocialIcon = (iconName) => {
        switch (iconName) {
            case 'github':
                return <Github className="h-4 w-4" />;
            case 'linkedin':
                return <Linkedin className="h-4 w-4" />;
            case 'twitter':
                return <Twitter className="h-4 w-4" />;
            default:
                return null;
        }
    };

    return (
        <section id="hero" className="pt-2 sm:pt-4 md:pt-6 lg:pt-8 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 tech-section gpu-accelerated">
            <div className="max-w-3xl lg:max-w-4xl mx-auto text-center">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Terminal Badge */}
                    <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-lg inline-flex items-center">
                        <Terminal className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        $ status --available
                    </Badge>

                    {/* Main Heading */}
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                        <div className="relative">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-mono gpu-accelerated">
                                <span className="text-muted-foreground">{'>'}</span> Hi, I'm{' '}
                                <span className="text-primary tech-text-glow">
                  {personalInfo.name}
                </span>
                            </h1>
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-0.5 bg-primary"></div>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-mono font-medium gpu-accelerated flex items-center justify-center">
                            <Code2 className="inline mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            {personalInfo.title}
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
                        <div className="rounded-lg p-3 sm:p-4 md:p-6 bg-card/50 backdrop-blur-sm border border-primary/10">
                            <p className="text-sm sm:text-base md:text-lg text-primary leading-relaxed font-mono">
                                {personalInfo.bio}
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4">
                        <Button
                            size="sm"
                            onClick={() => scrollToSection('projects')}
                            className="group rounded-lg tech-glow hover:tech-glow font-mono gpu-accelerated transition-all duration-100 w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                            <Terminal className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            ./view-projects
                            <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-100 group-hover:translate-x-1" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => scrollToSection('contact')}
                            className="rounded-lg border-primary/50 hover:border-primary font-mono gpu-accelerated transition-all duration-100 w-full sm:w-auto text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3"
                        >
                            <Download className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            download-resume.pdf
                        </Button>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-5 pt-2 sm:pt-3 md:pt-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-all duration-100 p-2 sm:p-2.5 md:p-3 border border-primary/20 hover:border-primary rounded-lg hover:tech-glow gpu-accelerated"
                                aria-label={social.name}
                            >
                                {getSocialIcon(social.icon)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;