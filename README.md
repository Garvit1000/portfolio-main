# Portfolio Website - TweakCN Inspired

A modern, responsive portfolio website for **Garvit Joshi** built with React, Vite, and TailwindCSS. Features a comprehensive theming system inspired by TweakCN with multiple theme variants and seamless dark/light mode switching.

## 🚀 Live Demo

Visit the live portfolio at [https://www.garvit.me/](#)

## ✨ Features

### 🎨 Advanced Theming System
- **8 Unique Themes**: Default, Amber-Minimal, Supabase, Darkmatter, Soft Pop, Candyland, and Twitter
- **Dark/Light Mode**: Automatic system preference detection with manual toggle
- **Dynamic CSS Variables**: Real-time theme switching without page refresh
- **TweakCN Integration**: Complete shadcn/ui component library with custom theme variants

### 📱 Modern Design
- **Fully Responsive**: Mobile-first design with optimized layouts for all devices
- **GPU Accelerated Animations**: Smooth transitions and hover effects
- **Tech-Inspired UI**: Terminal-style elements, monospace fonts, and developer aesthetics
- **Glass Morphism Effects**: Modern backdrop blur and transparency effects

### 🔧 Developer Features
- **GitHub Integration**: Live contribution graph from GitHub API
- **Project Showcase**: Dynamic project cards with live links and technologies
- **Skills Display**: Organized skill categorization with visual indicators

### 🏗️ Technical Stack
- **Frontend**: React 19, Vite, TailwindCSS
- **UI Components**: shadcn/ui (complete component library)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: TailwindCSS Animate
- **Theme Management**: Context API with localStorage persistence

## 📂 Project Structure

```
portfolio-main/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn/ui component library
│   │   ├── Header.jsx      # Navigation header with theme selector
│   │   ├── Hero.jsx        # Main hero section with GitHub integration
│   │   ├── About.jsx       # About section with skills
│   │   ├── Projects.jsx    # Project showcase grid
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Footer.jsx      # Footer with social links
│   │   ├── ThemeProvider.jsx # Theme context provider
│   │   └── ThemeSelector.jsx # Theme switching component
│   ├── data/
│   │   ├── mock.js         # Portfolio data (projects, experience, etc.)
│   │   └── themes.js       # Complete theme definitions
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Main application component
│   └── index.jsx           # Application entry point
├── public/                 # Static assets
├── components.json         # shadcn/ui configuration
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js         # Vite build configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Clone & Install
```bash
# Clone the repository
git clone https://github.com/Garvit1000/portfolio-main.git
cd portfolio-main

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Environment Configuration
Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

**Note**: GitHub token is required for the contribution graph feature. Generate one at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

## 🎨 Theme System

### Available Themes
1. **Default** - Clean and minimal
2. **Amber-Minimal** - Warm amber accents
3. **Supabase** - Green-inspired professional
4. **Darkmatter** - Creative and modern purple
5. **Soft Pop** - Warm and energetic orange
6. **Candyland** - Soft and elegant pastels
7. **Twitter** - Social media inspired with curved elements

### Adding Custom Themes
Add new themes to [`src/data/themes.js`](src/data/themes.js):

```javascript
export const themes = {
  customTheme: {
    name: "Custom Theme",
    description: "Your theme description",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 0%",
      primary: "your-hsl-values",
      // ... other CSS variables
    },
    dark: {
      // Dark mode variants
    }
  }
}
```

## 📊 Features Breakdown

### GitHub Integration
- **Live Contribution Graph**: Fetches real-time data from GitHub API
- **Repository Stats**: Shows total repositories, followers, and following
- **Dynamic Visualization**: Interactive contribution calendar

### Project Showcase
- **Featured Projects**: Highlighted projects with detailed descriptions
- **Technology Stack**: Visual technology badges for each project
- **Live Links**: Direct links to deployed projects and GitHub repositories
- **Responsive Grid**: Adaptive layout for different screen sizes

### Contact System
- **Multiple Contact Methods**: Email, social links
- **Social Integration**: LinkedIn, GitHub, and Twitter links

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices (320px+)
- **Tablet Support**: Enhanced layouts for tablet sizes (768px+)
- **Desktop Optimization**: Full desktop experience (1024px+)
- **Ultra-wide Support**: Support for ultra-wide monitors (1920px+)

## 🎯 Performance Features

- **Code Splitting**: Lazy loading of components
- **Optimized Assets**: Compressed images and fonts
- **Fast Refresh**: Hot module replacement during development
- **Tree Shaking**: Eliminated unused code in production builds

## 🌟 Key Components

### ThemeProvider
Advanced theme management with:
- Context-based state management
- Local storage persistence
- System theme detection
- Smooth theme transitions

### Hero Section
- Terminal-style animations
- Dynamic typing effects
- GitHub contribution visualization
- Responsive social links


## 🔒 Security Features

- **Environment Variables**: Secure API key management
- **Input Validation**: Client-side form validation
- **External Link Safety**: `rel="noopener noreferrer"` on external links

## 📈 Future Enhancements

- [ ] Blog integration with markdown support
- [ ] Advanced animations with Framer Motion
- [ ] Progressive Web App (PWA) features
- [ ] Multi-language support (i18n)
- [ ] Analytics integration
- [ ] SEO optimization with meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - For the comprehensive component library
- **TweakCN** - For theming inspiration and CSS variable system
- **Lucide React** - For beautiful, consistent icons
- **Tailwind CSS** - For utility-first CSS framework
- **Radix UI** - For accessible, unstyled UI primitives

## 📞 Contact

**Garvit Joshi**
- Email: [garvitjoshi543@gmail.com](mailto:garvitjoshi543@gmail.com)
- LinkedIn: [linkedin.com/in/garvit-joshi1](https://linkedin.com/in/garvit-joshi1)
- GitHub: [github.com/Garvit1000](https://github.com/Garvit1000)
- Portfolio: [https://www.garvit.me/](#)

---

Built with ❤️ by [Garvit Joshi](https://github.com/Garvit1000)
