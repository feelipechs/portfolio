import React from "react";
import Swal from "sweetalert2";

const Contact = ({ refProps }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "5d06bba1-c685-4e3a-a0c8-27b9043018ae");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "E-mail enviado com sucesso!",
        color: "#9ca3af",
        background: "#1f2937",
        timer: 3500,
        showConfirmButton: false,
      });
      event.target.reset();
    } else {
      console.log("Error", data);
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Erro ao enviar e-mail!",
        color: "#9ca3af",
        background: "#1f2937",
        timer: 3500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div ref={refProps} className="px-4 py-8">
      {/* Cabeçalho */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Envie uma mensagem
        </h2>
        <p className="mt-2 text-lg text-gray-400">me mande um e-mail!</p>
      </div>

      {/* Formulário */}
      <form onSubmit={onSubmit} className="mx-auto mt-12 max-w-xl space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-white">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 block w-full rounded-md bg-white/5 px-3.5 py-2 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
            required
          />
        </div>

        {/* Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-white">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-2 block w-full resize-none rounded-md bg-white/5 px-3.5 py-2 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
            required
          />
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="reset"
            className="rounded border border-transparent px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-300"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
