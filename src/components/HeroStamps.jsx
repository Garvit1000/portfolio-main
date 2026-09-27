import React, { useId } from 'react';
import { personalInfo } from '../data/mock';
import { PlaneArt, CityArt } from './stamp-art';

// A postage stamp: perforated paper, framed artwork, caption strip
export const Stamp = ({ w, h, art, caption, value, rot = 0, delay = 0, className = '', children }) => (
    <div
        className={`stamp-wrap absolute ${className}`}
        style={{ '--rot': `${rot}deg`, '--delay': `${delay}ms` }}
    >
        <div className="stamp" style={{ width: w, height: h }}>
            <div className="stamp-art" style={{ background: art }}>
                {children}
                {value && <span className="stamp-value">{value}</span>}
            </div>
            <div className="stamp-caption">{caption}</div>
        </div>
    </div>
);

// Circular cancellation mark with wavy lines, "posted" over the stamps.
// `center` is one big mark (e.g. initials) or two short lines of text
export const Postmark = ({ className = '', ring = 'SHIPPED FROM INDIA ★ MADE WITH CARE ★', center = ['GJ'] }) => {
    const ringId = useId();
    const text = { textAnchor: 'middle', fill: 'currentColor', fontWeight: 700, fontFamily: 'var(--font-display)' };
    const wave = (y) => `M96 ${y} q6.5 -5 13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0`;

    return (
        <svg viewBox="0 0 190 96" className={`postmark absolute ${className}`} fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeLinecap="round">
                <circle cx="48" cy="48" r="44" strokeWidth="2.2" />
                <circle cx="48" cy="48" r="31" strokeWidth="1.4" />
                {[30, 42, 54, 66].map(y => <path key={y} d={wave(y)} strokeWidth="2" />)}
            </g>
            <defs>
                <path id={ringId} d="M48 48 m-37.5 0 a37.5 37.5 0 1 1 75 0 a37.5 37.5 0 1 1 -75 0" />
            </defs>
            {/* textLength = ring circumference (2π × 37.5), so the text wraps it exactly once */}
            <text fill="currentColor" fontSize="7.4" fontWeight="700" fontFamily="var(--font-display)">
                <textPath href={`#${ringId}`} textLength="233" lengthAdjust="spacing">
                    {ring}
                </textPath>
            </text>
            {center.length === 1 ? (
                <>
                    <text x="48" y="54" fontSize="21" letterSpacing="-0.5" {...text}>{center[0]}</text>
                    <text x="48" y="67" fontSize="8" {...text}>★</text>
                </>
            ) : (
                <>
                    <text x="48" y="46" fontSize="11.5" letterSpacing="0.8" {...text}>{center[0]}</text>
                    <line x1="30" y1="50.5" x2="66" y2="50.5" stroke="currentColor" strokeWidth="1.1" />
                    <text x="48" y="61" fontSize="11.5" letterSpacing="0.8" {...text}>{center[1]}</text>
                </>
            )}
        </svg>
    );
};

const HeroStamps = () => (
    <div className="flex justify-center h-[172px] sm:h-[232px]">
        <div className="relative w-[460px] h-[232px] shrink-0 scale-[0.74] sm:scale-100 origin-top">
            <Stamp
                w={112} h={140} rot={-13} delay={80}
                className="left-[52px] top-[62px] z-10"
                art="#bfdcf7"
                caption="Wanderlust" value="5"
            >
                <PlaneArt />
            </Stamp>

            <Stamp
                w={112} h={140} rot={11} delay={200}
                className="right-[52px] top-[62px] z-10"
                art="#ffa37f"
                caption="City lights" value="10"
            >
                <CityArt />
            </Stamp>

            <Stamp
                w={140} h={168} rot={-3} delay={0}
                className="left-[160px] top-[8px] z-20"
                art="#fbf8f1"
                caption="Garvit · India" value="₹1"
            >
                <img
                    src="https://github.com/Garvit1000.png"
                    alt={personalInfo.name}
                    className="h-full w-full object-cover mix-blend-multiply"
                />
            </Stamp>

            <Postmark className="left-[250px] top-[146px] w-[170px] z-30" />
        </div>
    </div>
);

export default HeroStamps;
