import React, { useEffect, useRef, useState } from 'react';

// Two loose passes of a pen around the word, like a quick marker circle.
const LOOP = 'M4.65 19.54C5.34 18.64 6.99 15.86 8.81 14.15C10.63 12.44 12.87 10.73 15.56 9.26C18.26 7.79 21.48 6.4 24.98 5.33C28.48 4.27 32.52 3.4 36.54 2.88C40.56 2.36 44.97 2.15 49.11 2.21C53.24 2.27 57.48 2.68 61.37 3.25C65.26 3.82 69.01 4.68 72.46 5.64C75.91 6.61 79.14 7.77 82.06 9.04C84.99 10.31 87.71 11.73 90 13.28C92.29 14.82 94.36 16.53 95.78 18.31C97.21 20.09 98.26 22.05 98.56 23.96C98.86 25.87 98.55 27.91 97.61 29.78C96.66 31.65 94.95 33.53 92.87 35.16C90.78 36.8 88.01 38.32 85.08 39.61C82.16 40.9 78.77 41.99 75.33 42.91C71.89 43.83 68.2 44.56 64.44 45.12C60.69 45.67 56.77 46.07 52.82 46.24C48.88 46.41 44.75 46.42 40.79 46.13C36.82 45.84 32.71 45.32 29.03 44.52C25.35 43.71 21.72 42.6 18.72 41.31C15.72 40.02 13.05 38.42 11.02 36.77C8.99 35.13 7.52 33.26 6.53 31.44C5.55 29.62 5.16 27.7 5.12 25.85C5.09 23.99 5.53 22.13 6.32 20.33C7.11 18.52 8.27 16.73 9.86 15.03C11.45 13.34 13.42 11.65 15.85 10.17C18.28 8.68 21.21 7.25 24.44 6.13C27.68 5 31.46 4.04 35.28 3.41C39.1 2.79 43.34 2.45 47.35 2.4C51.37 2.34 55.54 2.62 59.38 3.08C63.22 3.54 66.96 4.29 70.4 5.15C73.84 6.01 77.06 7.08 80.01 8.25C82.95 9.43 85.7 10.75 88.05 12.19C90.41 13.63 92.57 15.22 94.15 16.9C95.73 18.58 96.98 20.44 97.52 22.27C98.06 24.11 98.06 26.09 97.39 27.92C96.73 29.75 95.34 31.63 93.54 33.27C91.73 34.91 89.22 36.46 86.54 37.79C83.85 39.11 80.66 40.25 77.42 41.22C74.17 42.18 70.65 42.96 67.07 43.57C63.49 44.18 59.74 44.64 55.95 44.88C52.17 45.13 48.2 45.22 44.35 45.04C40.5 44.86 36.49 44.47 32.84 43.8C29.19 43.13 25.54 42.17 22.47 41.02C19.4 39.86 16.59 38.39 14.42 36.86C12.24 35.32 10.25 32.65 9.41 31.81';

const Scribble = ({ children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { threshold: 1, rootMargin: '0px 0px -12% 0px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={`scribble${visible ? ' is-visible' : ''}`}>
            <span className="scribble-text">{children}</span>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path
                    pathLength="1"
                    d={LOOP}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </span>
    );
};

export default Scribble;
