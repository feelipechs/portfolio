import { FaLocationDot } from "react-icons/fa6";

const About= ({ refProps }) => {
  return (
    <>
      <div ref={refProps} className="text-white text-center max-w-prose mx-auto px-4">
        <p>Desenvolvedor Full Stack focado em aplicar e expandir minhas habilidades. Sou resiliente, paciente e dedicado, sempre comprometido em alcançar os melhores resultados e contribuir para o sucesso das equipes nas quais faço parte. Procuro oportunidades que me permitam crescer como profissional e ampliar meu conhecimento na área.</p>
      </div>

      <div className="text-white flex justify-center items-center mt-5 gap-2">
        <FaLocationDot  /> Guarujá - SP
      </div>
    </>
  );
}

export default About;
