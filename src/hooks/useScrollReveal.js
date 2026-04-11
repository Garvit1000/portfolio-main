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

          // Reveal the container itself
          entry.target.classList.add('revealed');

          // Stagger children
          const items = entry.target.querySelectorAll('.stagger-item');
          items.forEach((item, i) => {
            const delay = (options.staggerDelay || 50) * i;
            setTimeout(() => item.classList.add('revealed'), delay);
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
