import React from 'react';
import { Button } from './ui/button';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';

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
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 gpu-accelerated">
      <div className="container-xl">
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
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 xl:space-x-16">
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

          {/* Theme Selector, Theme Toggle & Mobile Menu with sharp edges */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Theme Selector */}
            <ThemeSelector />
            
            {/* Light/Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 p-0 border border-primary/20 hover:border-primary hover:bg-primary/10 gpu-accelerated transition-all duration-100 rounded-lg"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 transition-transform duration-100" />
              ) : (
                <Sun className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 transition-transform duration-100" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0 border border-primary/20 hover:border-primary hover:bg-primary/10 gpu-accelerated transition-all duration-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
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
          <div className="md:hidden border-t border-primary/20 bg-background/95 backdrop-blur gpu-accelerated">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('projects')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono rounded-lg"
              >
                <span className="text-primary">$ </span>cd ./projects
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono rounded-lg"
              >
                <span className="text-primary">$ </span>cd ./about
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full text-left font-mono rounded-lg"
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