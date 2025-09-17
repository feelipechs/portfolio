/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Timeline = ({ refProps }) => {
  const [ activeTab, setActiveTab ] = useState("experiencia");

  const experiencia = [
    {
      date: "01/2024 - presente",
      title: "Desenvolvedor Full Stack",
      desc: "Obtendo experiência com desenvolvimento através de cursos e projetos pessoais.",
    },
  ];

  const educacao = [
    {
      date: "04/2023 - presente",
      title: "Graduação em Engenharia de Software",
      desc: "Universidade do Oeste Paulista",
    },
    {
      date: "06/2024 - 01/2025",
      title: "Oracle Next Education",
      desc: "Alura & Oracle",
    },
    {
      date: "04/2024 - 11/2024",
      title: "Desenvolvedor Full Stack Jr",
      desc: "+praTi & Codifica Edu",
    },
    {
      date: "01/2021 - 06/2022",
      title: "Curso Técnico em Administração",
      desc: "Etec Alberto Santos Dumont",
    },
  ];

  const data = activeTab === "experiencia" ? experiencia : educacao;

  return (
    <>
      <div ref={refProps} className="w-full max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-6">
          {["experiencia", "educacao"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="cursor-pointer text-lg font-semibold flex flex-col items-center w-36"
            >
              <span
                className={`border-b-2 px-1 text-center flex items-center justify-center gap-1 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-600 hover:text-blue-500"
                }`}
              >
                {tab === "experiencia" ? "EXPERIÊNCIA" : "EDUCAÇÃO"}
              </span>
            </span>
          ))}
        </div>

        {/* Timeline com animação */}
        <ol className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-700">
          <AnimatePresence mode="wait">
            <motion.ol
              key={activeTab} // troca de aba
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative space-y-8 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-gray-700"
            >
              {data.map((item) => (
                <li
                  key={item.title}
                  className="group relative grid grid-cols-2 odd:-me-3 even:-ms-3"
                >
                  <div className="relative flex items-start gap-4 group-odd:flex-row-reverse group-odd:text-right group-even:order-last">
                    {/* bolinha fixa */}
                    <span className="size-3 shrink-0 rounded-full bg-blue-600" />
                    <div className="-mt-2">
                      <time className="text-xs font-medium text-gray-200">
                        {item.date}
                      </time>
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-200">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div aria-hidden="true"></div>
                </li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </ol>
      </div>
    </>
  );
};

export default Timeline;
