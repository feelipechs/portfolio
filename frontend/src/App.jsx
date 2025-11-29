import React, { useRef } from "react";
import './App.css'
import About from './components/About'
import Header from './components/Header'
import Profile from './components/Profile'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Divider from './components/Divider'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTopButton from "./components/ScrollButton";

function App() {
  const aboutRef = useRef();
  const timelineRef = useRef();
  const skillsRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  const scrollToSection = (ref) => {
    if (!ref.current) return;

    const headerOffset = 80; // altura do header fixo
    const dividerOffset = 20; // ajuste se o Divider ocupa espaço
    const top = ref.current.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({ top: top - headerOffset - dividerOffset, behavior: 'smooth' });
  };

  return (
    <div>
      <Header
        refs={{
          aboutRef,
          timelineRef,
          skillsRef,
          projectsRef,
          contactRef
        }}
        scrollToSection={scrollToSection}
      />
      <div className="bg-[linear-gradient(145deg,rgba(0,0,0,1)_0%,rgba(16,0,44,1)_75%)] pt-16">
        <div className="flex justify-center mt-16">
          <Profile />
        </div>
        <Divider>Sobre Mim</Divider>
        <About refProps={aboutRef} />
        <Divider>Linha do Tempo</Divider>
        <Timeline refProps={timelineRef} />
        <Divider>Habilidades</Divider>
        <Skills refProps={skillsRef} />
        <Divider>Projetos</Divider>
        <Projects refProps={projectsRef} />
        <Divider>Contato</Divider>
        <Contact refProps={contactRef} />
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default App;
