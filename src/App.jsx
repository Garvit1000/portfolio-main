import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SoundProvider } from "./components/SoundProvider";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PullToRefresh from "./components/PullToRefresh";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
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
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </PullToRefresh>
  );
};

function App() {
  return (
    <SoundProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            {/* Old links (e.g. the removed /blog) land on the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </div>
    </SoundProvider>
  );
}

export default App;
