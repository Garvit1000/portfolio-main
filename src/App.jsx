import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SoundProvider } from "./components/SoundProvider";
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

// Lab pages load on demand so the homepage bundle stays small
const Lab = lazy(() => import("./pages/Lab"));
const StampTool = lazy(() => import("./pages/StampTool"));

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
  const { hash } = useLocation();

  // Support links like /#projects coming from other pages. Waits a tick so
  // it runs after ScrollToTop has reset the position.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t);
  }, [hash]);

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

const LabLayout = ({ children }) => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-[60vh]" />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
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
            <Route path="/lab" element={<LabLayout><Lab /></LabLayout>} />
            <Route path="/lab/stamp" element={<LabLayout><StampTool /></LabLayout>} />
            {/* Old links (e.g. the removed /blog) land on the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
        <Analytics />
      </div>
    </SoundProvider>
  );
}

export default App;
