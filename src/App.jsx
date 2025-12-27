import React from 'react';
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
import Blog from './components/Sections/Blog';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

// Composant pour la page d'accueil
const HomePage = () => {
  return (
    <main>
      <Hero />
      <CVDownload />
      <About />
      <Projects />
      <Experience />
      <Clients />
      <Recommendations />
      <Contact />
    </main>
  );
};


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;