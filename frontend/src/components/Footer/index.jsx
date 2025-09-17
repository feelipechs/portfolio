import { FaFileDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <ul className="mt-12 flex justify-center gap-6 md:gap-8">
            <li>
              <a 
                href="https://www.linkedin.com/in/feelipechs"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-white/75"
                title="linkedin"
              >
                <span className="sr-only">Linkedin</span>
                <IconContext.Provider value={{ color: "white", size: "1.5em", }}>
                  <FaLinkedin />
                </IconContext.Provider>
              </a>
            </li>

            <li>
              <a 
                href="https://www.github.com/feelipechs"
                rel="noreferrer"
                target="_blank"
                className="text-white transition hover:text-white/75"
                title="github"
              >
                <span className="sr-only">GitHub</span>
                <IconContext.Provider value={{ color: "white", size: "1.5em", }}>
                  <FaGithub />
                </IconContext.Provider>
              </a>
            </li>

            <li>
              <a 
                href="/curriculo.pdf"
                download="Curriculo Felipe Chagas.pdf"
                className="text-white transition hover:text-white/75"
                title="baixar currículo"
              >
                <span className="sr-only">Currículo</span>
                <IconContext.Provider value={{ color: "white", size: "1.5em", }}>
                  <FaFileDownload />
                </IconContext.Provider>
              </a>
            </li>
          </ul>
          <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400">
            Desenvolvido por Felipe Chagas, com React e Tailwind
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
