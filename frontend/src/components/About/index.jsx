import { FaLocationDot } from "react-icons/fa6";

const About= ({ refProps }) => {
  return (
    <>
      <div ref={refProps} className="text-white text-center max-w-prose mx-auto px-4">
      <p>Olá! Tenho 21 anos, sou Desenvolvedor Full Stack com foco em desenvolver sistemas limpos, escaláveis e resilientes.
      Busco não apenas resolver problemas, mas criar soluções de software funcionais, aplicando as melhores práticas de Engenharia de Software.
      Estou em busca de novas oportunidades que me permitam colaborar com projetos de impacto real e expandir meu domínio na área.
      Nos momentos de pausa, gosto de praticar esportes e jogar, e na maioria das vezes vejo o meu time passar vergonha (vulgo Santástico).</p> 
      </div>

      <div className="text-white flex justify-center items-center mt-5 gap-2">
        <FaLocationDot  /> Guarujá - SP
      </div>
    </>
  );
}

export default About;
