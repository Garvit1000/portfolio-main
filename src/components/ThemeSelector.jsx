import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Palette, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { getThemeNames } from '../data/themes';

const ThemeSelector = () => {
  const { currentTheme, changeTheme, availableThemes } = useTheme();
  const themeNames = getThemeNames();

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 p-0 straight-line border border-primary/20 hover:border-primary hover:bg-primary/10 gpu-accelerated transition-all duration-100"
          aria-label="Select theme"
        >
          <Palette className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 transition-transform duration-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 straight-line border-primary/20 bg-background/95 backdrop-blur"
      >
        <div className="p-2">
          <div className="text-xs font-mono text-muted-foreground mb-2 px-2">
            $ select --theme
          </div>
          {themeNames.map((themeName) => {
            const theme = availableThemes[themeName];
            const isSelected = currentTheme === themeName;
            
            return (
              <DropdownMenuItem
                key={themeName}
                onClick={() => handleThemeChange(themeName)}
                className="flex items-center justify-between p-2 straight-line hover:bg-primary/10 cursor-pointer font-mono text-sm"
              >
                <div className="flex items-center space-x-3">
                  {/* Theme color preview */}
                  <div 
                    className="w-4 h-4 rounded-sm border border-border"
                    style={{ 
                      backgroundColor: getThemePreviewColor(themeName),
                      boxShadow: isSelected ? `0 0 0 2px ${getThemePreviewColor(themeName)}40` : 'none'
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-foreground capitalize">
                      {theme.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {theme.description}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
        <div className="border-t border-primary/20 px-4 py-2">
          <div className="text-xs font-mono text-muted-foreground">
            Theme: <span className="text-primary">{availableThemes[currentTheme]?.name}</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;