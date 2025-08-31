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
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 tech-section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          {/* Terminal-style Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm straight-line border border-primary/20 bg-primary/5">
              <Terminal className="mr-2 h-3 w-3" />
              $ status --available
            </Badge>
          </div>

          {/* Main Heading with Tech styling */}
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-mono">
                <span className="text-muted-foreground">{'>'}</span> Hi, I'm{' '}
                <span className="text-primary tech-text-glow">
                  {personalInfo.name}
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-primary"></div>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-mono font-medium">
              <Code2 className="inline mr-2 h-6 w-6" />
              {personalInfo.title}
            </p>
          </div>

          {/* Bio with tech styling */}
          <div className="relative max-w-3xl mx-auto">
            <div className="angular-card p-6 bg-card/50 backdrop-blur-sm">
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-mono">
                <span className="text-primary">{'// '}</span>
                {personalInfo.bio}
              </p>
            </div>
          </div>

          {/* CTA Buttons with sharp edges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('projects')}
              className="group straight-line tech-glow hover:tech-glow font-mono"
            >
              <Terminal className="mr-2 h-4 w-4" />
              ./view-projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="straight-line border-primary/50 hover:border-primary font-mono"
            >
              <Download className="mr-2 h-4 w-4" />
              download-resume.pdf
            </Button>
          </div>

          {/* Social Links with tech styling */}
          <div className="flex items-center justify-center space-x-6 pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-3 border border-primary/20 hover:border-primary straight-line hover:tech-glow"
                aria-label={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          {/* Stats with monospace numbers and tech design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center angular-card p-4 bg-card/30 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-primary mono-numbers">
                {personalInfo.yearsOfExperience}
              </div>
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                Years Experience
              </div>
            </div>
            <div className="text-center angular-card p-4 bg-card/30 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-primary mono-numbers">
                25+
              </div>
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                Projects Deployed
              </div>
            </div>
            <div className="text-center angular-card p-4 bg-card/30 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-primary mono-numbers">
                100%
              </div>
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                Uptime Record
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;