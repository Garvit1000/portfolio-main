# TweakCN-Style Theme System Implementation

This document outlines the implementation of a dynamic theme switching system inspired by TweakCN for the portfolio project.

## Overview

The theme system allows users to switch between different color themes while maintaining light/dark mode functionality. It's built using CSS variables and React context, providing smooth transitions and persistence.

## Architecture

### Core Components

1. **ThemeProvider** (`src/components/ThemeProvider.jsx`)
   - Manages both theme selection and light/dark mode
   - Handles localStorage persistence
   - Dynamically applies CSS variables
   - Provides smooth transitions

2. **ThemeSelector** (`src/components/ThemeSelector.jsx`)
   - Dropdown component for theme selection
   - Shows theme previews with color indicators
   - Integrates with existing tech/monospace design

3. **Theme Data** (`src/data/themes.js`)
   - Contains 6 predefined themes: Default, Blue, Green, Purple, Orange, Red
   - Each theme includes complete CSS variable definitions
   - Supports both light and dark variants

## Features

### ✅ Implemented Features

- **7 Predefined Themes**: Default, Blue, Green, Purple, Orange, Red, Twitter
- **Dual Mode Support**: Each theme works in both light and dark modes
- **Distinct Visual Personalities**: Each theme has unique fonts, border radius, and shadows
- **Dynamic Styling**: Buttons and components adapt to theme-specific border radius
- **Smooth Transitions**: Hardware-accelerated transitions with no visual flashing
- **Persistence**: Both theme choice and light/dark mode saved to localStorage
- **Responsive Design**: Theme dropdown adapts to different screen sizes
- **Complete CSS Variables**: All TweakCN-style variables including shadows, fonts, charts, sidebar

### Theme Personalities

Each theme now has a distinct visual personality:

- **Default**: Sharp edges (`0rem` radius), JetBrains Mono fonts - Tech/Terminal aesthetic
- **Blue**: Slightly rounded (`0.75rem` radius), Inter fonts - Professional look
- **Green**: Small radius (`0.375rem` radius), Inter fonts - Clean and natural
- **Purple**: Rounded (`1rem` radius), Fira Sans fonts - Creative and modern
- **Orange**: Very rounded (`2rem` radius), Nunito fonts - Warm and friendly
- **Red**: Sharp (`0.25rem` radius), Roboto fonts - Bold and precise
- **Twitter**: Curved (`1.3rem` radius), Open Sans fonts - Social media inspired

### Theme Structure

Each theme includes these CSS variable categories:

```javascript
{
  // Core colors
  background, foreground, card, popover, primary, secondary, muted, accent,
  
  // Interactive elements
  destructive, border, input, ring,
  
  // Data visualization
  "chart-1" through "chart-5",
  
  // Sidebar components
  sidebar, "sidebar-foreground", "sidebar-primary", etc.,
  
  // Typography
  "font-sans", "font-serif", "font-mono",
  
  // Layout
  radius, spacing, "tracking-normal",
  
  // Shadows
  "shadow-2xs" through "shadow-2xl"
}
```

## Usage

### Basic Theme Switching

```jsx
import { useTheme } from './components/ThemeProvider';

function MyComponent() {
  const { currentTheme, changeTheme, theme, toggleTheme } = useTheme();
  
  // Change theme
  changeTheme('blue');
  
  // Toggle light/dark mode
  toggleTheme();
}
```

### Adding New Themes

1. Add theme definition to `src/data/themes.js`:

```javascript
export const themes = {
  // ... existing themes
  
  newTheme: {
    name: "New Theme",
    description: "Description here",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 0%",
      // ... all other CSS variables
    },
    dark: {
      background: "0 0% 0%",
      foreground: "0 0% 100%",
      // ... all other CSS variables
    }
  }
};
```

2. The theme will automatically appear in the dropdown

## Integration Points

### Header Component
- Theme selector integrated next to navigation items
- Positioned before the light/dark mode toggle
- Maintains existing spacing and responsive behavior

### CSS Variables
- All themes override the same CSS variable names
- Seamless integration with Tailwind CSS configuration
- Variables applied to `:root` and `.dark` selectors

## Performance Optimizations

1. **Hardware Acceleration**: Uses `transform: translateZ(0)` for smooth transitions
2. **Batched Updates**: CSS variables applied atomically to prevent flashing
3. **Transition Management**: Temporarily disables transitions during theme switches
4. **Efficient Storage**: Minimal localStorage usage with fallback handling

## Expansion Roadmap

### Phase 2: Full TweakCN Integration (42 Themes)
- Expand to complete TweakCN theme collection
- Add theme categories (Professional, Creative, Nature, etc.)
- Implement theme search/filtering
- Import Google Fonts dynamically based on theme selection

### Phase 3: Advanced Features
- Custom theme creation tools
- Theme import/export functionality
- Real-time theme preview
- Theme sharing system

### Phase 4: Integration Enhancements
- Component-specific theme overrides
- Theme-aware animations
- Advanced color manipulation tools

## Technical Details

### State Management
```javascript
// Theme Provider state structure
{
  theme: 'light' | 'dark',           // Light/dark mode
  currentTheme: 'default' | 'blue' | ..., // Current theme name
  availableThemes: { ... }           // All available themes
}
```

### CSS Variable Application
```javascript
// Dynamic CSS variable injection
const applyThemeVariables = (themeName, mode) => {
  const root = document.documentElement;
  const themeColors = getThemeColors(themeName, mode);
  
  Object.entries(themeColors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};
```

### Persistence Strategy
```javascript
// localStorage keys
localStorage.setItem('theme', 'light|dark');
localStorage.setItem('currentTheme', 'themeName');
```

## Browser Support

- ✅ Modern browsers with CSS custom property support
- ✅ Graceful fallback for unsupported features
- ✅ Respects `prefers-color-scheme` media query
- ✅ Supports `prefers-reduced-motion` accessibility

## File Structure

```
src/
├── components/
│   ├── ThemeProvider.jsx     # Main theme management
│   ├── ThemeSelector.jsx     # Theme selection UI
│   └── Header.jsx           # Integration point
├── data/
│   └── themes.js            # Theme definitions
└── index.css               # Base CSS variables
```

## Testing

### Manual Testing Checklist
- [ ] Theme switching works in both light and dark modes
- [ ] Themes persist across browser refreshes
- [ ] Smooth transitions without visual flashing
- [ ] Responsive behavior on mobile devices
- [ ] Accessibility compliance (reduced motion support)
- [ ] Performance on theme switches

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Contributing

When adding new themes:

1. Follow the existing theme structure exactly
2. Include all required CSS variables
3. Test in both light and dark modes
4. Ensure color contrast accessibility
5. Provide meaningful theme names and descriptions

## Dependencies

- React 19+ (Context API, Hooks)
- Tailwind CSS (CSS variable integration)
- shadcn/ui components (Dropdown menu)
- Lucide React (Icons)
