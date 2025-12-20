import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { FavouriteIcon, ArrowUp01Icon, ComputerTerminalIcon, CodeIcon, DatabaseIcon } from '@hugeicons/core-free-icons';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';
import FooterText from './spectrumui/footer';

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
                {currentYear} {personalInfo.name}
                <span className="text-primary"> // </span>
                All rights reserved.
              </div>
              <div className="flex items-center text-sm text-muted-foreground font-mono">
                Made with
                <HugeiconsIcon icon={FavouriteIcon} className="h-4 w-4 mx-1 text-red-500 fill-current" />
                using
                <HugeiconsIcon icon={CodeIcon} className="h-4 w-4 mx-1 text-primary" />
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
                <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4 mr-2 transition-transform group-hover:-translate-y-1" />
                sudo top
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section with tech styling */}
        <FooterText />
      </div>
    </footer>
  );
};

export default Footer;