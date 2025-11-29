/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = ({ refProps }) => {
  const [ activeTab, setActiveTab ] = useState("backend");

  const projectsData = {
    backend: [
      { 
        img: "/images/project-backend-01.jpg",
        title: "API RESTful - Produtos",
        desc: "Voltado para o gerenciamento de produtos por meio de uma API RESTful, implementando operações CRUD e testes com JUnit e Mockito.",
        repository: "https://github.com/feelipechs/fullstack-maisprati/tree/main/atividades/Atividade16",
      },
      { 
        img: "/images/coming-soon.webp",
        title: "Em desenvolvimento",
        desc: "..."
      },
      { 
        img: "/images/coming-soon.webp",
        title: "Em desenvolvimento",
        desc: "..."
      },
    ],
    frontend: [
      { 
        img: "/images/project-frontend-01.webp",
        title: "MultiApp",
        desc: "Desenvolvido com React, oferece funcionalidades de localização via IP, gerador de QR Code e busca de filmes.",
        site: "https://chaguinhas-multiapp.vercel.app/",
        repository: "https://github.com/feelipechs/fullstack-maisprati/tree/main/atividades/Atividade05/multiapp",
      },
      { 
        img: "/images/coming-soon.webp",
        title: "Em desenvolvimento",
        desc: "..."
      },
      { 
        img: "/images/coming-soon.webp",
        title: "Em desenvolvimento",
        desc: "..."
      },
    ],
    fullstack: [
      { 
        img: "/images/project-fullstack-01.webp",
        title: "TechHub",
        desc: "E-commerce desenvolvido com React, Spring e H2 Database, com autenticação de usuários via JWT. O sistema inclui CRUD de produtos, carrinho de compras, painel administrativo para gerenciamento de itens, além de validação de dados em diversas áreas.",
        repository: "https://github.com/feelipechs/TechHub",
      },
      {
        img: "/images/project-fullstack-02.webp",
        title: "SFSys",
        desc: "O SFSys é uma aplicação de gestão completa e robusta desenvolvida para otimizar e centralizar as operações de ponta a ponta de uma ONG com foco em causas sociais, como a distribuição de alimentos.",
        site: "",
        repository: "https://github.com/feelipechs/SFSys",
      },
      {
        img: "/images/coming-soon.webp",
        title: "Em desenvolvimento",
        desc: "..."
      },
    ],
  };

  return (
    <>
      <div ref={refProps} className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          {Object.keys(projectsData).map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="cursor-pointer font-semibold text-lg flex flex-col items-center w-36" // largura fixa
            >
              <span
                className={`border-b-2 px-1 text-center ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-blue-400"
                }`}
              >
                {tab.toUpperCase()}
              </span>
            </span>
          ))}
        </div>

        {/* Grid de projetos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // container muda quando troca de aba
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr"
          >
            {projectsData[activeTab].map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition flex flex-col"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    alt={project.title}
                    src={project.img}
                    className="absolute inset-0 w-full h-full object-cover transition group-hover:grayscale-[50%]"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-medium text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-3 flex-1">{project.desc}</p>
                  <div className="mt-2 flex justify-between">
                    {/* Condicional para renderizar o link do site */}
                    {project.site && project.site !== "" && (
                      <a href={project.site} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="Site">
                        <FaExternalLinkAlt />
                      </a>
                    )} 
                    {/* Link do repositório */}
                    <a href={project.repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="Repositório">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Projects;
