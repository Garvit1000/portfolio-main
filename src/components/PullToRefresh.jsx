import React, { useState, useRef, useCallback, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Refresh01Icon } from '@hugeicons/core-free-icons';

/**
 * Pull-to-Refresh with jank-free touch handling: transforms are written
 * directly to DOM in a rAF loop; React state is only updated on gesture end.
 */
const PullToRefresh = ({ children, onRefresh }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pulling, setPulling] = useState(false);

    const startY = useRef(0);
    const currentPull = useRef(0);
    const pendingPull = useRef(0);
    const rafId = useRef(null);

    const contentRef = useRef(null);
    const indicatorRef = useRef(null);
    const iconWrapRef = useRef(null);

    const threshold = 80;
    const maxPull = 120;

    const applyTransforms = useCallback((distance) => {
        const clamped = Math.min(distance, maxPull);
        if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(0, ${clamped}px, 0)`;
        }
        if (indicatorRef.current) {
            indicatorRef.current.style.transform =
                `translate3d(-50%, ${clamped - 60}px, 0)`;
            indicatorRef.current.style.opacity =
                clamped > 10 ? String(Math.min(clamped / threshold, 1)) : '0';
        }
        if (iconWrapRef.current) {
            iconWrapRef.current.style.transform = `rotate(${clamped * 3}deg)`;
        }
    }, []);

    const scheduleFrame = useCallback(() => {
        if (rafId.current != null) return;
        rafId.current = requestAnimationFrame(() => {
            rafId.current = null;
            currentPull.current = pendingPull.current;
            applyTransforms(currentPull.current);
        });
    }, [applyTransforms]);

    const animateTo = useCallback((target, duration = 300) => {
        const from = currentPull.current;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const value = from + (target - from) * ease(t);
            currentPull.current = value;
            applyTransforms(value);
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [applyTransforms]);

    const handleTouchStart = useCallback((e) => {
        if (window.scrollY > 0) return;
        startY.current = e.touches[0].clientY;
        setPulling(true);
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!pulling || isRefreshing) return;
        const diff = e.touches[0].clientY - startY.current;
        if (diff > 0 && window.scrollY <= 0) {
            pendingPull.current = Math.min(diff * 0.5, maxPull);
            if (diff > 10) e.preventDefault();
            scheduleFrame();
        }
    }, [pulling, isRefreshing, scheduleFrame]);

    const handleTouchEnd = useCallback(async () => {
        if (!pulling) return;
        setPulling(false);
        const finalPull = currentPull.current;

        if (finalPull >= threshold && !isRefreshing) {
            setIsRefreshing(true);
            animateTo(60);
            try {
                if (onRefresh) await onRefresh();
                else {
                    await new Promise((r) => setTimeout(r, 800));
                    window.location.reload();
                }
            } catch (err) {
                console.error('Refresh failed:', err);
            }
            setIsRefreshing(false);
        }
        pendingPull.current = 0;
        animateTo(0);
    }, [pulling, isRefreshing, onRefresh, animateTo]);

    useEffect(() => () => {
        if (rafId.current != null) cancelAnimationFrame(rafId.current);
    }, []);

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative"
            style={{ touchAction: pulling ? 'pan-x' : 'auto' }}
        >
            <div
                ref={indicatorRef}
                className="fixed left-1/2 z-50 flex items-center justify-center pointer-events-none"
                style={{
                    transform: 'translate3d(-50%, -60px, 0)',
                    opacity: 0,
                    top: '60px',
                    willChange: 'transform, opacity',
                }}
            >
                <div
                    ref={iconWrapRef}
                    className={`
                        w-12 h-12 rounded-full bg-primary/10 backdrop-blur-lg
                        border border-primary/20 flex items-center justify-center
                        shadow-lg shadow-primary/10
                        ${isRefreshing ? 'animate-pulse' : ''}
                    `}
                    style={{ willChange: 'transform' }}
                >
                    <HugeiconsIcon
                        icon={Refresh01Icon}
                        className={`h-5 w-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`}
                    />
                </div>
            </div>

            <div
                ref={contentRef}
                style={{
                    transform: 'translate3d(0, 0, 0)',
                    willChange: pulling ? 'transform' : 'auto',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PullToRefresh;
