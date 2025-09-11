import React from 'react';
import { Heart, ArrowUp, Terminal, Code2, Database } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-muted/30 tech-section">
      <div className="container-xl py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 text-left">
            {/* Left Side - Copyright with tech styling */}
            <div className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground font-mono">
                <span className="text-primary">© </span>
                {currentYear} {personalInfo.name}.toUpperCase()
                <span className="text-primary"> // </span>
                All rights reserved.
              </div>
              <div className="flex items-center text-sm text-muted-foreground font-mono">
                Made with
                <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
                using
                <Code2 className="h-4 w-4 mx-1 text-primary" />
                React && Tailwind CSS
              </div>
            </div>

            {/* Center - Quick Links with tech styling */}
            <div className="flex items-center space-x-6 md:space-x-8">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                ./projects
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                ./about
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                ./contact
              </button>
            </div>

            {/* Right Side - Back to Top with tech styling */}
            <div className="flex justify-start md:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="group straight-line border-primary/50 hover:border-primary font-mono"
              >
                <ArrowUp className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                sudo top
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section with tech styling */}
        <div className="mt-8 pt-8 border-t border-primary/20">
          <div className="max-w-4xl mx-auto text-left">
            <p className="text-sm text-muted-foreground font-mono">
              <Terminal className="inline h-4 w-4 mr-1 text-primary" />
              This portfolio is open source
              <span className="text-primary"> && </span>
              available on{' '}
              <a
                href="https://github.com/Garvit1000/portfolio-main"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                GitHub.repository
              </a>
            </p>
            <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground font-mono">
              <span className="flex items-center">
                <Database className="h-3 w-3 mr-1 text-primary" />
                Built: {currentYear}
              </span>
              <span className="flex items-center">
                <Code2 className="h-3 w-3 mr-1 text-primary" />
                Version: 1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;