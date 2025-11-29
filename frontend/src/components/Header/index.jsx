import { useState } from "react";

const Header = ({ refs, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-black fixed w-full top-0 z-50 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="font-display block text-white text-3xl">
              chagas
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {[
              { label: "Sobre mim", ref: refs.aboutRef },
              { label: "Linha do Tempo", ref: refs.timelineRef },
              { label: "Habilidades", ref: refs.skillsRef },
              { label: "Projetos", ref: refs.projectsRef },
              { label: "Contato", ref: refs.contactRef },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="text-white transition hover:text-white/75"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-sm bg-gray-800 p-2 text-white transition hover:text-white/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 flex flex-col gap-2 px-2 pb-4">
            {[
              { label: "Sobre mim", ref: refs.aboutRef },
              { label: "Timeline", ref: refs.timelineRef },
              { label: "Skills", ref: refs.skillsRef },
              { label: "Projetos", ref: refs.projectsRef },
              { label: "Contato", ref: refs.contactRef },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  scrollToSection(item.ref);
                  setIsOpen(false); // fecha o menu
                }}
                className="text-white text-left transition hover:text-white/75"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
