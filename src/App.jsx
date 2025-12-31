import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
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
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

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
              <div className="max-w-4xl h-full mx-auto relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border/50"></div>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <Hero />
            <Projects />
            <About />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </PullToRefresh>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blog" element={<><Header /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Header /><Blog /><Footer /></>} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;