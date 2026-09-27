import React from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container-xl pt-10 pb-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} {personalInfo.name}. Made with React & Tailwind.</p>
        <div className="flex items-center gap-1">
          <Link to="/lab" className="px-3 py-2 rounded-[10px] font-semibold hover:text-foreground hover:bg-white/70 transition-colors">
            Lab
          </Link>
          <a href="https://github.com/Garvit1000" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-[10px] font-semibold hover:text-foreground hover:bg-white/70 transition-colors">
            GitHub
          </a>
          <a href={`mailto:${personalInfo.email}`} className="px-3 py-2 rounded-[10px] font-semibold hover:text-foreground hover:bg-white/70 transition-colors">
            Email
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-soft px-3 py-2 ml-1 text-foreground"
          >
            <HugeiconsIcon icon={ArrowUp01Icon} className="h-4 w-4" />
            Top
          </button>
        </div>
      </div>

      <p
        className="mt-10 text-center font-display font-bold tracking-[-0.07em] leading-[0.8] text-[18vw] lg:text-[200px] text-foreground/[0.06] select-none"
        aria-hidden="true"
      >
        Garvit Joshi
      </p>
    </footer>
  );
};

export default Footer;
