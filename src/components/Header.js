import React from 'react';
import { Button } from './ui/button';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with tech styling */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors font-mono flex items-center"
            >
              <Terminal className="mr-2 h-5 w-5 text-primary" />
              {'{'}Garvit{'}'}
            </button>
          </div>

          {/* Desktop Navigation with tech styling */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono relative group"
            >
              ./projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono relative group"
            >
              ./about
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono relative group"
            >
              ./contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
          </nav>

          {/* Theme Toggle & Mobile Menu with sharp edges */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 straight-line border border-primary/20 hover:border-primary hover:bg-primary/10"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0 straight-line border border-primary/20 hover:border-primary hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with tech styling */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('projects')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono straight-line"
              >
                <span className="text-primary">$ </span>cd ./projects
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono straight-line"
              >
                <span className="text-primary">$ </span>cd ./about
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono straight-line"
              >
                <span className="text-primary">$ </span>cd ./contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;