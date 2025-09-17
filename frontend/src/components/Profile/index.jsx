import { ReactTyped } from "react-typed";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-4">
        {/* Imagem responsiva, agora à direita */}
        <img
          alt="gif"
          src="/images/luffy.gif"  // Coloque o link do seu GIF aqui
          className="w-32 h-32 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-96 lg:h-96 object-cover rounded"  // Ajuste do tamanho da imagem
        />

        <div className="flex flex-col text-center md:text-left">
          {/* <h1 className="font-medium text-gray-200 text-3xl md:text-5xl">
            Olá, eu sou o {" "}
            <ReactTyped strings={["Felipe Chagas"]} typeSpeed={100} loop />
          </h1>
          <p className="mt-0.5 text-gray-500">
            Desenvolvedor Full Stack
          </p> */}

          <h1 className="font-medium text-gray-200 text-3xl md:text-5xl">
            Olá, eu sou o Felipe Chagas
          </h1>
          <h6 className="text-gray-300 text-2xl">
            {" "}
            <ReactTyped
              strings={["Desenvolvedor", "Engenheiro de Software"]}
              typeSpeed={100}
              loop
              backSpeed={20}
              showCursor={true}
            />
          </h6>
        </div>
      </div>
    </>
  );
};

export default Profile;
