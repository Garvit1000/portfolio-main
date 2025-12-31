import React, { useState, useEffect } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import {
    RepeatIcon,
    Delete02Icon,
    Tick02Icon,
    AlertCircleIcon,
    PlayIcon
} from '@hugeicons/core-free-icons';

// Editor & Highlighting
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css'; // Always dark for editor

/**
 * Professional Live Code Editor
 * 
 * SECURITY NOTE:
 * This component uses a strict Regex-based parser (parseProps) to extract props.
 * It DOES NOT use eval() or new Function().
 * It only allows specific, safe animation properties (initial, animate, transition, etc.)
 */
const LiveCodeEditor = ({
    initialCode,
    title = 'Practice Activity',
    description = '',
    hint = '',
}) => {
    const [code, setCode] = useState(initialCode);
    const [key, setKey] = useState(0);
    const [error, setError] = useState(null);
    const [previewProps, setPreviewProps] = useState(null);

    // Initial parse
    useEffect(() => {
        handleCodeChange(initialCode);
    }, []);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        try {
            setError(null);
            const props = parseProps(newCode);
            if (props) {
                setPreviewProps(props);
            }
        } catch (err) {
            // Suppress errors while typing
        }
    };

    const handleReset = () => {
        setCode(initialCode);
        setKey(prev => prev + 1);
    };

    const handleReplay = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="my-10 w-full rounded-lg border border-border/40 bg-card overflow-hidden shadow-xl font-mono text-sm group ring-1 ring-border/20">

            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border/40">
                <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-medium tracking-wide text-xs uppercase">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                        title="Reset Code"
                    >
                        <HugeiconsIcon icon={Delete02Icon} className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleReplay}
                        className="flex items-center gap-1.5 px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-sm transition-colors shadow-sm"
                    >
                        <HugeiconsIcon icon={PlayIcon} className="w-3 h-3" />
                        <span>Run</span>
                    </button>
                </div>
            </div>

            {/* Main Area: Fixed Height Grid to prevent layout shifts */}
            <div className="grid lg:grid-cols-2 lg:divide-x divide-border/40">

                {/* Editor Column: Fixed Height + Scroll */}
                <div className="relative bg-[#1e1e1e] h-[350px] lg:h-[400px] border-b lg:border-b-0 border-border/40 flex flex-col">
                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <Editor
                            value={code}
                            onValueChange={handleCodeChange}
                            highlight={code => Prism.highlight(code, Prism.languages.jsx, 'jsx')}
                            padding={24}
                            className="font-mono text-[13px] leading-6 min-h-full"
                            textareaClassName="focus:outline-none"
                            style={{
                                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                backgroundColor: '#1e1e1e', // Keep accessible dark theme
                                color: '#d4d4d4',
                            }}
                        />
                    </div>
                </div>

                {/* Preview Column: Fixed Height + Flex Center */}
                <div className="relative h-[350px] lg:h-[400px] bg-background/50 flex flex-col">
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                        {error ? (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 text-red-500 text-[10px] rounded border border-red-500/20 backdrop-blur-md">
                                <HugeiconsIcon icon={AlertCircleIcon} className="w-3 h-3" />
                                <span>Syntax Error</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] rounded border border-emerald-500/20 backdrop-blur-md">
                                <HugeiconsIcon icon={Tick02Icon} className="w-3 h-3" />
                                <span>Live</span>
                            </div>
                        )}
                    </div>

                    {/* Preview Canvas */}
                    <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center p-8">
                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                                backgroundSize: '20px 20px',
                                color: 'var(--foreground)'
                            }}
                        />

                        {/* Animated Element */}
                        <MotionConfig reducedMotion="user">
                            <div className="relative z-0">
                                {previewProps ? (
                                    <motion.div
                                        key={key} // Force re-mount on replay
                                        {...previewProps}
                                        // Default styles if not overridden
                                        className={previewProps.className || "w-32 h-32 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold cursor-pointer"}
                                    >
                                        {previewProps.children}
                                    </motion.div>
                                ) : null}
                            </div>
                        </MotionConfig>
                    </div>
                </div>
            </div>

            {/* Footer / Hint */}
            {hint && (
                <div className="px-4 py-2 bg-muted/30 border-t border-border/40">
                    <p className="text-xs text-muted-foreground font-mono">
                        <span className="text-primary mr-2 font-bold">&gt;</span>
                        {hint}
                    </p>
                </div>
            )}
        </div>
    );
};

// --- Robust Prop Parser (Enhanced for stability) ---

const parseProps = (codeString) => {
    try {
        const props = {};

        // Helper to extract content inside {{ }} or " "
        const extractProp = (key) => {
            // Regex for object props: key={{ ... }}
            const objRegex = new RegExp(`${key}={{\\s*([^}]+)\\s*}}`);
            const objMatch = codeString.match(objRegex);
            if (objMatch) return parseObjectString(objMatch[1]);

            // Regex for string props: key=" ... "
            const strRegex = new RegExp(`${key}="([^"]+)"`);
            const strMatch = codeString.match(strRegex);
            if (strMatch) return strMatch[1];

            // Regex for number/boolean props: key={ ... }
            const valRegex = new RegExp(`${key}={([^}]+)}`);
            const valMatch = codeString.match(valRegex);
            if (valMatch && !isNaN(parseFloat(valMatch[1]))) return parseFloat(valMatch[1]);

            return undefined;
        };

        props.initial = extractProp('initial');
        props.animate = extractProp('animate');
        props.transition = extractProp('transition');
        props.whileHover = extractProp('whileHover');
        props.whileTap = extractProp('whileTap');
        props.exit = extractProp('exit');

        props.className = extractProp('className');

        // Extract children
        const childrenMatch = codeString.match(/>([^<]+)</);
        if (childrenMatch) props.children = childrenMatch[1].trim();

        return props;
    } catch (e) {
        return null;
    }
};

const parseObjectString = (str) => {
    const obj = {};
    const cleanStr = str.replace(/\n/g, ' ').trim();

    // Split by comma, handling potential spaces
    const parts = cleanStr.split(',');

    parts.forEach(part => {
        const [key, val] = part.split(':').map(s => s.trim());
        if (!key || !val) return;

        // Clean value
        let cleanVal = val;
        if (cleanVal.startsWith('"') || cleanVal.startsWith("'")) {
            cleanVal = cleanVal.slice(1, -1);
            obj[key] = cleanVal;
        } else if (!isNaN(parseFloat(cleanVal))) {
            obj[key] = parseFloat(cleanVal);
        } else {
            // Handle simple string values that might be unquoted
            obj[key] = cleanVal;
        }
    });

    return obj;
};

export default LiveCodeEditor;
