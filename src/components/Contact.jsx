import React, { useEffect, useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, Terminal, User } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo, socialLinks } from '../data/mock';

const Contact = () => {
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
        <section id="contact" className="py-20 tech-section" ref={sectionRef}>
            <div className="container-xl">
                <div className="text-center mb-16">
                    <div className="mb-4 fade-in-element">
                        <span className="text-primary font-mono text-lg">{'>'} ./initiate-contact.sh</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-serif fade-in-element">
                        Get In{' '}
                        <span className="text-primary tech-text-glow">
              Touch
            </span>
                    </h2>
                </div>

                {/* Contact List - Left aligned within centered container */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-12 text-left">

                        {/* Contact Info Section */}
                        <div className="group fade-in-element">
                            <div className="p-6 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <User className="h-5 w-5 text-primary" />
                                    <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                                        Contact Information
                                    </h3>
                                </div>

                                <div className="text-muted-foreground font-mono text-sm leading-relaxed mb-6 space-y-2">
                                    <p>
                                        <span className="text-primary">{'// '}</span>
                                        Available for freelance projects, collaborations, and full-time opportunities.
                                    </p>
                                    <p>
                                        <span className="text-primary">{'// '}</span>
                                        Feel free to reach out via email or connect through social platforms.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors">
                                        <Mail className="h-4 w-4 text-primary" />
                                        <a
                                            href={`mailto:${personalInfo.email}`}
                                            className="font-mono text-sm hover:text-primary transition-colors"
                                        >
                                            {personalInfo.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span className="font-mono text-sm text-muted-foreground">
                      {personalInfo.location}
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="group fade-in-element">
                            <div className="p-6 border border-primary/10 rounded-lg hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <Terminal className="h-5 w-5 text-primary" />
                                    <h3 className="text-2xl font-mono font-bold underline decoration-primary/50 decoration-2 underline-offset-4 hover:decoration-primary transition-colors">
                                        Social Networks
                                    </h3>
                                </div>

                                <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-6">
                                    <span className="text-primary">{'// '}</span>
                                    Connect with me on various platforms for updates, projects, and professional networking.
                                </p>

                                <div className="space-y-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg hover:border-primary transition-colors group/link"
                                        >
                                            {getSocialIcon(social.icon)}
                                            <span className="font-mono text-sm group-hover/link:text-primary transition-colors">
                        {social.name}
                      </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connect Button */}
                <div className="text-center mt-16 fade-in-element">
                    <a href={`mailto:${personalInfo.email}`}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-lg border-primary/50 hover:border-primary font-mono hover:tech-glow"
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            git clone --connect
                        </Button>
                    </a>
                </div>
            </div>
        </section>
            </>
    );
};

export default Contact;