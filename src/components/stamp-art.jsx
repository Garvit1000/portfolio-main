import React from 'react';

/* Stamp artwork, drawn to fill a 90x104 art window. Plain SVG (no text, no
   external images) so it can also be rasterised onto a canvas, e.g. as the
   sample photo in the Lab's stamp tool. */

// Sunrise sky, clouds, and a plane climbing out with a dashed contrail
export const PlaneArt = () => (
    <svg viewBox="0 0 90 104" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <defs>
            <linearGradient id="plane-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7fb9f5" />
                <stop offset="0.6" stopColor="#bfdcf7" />
                <stop offset="1" stopColor="#ffe0bf" />
            </linearGradient>
        </defs>
        <rect width="90" height="104" fill="url(#plane-sky)" />
        <circle cx="62" cy="76" r="15" fill="#ffc07a" opacity="0.9" />
        <circle cx="62" cy="76" r="21" fill="#ffc07a" opacity="0.25" />
        {/* clouds */}
        <g fill="#fff">
            <ellipse cx="18" cy="88" rx="16" ry="6" />
            <ellipse cx="28" cy="84" rx="10" ry="7" />
            <ellipse cx="70" cy="96" rx="20" ry="6" />
            <ellipse cx="60" cy="92" rx="9" ry="6" />
            <ellipse cx="66" cy="30" rx="10" ry="3.5" opacity="0.8" />
            <ellipse cx="72" cy="28" rx="6" ry="3.5" opacity="0.8" />
        </g>
        {/* contrail */}
        <path d="M8 74 C 22 60, 30 52, 44 42" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" fill="none" opacity="0.95" />
        {/* plane (top-down), climbing to the upper right */}
        <g transform="translate(40 14) rotate(45 12 12) scale(1.35)">
            <path
                d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
                fill="#fff"
                stroke="#3c3a38"
                strokeWidth="0.8"
                strokeLinejoin="round"
            />
        </g>
    </svg>
);

// Sunset skyline with lit windows and a few birds
export const CityArt = () => {
    const buildings = [
        { x: 2, w: 14, h: 34, c: '#5a4b57' },
        { x: 14, w: 12, h: 50, c: '#4a3f4a' },
        { x: 26, w: 16, h: 40, c: '#5a4b57' },
        { x: 40, w: 11, h: 62, c: '#3f3640' },
        { x: 51, w: 15, h: 46, c: '#4a3f4a' },
        { x: 65, w: 12, h: 56, c: '#5a4b57' },
        { x: 76, w: 14, h: 38, c: '#4a3f4a' },
    ];
    const ground = 104;
    return (
        <svg viewBox="0 0 90 104" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
            <defs>
                <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffd1a1" />
                    <stop offset="0.55" stopColor="#ffa37f" />
                    <stop offset="1" stopColor="#d9788e" />
                </linearGradient>
            </defs>
            <rect width="90" height="104" fill="url(#city-sky)" />
            <circle cx="30" cy="50" r="20" fill="#fff0d4" opacity="0.85" />
            {/* birds */}
            <g stroke="#5a4b57" strokeWidth="1.1" fill="none" strokeLinecap="round">
                <path d="M60 18 q3 -3 6 0 q3 -3 6 0" />
                <path d="M70 28 q2 -2 4 0 q2 -2 4 0" />
            </g>
            {/* antenna on the tallest tower */}
            <line x1="45.5" y1={ground - 62} x2="45.5" y2={ground - 72} stroke="#3f3640" strokeWidth="1.2" />
            {buildings.map((b, i) => (
                <g key={i}>
                    <rect x={b.x} y={ground - b.h} width={b.w} height={b.h} fill={b.c} />
                    {/* windows: a sparse, deterministic grid so some are lit */}
                    {Array.from({ length: Math.floor((b.h - 6) / 7) }).flatMap((_, row) =>
                        Array.from({ length: Math.floor((b.w - 3) / 4) }).map((__, col) =>
                            ((row + 1) * 7 + (col + 1) * 13 + i * 5) % 5 < 2 ? (
                                <rect
                                    key={`${row}-${col}`}
                                    x={b.x + 2.5 + col * 4}
                                    y={ground - b.h + 4 + row * 7}
                                    width="1.8"
                                    height="2.6"
                                    fill="#ffd98a"
                                />
                            ) : null
                        )
                    )}
                </g>
            ))}
        </svg>
    );
};
