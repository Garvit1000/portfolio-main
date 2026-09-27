import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Cancel01Icon, VolumeHighIcon, VolumeMute02Icon } from '@hugeicons/core-free-icons';
import { useUiSounds } from './SoundProvider';

const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const { enabled: soundEnabled, toggleEnabled: toggleSound } = useUiSounds();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // On the homepage, scroll; elsewhere (e.g. the Lab), go home to that section
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const labLink = (extra = '') => (
    <Link
      to="/lab"
      onClick={() => setIsMenuOpen(false)}
      className={`${linkClass} ${extra} inline-flex items-center gap-1.5 ${pathname.startsWith('/lab') ? 'text-foreground bg-white/70' : ''}`}
    >
      Lab
      <span className="rounded-full bg-[hsl(var(--orange))] px-1.5 py-[1px] text-[10px] font-bold leading-4 text-white">new</span>
    </Link>
  );

  const linkClass = 'px-3 py-2 rounded-[10px] text-[15px] font-semibold text-foreground/80 hover:text-foreground hover:bg-white/70 transition-colors';

  return (
    <header className="sticky top-3 z-50 px-4 pt-3">
      <div className="nav-shell mx-auto max-w-[720px] px-2 py-2">
        <div className="flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2.5 pl-1.5 pr-2 py-1" onClick={() => setIsMenuOpen(false)}>
            <img src="/favicon.ico" alt="" className="brand-mark" width="32" height="32" />
            <span className="font-display font-bold text-lg tracking-[-0.02em]">Garvit Joshi</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} className={linkClass}>
                {s.label}
              </button>
            ))}
            {labLink()}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="grid place-items-center h-10 w-10 rounded-[10px] text-foreground/70 hover:text-foreground hover:bg-white/70 transition-colors"
              aria-label={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
              aria-pressed={soundEnabled}
              title={soundEnabled ? 'Sounds on' : 'Sounds off'}
            >
              <HugeiconsIcon icon={soundEnabled ? VolumeHighIcon : VolumeMute02Icon} className="h-[18px] w-[18px]" />
            </button>
            <a
              href="https://drive.google.com/file/d/1OYbuD4SnNmj66oBbIUDphRdyuQofLS5t/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink hidden sm:inline-flex px-4"
            >
              Résumé
            </a>
            <button
              className="md:hidden grid place-items-center h-10 w-10 rounded-[10px] hover:bg-white/70 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <HugeiconsIcon icon={isMenuOpen ? Cancel01Icon : Menu01Icon} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-1 pt-2 mt-2 border-t border-foreground/[0.06]">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} className={`${linkClass} text-left`}>
                {s.label}
              </button>
            ))}
            {labLink('text-left')}
            <a
              href="https://drive.google.com/file/d/1OYbuD4SnNmj66oBbIUDphRdyuQofLS5t/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink sm:hidden mt-1"
            >
              Résumé
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
