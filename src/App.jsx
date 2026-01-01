import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import CVDownload from './components/Sections/CVDownload';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Clients from './components/Sections/Clients';
import Recommendations from './components/Sections/Recommendations';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import WhatsAppButton from './components/UI/WhatsAppButton';

// Composant pour la page d'accueil
const HomePage = () => {
  return (
    <main>
      <Hero />
      <CVDownload />
      <About />
      <Experience />
      <Projects />
      <Clients />
      <Recommendations />
      <Contact />
    </main>
  );
};


function App() {
  useEffect(() => {
    // Scroll to clients section by default on page load
    // Only if there's no hash in the URL (to allow direct navigation to other sections)
    if (!window.location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const clientsSection = document.querySelector('#clients');
        if (clientsSection) {
          clientsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If there's a hash, scroll to that section
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
              <WhatsAppButton />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;