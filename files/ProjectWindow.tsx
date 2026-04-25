import type { Project } from '../../data/projects'

interface ProjectWindowProps {
  project: Project
}

export function ProjectWindow({ project }: ProjectWindowProps) {
  if (!project) return <div className="project-window">projeto não encontrado</div>

  return (
    <div className="project-window">
      <div className="project-header">
        <span className="project-dir">~/projetos/</span>
        <span className="project-name">{project.name}</span>
        <span className={`project-badge project-badge--${project.status}`}>
          {project.status === 'completed' ? '[CONCLUÍDO]' : '[EM PROGRESSO]'}
        </span>
      </div>

      <div className="project-divider">─────────────────────────────────────</div>

      <div className="project-section">
        <span className="project-label">descrição</span>
        <p className="project-desc">{project.description}</p>
      </div>

      <div className="project-section">
        <span className="project-label">tecnologias</span>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t} className="project-tag">[{t}]</span>
          ))}
        </div>
      </div>

      <div className="project-divider">─────────────────────────────────────</div>

      <div className="project-links">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <span className="project-link-icon">⎇</span> github
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span className="project-link-icon">↗</span> demo ao vivo
          </a>
        )}
        {!project.demo && (
          <span className="project-link project-link--disabled">
            <span className="project-link-icon">✕</span> sem demo
          </span>
        )}
      </div>
    </div>
  )
}
