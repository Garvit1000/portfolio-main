import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for butter-smooth scrolling using Lenis
 * Provides silky smooth scroll experience across the portfolio
 */
export function useSmoothScroll() {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2, // Scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Animation frame loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links for smooth navigation
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                const id = target.getAttribute('href');
                if (id && id !== '#') {
                    e.preventDefault();
                    const element = document.querySelector(id);
                    if (element) {
                        lenis.scrollTo(element, {
                            offset: -80, // Account for fixed header
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        // Cleanup
        return () => {
            document.removeEventListener('click', handleAnchorClick);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}

export default useSmoothScroll;
