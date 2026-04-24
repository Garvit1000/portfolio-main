import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { SoundProvider } from "./components/SoundProvider";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import PullToRefresh from "./components/PullToRefresh";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { SectionSpacer } from "./components/SectionSpacer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Portfolio = () => {
  // Enable butter-smooth scrolling
  useSmoothScroll();

  return (
    <PullToRefresh>
      <div className="min-h-screen bg-background text-foreground gpu-accelerated ultra-wide relative">
        <Header />
        <main className="section-spacing relative">
          {/* Geometric vertical guide lines - stops before footer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="container-xl h-full mx-auto">
              <div className="max-w-6xl h-full mx-auto relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <Hero />
            <SectionSpacer />
            <Projects />
            <SectionSpacer />
            <About />
            <SectionSpacer />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </PullToRefresh>
  );
};

const BlogLayout = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />
      <Blog />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <div className="App">
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/blog" element={<BlogLayout />} />
              <Route path="/blog/:slug" element={<BlogLayout />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;