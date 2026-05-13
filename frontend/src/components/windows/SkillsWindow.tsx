import { useEffect, useState, memo, useMemo } from 'react';
import { skills } from '../../data/skills';

const SkillTag = memo(function SkillTag({ name, delay }: { name: string; delay: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={`skill-tag ${visible ? 'skill-tag--visible' : ''}`}>
      {name}
    </span>
  );
});

export function SkillsWindow() {
  const processedGroups = useMemo(() => {
    let idx = 0;
    return skills.map((group) => ({
      ...group,
      items: group.items.map((skill) => ({
        ...skill,
        delay: idx++ * 60,
      })),
    }));
  }, []);

  return (
    <div className='skills-window'>
      <div className='skills-header'>
        <span className='skills-brace'>{'{'}</span>
        <span className='skills-key'>"skills"</span>
        <span className='skills-colon'>:</span>
        <span className='skills-brace'>[</span>
      </div>

      {processedGroups.map((group) => (
        <div key={group.category} className='skill-group'>
          <div className='skill-group-header'>
            <span className='skill-group-key'>"{group.category}"</span>
            <span className='skills-colon'>: [</span>
          </div>
          <div className='skill-tags'>
            {group.items.map((skill) => (
              <SkillTag key={skill.name} name={skill.name} delay={skill.delay} />
            ))}
          </div>
          <div className='skill-group-close'>]</div>
        </div>
      ))}

      <div className='skills-footer'>
        <span className='skills-brace'>]</span>
        <span className='skills-brace'>{'}'}</span>
      </div>
    </div>
  );
}
