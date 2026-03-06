import { FaLocationDot } from "react-icons/fa6";

const About = ({ refProps }) => {
  return (
    <div ref={refProps} className="flex justify-center px-4 py-4">
      <div
        className="relative max-w-2xl w-full rounded-2xl px-8 py-8 text-white"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* glow de canto decorativo */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(120, 80, 255, 0.15) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <p className="text-gray-200 leading-relaxed text-base text-center">
          Olá! Tenho 21 anos, sou{" "}
          <span
            className="font-semibold"
            style={{ color: "#a78bfa" }}
          >
            Desenvolvedor Full Stack
          </span>{" "}
          com foco em desenvolver sistemas limpos, escaláveis e resilientes.
          Busco não apenas resolver problemas, mas criar soluções de software funcionais,
          aplicando as melhores práticas de Engenharia de Software.
          Estou em busca de novas oportunidades que me permitam colaborar com projetos de
          impacto real e expandir meu domínio na área.
          Nos momentos de pausa, gosto de praticar esportes e jogar, e na maioria das
          vezes estou acompanhando o meu time do coração{" "}
          <span className="italic text-gray-400">(vulgo Santástico)</span>.
        </p>

        {/* linha divisória */}
        <div
          className="my-5 mx-auto"
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        {/* Localização */}
        <div className="flex justify-center items-center gap-2 text-gray-400 text-sm">
          <FaLocationDot style={{ color: "#a78bfa" }} />
          <span>Guarujá — SP</span>
        </div>
      </div>
    </div>
  );
};

export default About;