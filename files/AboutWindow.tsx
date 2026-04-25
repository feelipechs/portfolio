export function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-header">
        <pre className="about-ascii">{`
  ╔═══════════════════════════════╗
  ║   FELIPE — FULL-STACK DEV    ║
  ╚═══════════════════════════════╝`}</pre>
      </div>

      <div className="about-section">
        <span className="about-key">nome:</span>
        <span className="about-val">Felipe</span>
      </div>
      <div className="about-section">
        <span className="about-key">cargo:</span>
        <span className="about-val">Desenvolvedor Full-Stack</span>
      </div>
      <div className="about-section">
        <span className="about-key">localização:</span>
        <span className="about-val">São Paulo, Brasil</span>
      </div>
      <div className="about-section">
        <span className="about-key">experiência:</span>
        <span className="about-val">+4 anos</span>
      </div>

      <div className="about-divider">─────────────────────────────────</div>

      <div className="about-bio">
        <p>
          Apaixonado por sistemas escaláveis e experiências de usuário refinadas.
          Foco em backend Java/Spring mas confortável em toda a stack.
        </p>
        <p>
          Trabalho com arquitetura de microserviços, design de APIs RESTful e
          interfaces React de alta performance.
        </p>
      </div>

      <div className="about-divider">─────────────────────────────────</div>

      <div className="about-section">
        <span className="about-key">status:</span>
        <span className="about-val about-val--green">● disponível para projetos</span>
      </div>
    </div>
  )
}
