import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered reveal with stagger support.
 * Adds 'revealed' class to .scroll-reveal and .stagger-item children
 * when the container enters the viewport.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.querySelectorAll('.scroll-reveal, .stagger-item').forEach(child => {
        child.classList.add('revealed');
      });
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Stagger via CSS transition-delay so reveals run on the compositor
          // in a single frame instead of N setTimeout callbacks between frames.
          const step = options.staggerDelay || 50;
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            item.style.transitionDelay = `${step * i}ms`;
          });

          requestAnimationFrame(() => {
            entry.target.classList.add('revealed');
            items.forEach((item) => item.classList.add('revealed'));
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '-60px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.staggerDelay]);

  return ref;
}
