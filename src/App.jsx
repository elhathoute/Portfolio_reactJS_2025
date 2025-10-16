import React from 'react';
import './i18n';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Clients from './components/Sections/Clients';
import Recommendations from './components/Sections/Recommendations';
import Blog from './components/Sections/Blog';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Clients />
          <Recommendations />
          <Blog />
          <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;