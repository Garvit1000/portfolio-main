import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ColorPickerIcon, CheckmarkCircle01Icon } from '@hugeicons/core-free-icons';
import { useTheme } from './ThemeProvider';
import { getThemeNames } from '../data/themes';

const ThemeSelector = () => {
    const { currentTheme, changeTheme, availableThemes } = useTheme();
    const themeNames = getThemeNames();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown on scroll to prevent positioning issues
    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleThemeChange = (themeName) => {
        changeTheme(themeName);
        setIsOpen(false);
    };

    // Get primary color for preview (using light mode for consistency)
    const getThemePreviewColor = (themeName) => {
        const theme = availableThemes[themeName];
        if (!theme) return 'hsl(0 0% 50%)';

        // Convert the primary color to HSL format for display
        const primaryColor = theme.light.primary;
        return `hsl(${primaryColor})`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                ref={buttonRef}
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 p-0 border border-primary/20 hover:border-primary hover:bg-primary/10 gpu-accelerated transition-all duration-100 rounded-lg"
                aria-label="Select theme"
            >
                <HugeiconsIcon icon={ColorPickerIcon} className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 transition-transform duration-100" />
            </Button>

            {/* Custom Dropdown */}
            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 w-44 bg-background border border-primary/20 rounded-lg shadow-lg z-[999999]"
                >
                    <div className="p-1.5">
                        <div className="text-xs font-mono text-muted-foreground mb-1.5 px-2">
                            $ select --theme
                        </div>
                        {themeNames.map((themeName) => {
                            const theme = availableThemes[themeName];
                            const isSelected = currentTheme === themeName;

                            return (
                                <div
                                    key={themeName}
                                    onClick={() => handleThemeChange(themeName)}
                                    className="flex items-center justify-between p-1.5 hover:bg-primary/10 cursor-pointer font-mono text-sm rounded-md transition-colors"
                                >
                                    <div className="flex items-center space-x-2">
                                        {/* Theme color preview */}
                                        <div
                                            className="w-3 h-3 rounded-sm border border-border flex-shrink-0"
                                            style={{
                                                backgroundColor: getThemePreviewColor(themeName),
                                                boxShadow: isSelected ? `0 0 0 1px ${getThemePreviewColor(themeName)}60` : 'none'
                                            }}
                                        />
                                        <span className="text-foreground capitalize truncate text-xs">
                                            {theme.name}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <HugeiconsIcon icon={CheckmarkCircle01Icon} className="h-3 w-3 text-primary flex-shrink-0" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;