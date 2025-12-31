import React, { useState, useRef, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Refresh01Icon } from '@hugeicons/core-free-icons';

/**
 * Pull-to-Refresh component with smooth animations
 * Provides tactile feedback for mobile users
 */
const PullToRefresh = ({ children, onRefresh }) => {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isPulling, setIsPulling] = useState(false);
    const startY = useRef(0);
    const containerRef = useRef(null);
    const threshold = 80; // Pull distance needed to trigger refresh
    const maxPull = 120;

    const handleTouchStart = useCallback((e) => {
        // Only enable pull-to-refresh when at top of page
        if (window.scrollY <= 0) {
            startY.current = e.touches[0].clientY;
            setIsPulling(true);
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isPulling || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;

        if (diff > 0 && window.scrollY <= 0) {
            // Apply resistance to pull
            const resistance = Math.min(diff * 0.5, maxPull);
            setPullDistance(resistance);

            // Prevent default scroll when pulling
            if (diff > 10) {
                e.preventDefault();
            }
        }
    }, [isPulling, isRefreshing]);

    const handleTouchEnd = useCallback(async () => {
        if (!isPulling) return;
        setIsPulling(false);

        if (pullDistance >= threshold && !isRefreshing) {
            setIsRefreshing(true);
            setPullDistance(60); // Hold at indicator position

            try {
                // Trigger refresh callback or default behavior
                if (onRefresh) {
                    await onRefresh();
                } else {
                    // Default: reload the page after a delay
                    await new Promise(resolve => setTimeout(resolve, 800));
                    window.location.reload();
                }
            } catch (error) {
                console.error('Refresh failed:', error);
            }

            setIsRefreshing(false);
        }

        // Animate back to top
        setPullDistance(0);
    }, [isPulling, pullDistance, isRefreshing, onRefresh]);

    return (
        <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative"
            style={{ touchAction: isPulling && pullDistance > 10 ? 'none' : 'auto' }}
        >
            {/* Pull indicator */}
            <div
                className="fixed left-1/2 z-50 flex items-center justify-center pointer-events-none"
                style={{
                    transform: `translateX(-50%) translateY(${Math.min(pullDistance, maxPull) - 60}px)`,
                    opacity: pullDistance > 10 ? Math.min(pullDistance / threshold, 1) : 0,
                    transition: isPulling ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    top: '60px',
                }}
            >
                <div
                    className={`
                        w-12 h-12 rounded-full bg-primary/10 backdrop-blur-lg
                        border border-primary/20 flex items-center justify-center
                        shadow-lg shadow-primary/10
                        ${isRefreshing ? 'animate-pulse' : ''}
                    `}
                    style={{
                        transform: `rotate(${pullDistance * 3}deg)`,
                        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
                    }}
                >
                    <HugeiconsIcon
                        icon={Refresh01Icon}
                        className={`h-5 w-5 text-primary ${isRefreshing ? 'animate-spin' : ''}`}
                    />
                </div>
            </div>

            {/* Content with pull transform */}
            <div
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    transition: isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PullToRefresh;
