import { FiMail, FiFileText } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { projects } from '../../data/projects';
import { about } from '../../data/about';
import { skills } from '../../data/skills';

export function MobileView() {
  return (
    <div className='mobile-view'>
      <header className='mobile-header'>
        <div className='mobile-logo'>
          <span className='mobile-logo-symbol'>~/</span>
          <span className='mobile-logo-name'>felipe</span>
        </div>
        <div className='mobile-role'>{about.role}</div>
        <div className='mobile-status'>
          <span className='mobile-status-dot' />
          {about.status === 'available' ? 'disponível — open to work' : 'indisponível'}
        </div>
      </header>

      <main className='mobile-main'>
        <section className='mobile-section'>
          <h2 className='mobile-section-title'>/ sobre</h2>
          <p className='mobile-bio'>
            {about.bio[0]} {about.location}. {about.yearsOfExperience} de experiência.
          </p>
        </section>

        <section className='mobile-section'>
          <h2 className='mobile-section-title'>/ projetos</h2>
          <div className='mobile-projects'>
            {projects.map((project) => (
              <article key={project.id} className='mobile-project-card'>
                <div className='mobile-project-header'>
                  <h3 className='mobile-project-name'>{project.name}</h3>
                  <span
                    className={`mobile-project-badge mobile-project-badge--${project.status}`}
                  >
                    {project.status === 'completed' ? 'concluído' : 'em progresso'}
                  </span>
                </div>
                <p className='mobile-project-desc'>{project.description}</p>
                <div className='mobile-project-techs'>
                  {project.tech.map((tech) => (
                    <span key={tech} className='mobile-tech-tag'>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className='mobile-project-links'>
                  <a
                    href={project.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mobile-project-link'
                  >
                    github
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mobile-project-link'
                    >
                      demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='mobile-section'>
          <h2 className='mobile-section-title'>/ skills</h2>
          <div className='mobile-skills'>
            {skills.map((group) => (
              <div key={group.category} className='mobile-skill-group'>
                <span className='mobile-skill-category'>{group.category}</span>
                <div className='mobile-skill-list'>
                  {group.items.map((skill) => (
                    <span key={skill.name} className='mobile-skill-item'>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='mobile-section'>
          <h2 className='mobile-section-title'>/ contato</h2>
          <div className='mobile-contacts'>
            <a href={`mailto:${about.contacts.email}`} className='mobile-contact-link'>
              <span className='mobile-contact-icon'><FiMail size={16} /></span>
              <span>{about.contacts.email}</span>
            </a>
            <a
              href={about.contacts.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='mobile-contact-link'
            >
              <span className='mobile-contact-icon'><FaLinkedin size={16} /></span>
              <span>linkedin</span>
            </a>
            <a
              href={about.contacts.github}
              target='_blank'
              rel='noopener noreferrer'
              className='mobile-contact-link'
            >
              <span className='mobile-contact-icon'><FaGithub size={16} /></span>
              <span>github</span>
            </a>
            <a href={about.contacts.resume} download className='mobile-contact-link'>
              <span className='mobile-contact-icon'><FiFileText size={16} /></span>
              <span>baixar currículo</span>
            </a>
          </div>
        </section>
      </main>

      <footer className='mobile-footer'>
        <p className='mobile-footer-notice'>
          ← melhor experiência no desktop
        </p>
      </footer>
    </div>
  );
}