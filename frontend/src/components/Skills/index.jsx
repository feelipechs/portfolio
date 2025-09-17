/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import JavaLogo from "../../assets/java";
import NodeLogo from "../../assets/node";
import SpringLogo from "../../assets/spring";
import SqlLogo from "../../assets/sql";
import MysqlLogo from "../../assets/mysql";
import DockerLogo from "../../assets/docker";

import CssLogo from "../../assets/css";
import HtmlLogo from "../../assets/html";
import JavascriptLogo from "../../assets/javascript";
import ReactLogo from "../../assets/react";
import BootstrapLogo from "../../assets/bootstrap";
import TailwindLogo from "../../assets/tailwind";

import FigmaLogo from "../../assets/figma";
import GitLogo from "../../assets/git";
import GithubLogo from "../../assets/github";

const Skills = ({ refProps }) => {
  const [ activeTab, setActiveTab ] = useState("backend");

  const skillsData = {
    backend: [
      { Svg: JavaLogo, label: "Java" },
      { Svg: NodeLogo, label: "Node.js" },
      { Svg: SpringLogo, label: "Spring Framework" },
      { Svg: SqlLogo, label: "SQL" },
      { Svg: MysqlLogo, label: "MySQL" },
      { Svg: DockerLogo, label: "Docker" },
    ],
    frontend: [
      { Svg: CssLogo, label: "CSS" },
      { Svg: HtmlLogo, label: "HTML" },
      { Svg: JavascriptLogo, label: "JavaScript" },
      { Svg: ReactLogo, label: "React" },
      { Svg: BootstrapLogo, label: "Bootstrap" },
      { Svg: TailwindLogo, label: "Tailwind" },
    ],
    ferramentas: [
      { Svg: FigmaLogo, label: "Figma" },
      { Svg: GitLogo, label: "Git" },
      { Svg: GithubLogo, label: "GitHub" },
    ],
  };

  return (
    <>
      <div ref={refProps} className="px-6 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {Object.keys(skillsData).map((tab) => (
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

        {/* Grid de badges */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {skillsData[activeTab].map((skill) => (
              <div
                key={`${activeTab}-${skill.label}`}
                className="flex flex-col items-center justify-center p-4 w-28 sm:w-32 md:w-36 lg:w-40 h-28 rounded-2xl shadow-md bg-gray-800 transition-transform duration-200 hover:scale-[1.1]"
              >
                <skill.Svg className="mb-2 w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-sm sm:text-base font-medium text-center text-white">
                  {skill.label}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Skills;
