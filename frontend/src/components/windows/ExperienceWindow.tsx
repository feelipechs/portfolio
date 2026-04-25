import { experience } from '../../data/experience';

const academicExperience = experience.filter((e) => e.type === 'education');
const professionalExperience = experience.filter((e) => e.type === 'work');

function ExperienceItem({ exp }: { exp: (typeof experience)[0] }) {
  return (
    <div className='experience-item'>
      <div className='experience-item-header'>
        <span className='experience-item-title'>{exp.title}</span>
        {exp.current && <span className='experience-badge'>[ATUAL]</span>}
      </div>
      <div className='experience-meta'>
        <span className='experience-institution'>{exp.institution}</span>
        <span className='experience-period-divider'>|</span>
        <span className='experience-period'>{exp.period}</span>
      </div>
      <p className='experience-description'>{exp.description}</p>
    </div>
  );
}

export function ExperienceWindow() {
  return (
    <div className='experience-window'>
      <div className='experience-header'>
        <span className='experience-brace'>{'{'}</span>
        <span className='experience-key'>"experiência"</span>
        <span className='experience-colon'>:</span>
        <span className='experience-brace'>[</span>
      </div>

      <div className='experience-section'>
        <div className='experience-section-header'>
          <span className='experience-section-title'>// acadêmico</span>
        </div>
        {academicExperience.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>

      <div className='experience-divider'>
        ─────────────────────────────────────
      </div>

      <div className='experience-section'>
        <div className='experience-section-header'>
          <span className='experience-section-title'>// profissional</span>
        </div>
        {professionalExperience.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>

      <div className='experience-footer'>
        <span className='experience-brace'>]</span>
        <span className='experience-brace'>{'}'}</span>
      </div>
    </div>
  );
}
