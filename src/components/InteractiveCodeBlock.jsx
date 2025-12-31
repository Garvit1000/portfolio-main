import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    RepeatIcon,
    CodeIcon,
    ViewIcon
} from '@hugeicons/core-free-icons';

/**
 * Interactive Code Block Component
 * Shows code alongside a live, animated preview
 * Users can replay animations to see them in action
 */
const InteractiveCodeBlock = ({
    code,
    language = 'jsx',
    title = 'Example',
    previewComponent: PreviewComponent,
}) => {
    const [key, setKey] = useState(0);
    const [activeTab, setActiveTab] = useState('preview');

    const replayAnimation = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="mb-8 rounded-xl border border-border overflow-hidden bg-card">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-medium text-foreground">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Tab Switcher */}
                    <div className="flex items-center bg-muted rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${activeTab === 'preview'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <HugeiconsIcon icon={ViewIcon} className="h-3.5 w-3.5" />
                            Preview
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${activeTab === 'code'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <HugeiconsIcon icon={CodeIcon} className="h-3.5 w-3.5" />
                            Code
                        </button>
                    </div>

                    {/* Replay Button */}
                    {activeTab === 'preview' && (
                        <button
                            onClick={replayAnimation}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                        >
                            <HugeiconsIcon icon={RepeatIcon} className="h-3.5 w-3.5" />
                            Replay
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'preview' ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-8 min-h-[200px] flex items-center justify-center bg-gradient-to-br from-background to-muted/30"
                        >
                            {PreviewComponent && <PreviewComponent key={key} />}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="bg-muted/30 px-4 py-2 border-b border-border flex items-center gap-2">
                                <span className="text-xs font-mono text-muted-foreground">
                                    {language}
                                </span>
                            </div>
                            <pre className="p-6 overflow-x-auto max-h-[400px]">
                                <code className="text-sm font-mono text-foreground whitespace-pre">
                                    {code}
                                </code>
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

// Pre-built animation examples for the tutorial
export const AnimationExamples = {
    // Basic Fade In
    FadeIn: () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-mono text-lg"
        >
            Hello, I fade in! 👋
        </motion.div>
    ),

    // Scale Animation
    ScaleUp: () => (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center"
        >
            <span className="text-3xl">🚀</span>
        </motion.div>
    ),

    // Slide In
    SlideIn: () => (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="px-6 py-3 bg-card border border-border rounded-lg font-mono shadow-lg"
        >
            ← I slide in from the left!
        </motion.div>
    ),

    // Button Hover
    ButtonHover: () => (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono font-semibold cursor-pointer shadow-lg shadow-primary/25"
        >
            Hover & Click Me!
        </motion.button>
    ),

    // Rotating Element
    Rotate: () => (
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-primary/40 rounded-xl"
        />
    ),

    // Text Character Animation
    TextReveal: () => {
        const text = "Animate Me!";
        return (
            <div className="flex gap-1 text-3xl font-bold font-mono">
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="text-foreground"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
        );
    },

    // Stagger Children
    StaggerList: () => {
        const items = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];
        return (
            <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 }
                    }
                }}
                className="space-y-3"
            >
                {items.map((item, i) => (
                    <motion.li
                        key={i}
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                        }}
                        className="px-4 py-2 bg-card border border-border rounded-lg font-mono text-sm"
                    >
                        {item}
                    </motion.li>
                ))}
            </motion.ul>
        );
    },

    // Combined Animation
    CombinedAnimation: () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
            }}
            className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl text-center space-y-2"
        >
            <div className="text-4xl">✨</div>
            <div className="font-mono font-semibold text-foreground">Combined Effects!</div>
            <div className="text-sm text-muted-foreground font-mono">scale + fade + slide</div>
        </motion.div>
    ),
};

export default InteractiveCodeBlock;
