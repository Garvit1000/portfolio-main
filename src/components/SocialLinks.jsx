import React from 'react';
import { socialLinks } from '../data/mock';

// Brand marks drawn on a 24x24 grid
const BRANDS = {
    github: {
        bg: 'linear-gradient(180deg, #2f3337 0%, #181717 100%)',
        glyph: (
            <path fill="#fff" d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
        ),
    },
    linkedin: {
        bg: 'linear-gradient(180deg, #1a7fdd 0%, #0a66c2 100%)',
        glyph: (
            <g fill="#fff">
                <circle cx="5.6" cy="5.4" r="2.3" />
                <rect x="3.6" y="9" width="4" height="11.6" rx="0.6" />
                <path d="M10.2 9h3.8v1.7c.6-1.1 2-2 3.9-2 3.3 0 4.1 2.1 4.1 5.1v6.8h-4v-6c0-1.4-.3-2.6-1.8-2.6s-2 1.1-2 2.6v6h-4z" />
            </g>
        ),
    },
    twitter: {
        bg: 'linear-gradient(180deg, #2a2a2a 0%, #000 100%)',
        glyph: (
            <path fill="#fff" transform="translate(2.4 2.4) scale(0.8)" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
        ),
    },
};

export const BrandIcon = ({ brand, size = 44 }) => {
    const b = BRANDS[brand];
    if (!b) return null;
    return (
        <span className="app-icon" style={{ width: size, height: size, background: b.bg }}>
            <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} aria-hidden="true">
                {b.glyph}
            </svg>
        </span>
    );
};

const SocialLinks = ({ size = 48, className = '' }) => (
    <div className={`flex items-center gap-2.5 ${className}`}>
        {socialLinks.map((social) => (
            <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lift rounded-[14px]"
                aria-label={social.name}
                title={social.name}
                data-sound-hover
            >
                <BrandIcon brand={social.icon} size={size} />
            </a>
        ))}
    </div>
);

export default SocialLinks;
