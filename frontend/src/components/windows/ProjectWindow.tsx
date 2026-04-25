import type { Project } from '../../data/projects';
import { useState } from 'react';

interface ProjectWindowProps {
  project: Project;
}

export function ProjectWindow({ project }: ProjectWindowProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project)
    return <div className='project-window'>projeto não encontrado</div>;

  return (
    <div className='project-window'>
      <div className='project-header'>
        <span className='project-dir'>~/projetos/</span>
        <span className='project-name'>{project.name}</span>
        <span className={`project-badge project-badge--${project.status}`}>
          {project.status === 'completed' ? '[CONCLUÍDO]' : '[EM PROGRESSO]'}
        </span>
      </div>

      <div className='project-divider'>
        ─────────────────────────────────────
      </div>

      {/* IMAGEM */}
      {project.images && project.images.length > 0 && (
        <div className='project-preview'>
          <div className='project-preview-bar'>
            <span className='project-preview-dot' />
            <span className='project-preview-dot' />
            <span className='project-preview-dot' />
            <span className='project-preview-title'>preview.png</span>
          </div>
          <img
            src={project.images?.[0]}
            alt={project.name}
            className='project-preview-img'
            loading='lazy'
            onClick={() => setLightboxOpen(true)}
          />
        </div>
      )}

      <div className='project-section'>
        <span className='project-label'>descrição</span>
        <p className='project-desc'>{project.description}</p>
      </div>

      <div className='project-section'>
        <span className='project-label'>tecnologias</span>
        <div className='project-tech'>
          {project.tech.map((t) => (
            <span key={t} className='project-tag'>
              [{t}]
            </span>
          ))}
        </div>
      </div>

      <div className='project-divider'>
        ─────────────────────────────────────
      </div>

      <div className='project-links'>
        <a
          href={project.github}
          target='_blank'
          rel='noopener noreferrer'
          className='project-link'
        >
          <span className='project-link-icon'>⎇</span> github
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target='_blank'
            rel='noopener noreferrer'
            className='project-link'
          >
            <span className='project-link-icon'>↗</span> demo ao vivo
          </a>
        ) : (
          <span className='project-link project-link--disabled'>
            <span className='project-link-icon'>✕</span> sem demo
          </span>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className='project-lightbox'
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={project.images?.[0]}
            alt={project.name}
            className='project-lightbox-img'
          />
          <span className='project-lightbox-close'>✕ fechar</span>
        </div>
      )}
    </div>
  );
}
