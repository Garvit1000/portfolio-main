import React, { useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, Location01Icon, GithubIcon, Linkedin01Icon, NewTwitterIcon, ComputerTerminalIcon, MailSend01Icon, MessageMultiple01Icon } from '@hugeicons/core-free-icons';
import { Button } from './ui/button';
import { personalInfo, socialLinks } from '../data/mock';

const Contact = () => {
    const sectionRef = useRef(null);


    const getSocialIcon = (iconName) => {
        switch (iconName) {
            case 'github':
                return <HugeiconsIcon icon={GithubIcon} className="h-5 w-5" />;
            case 'linkedin':
                return <HugeiconsIcon icon={Linkedin01Icon} className="h-5 w-5" />;
            case 'twitter':
                return <HugeiconsIcon icon={NewTwitterIcon} className="h-5 w-5" />;
            default:
                return null;
        }
    };

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
            <section id="contact" className="py-20 tech-section" ref={sectionRef}>
                <div className="container-xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="mb-4">
                            <span className="text-primary font-mono text-lg flex items-center justify-center">
                                <HugeiconsIcon icon={ComputerTerminalIcon} className="mr-2 h-4 w-4" />
                                {'>'} cat ~/contact.txt
                            </span>
                        </div>
                        <div className="relative">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-6">
                                Get In{' '}
                                <span className="text-primary tech-text-glow inline-block">
                                    Touch
                                </span>
                            </h2>
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 md:w-36
                                    h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Side - Contact Info */}
                            <div className="space-y-12">
                                {/* Description */}
                                <div>
                                    <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed mb-2">
                                        <span className="text-primary">{'// '}</span>
                                        I'm currently available for freelance work, collaborations, and full-time opportunities.
                                    </p>
                                    <p className="text-muted-foreground font-mono text-sm sm:text-base leading-relaxed">
                                        <span className="text-primary">{'// '}</span>
                                        Let's build something amazing together.
                                    </p>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <HugeiconsIcon icon={MailSend01Icon} className="h-5 w-5 text-primary" />
                                        <h3 className="text-xl font-mono font-bold">
                                            Contact Details
                                        </h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4 text-primary" />
                                            <a
                                                href={`mailto:${personalInfo.email}`}
                                                className="font-mono text-base hover:text-primary transition-colors"
                                            >
                                                {personalInfo.email}
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 text-primary" />
                                            <span className="font-mono text-base text-muted-foreground">
                                                {personalInfo.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <HugeiconsIcon icon={ComputerTerminalIcon} className="h-5 w-5 text-primary" />
                                        <h3 className="text-xl font-mono font-bold">
                                            Social Networks
                                        </h3>
                                    </div>

                                    <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                        <span className="text-primary">{'// '}</span>
                                        Connect with me on various platforms
                                    </p>

                                    <div className="flex items-center gap-6">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors
                                                     p-3 border border-primary/20 hover:border-primary rounded-lg"
                                                aria-label={social.name}
                                                title={social.name}
                                            >
                                                {getSocialIcon(social.icon)}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Quick Stats / Info */}
                            <div className="space-y-8">

                                {/* Current Status */}
                                <div className="px-4 md:px-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <h3 className="font-mono font-bold text-lg">
                                            Current Status
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                            <span className="text-primary">{'// '}</span>
                                            Available for new projects
                                        </p>
                                        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                            <span className="text-primary">{'// '}</span>
                                            Open to freelance opportunities
                                        </p>
                                        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                            <span className="text-primary">{'// '}</span>
                                            Interested in full-time roles
                                        </p>
                                    </div>
                                </div>

                                {/* Interests */}
                                <div className="px-4 md:px-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <HugeiconsIcon icon={ComputerTerminalIcon} className="h-5 w-5 text-primary" />
                                        <h3 className="font-mono font-bold text-lg">
                                            Interested In
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {['Web Development', 'Open Source', 'Startups', 'SaaS'].map((interest) => (
                                            <span
                                                key={interest}
                                                className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-2
                                                     rounded border border-primary/20 hover:bg-primary/20
                                                     transition-colors cursor-default"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;