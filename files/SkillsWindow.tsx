interface SkillGroup {
  category: string
  skills: { name: string; level: number }[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'backend',
    skills: [
      { name: 'Java 17', level: 95 },
      { name: 'Spring Boot', level: 93 },
      { name: 'Spring Security', level: 88 },
      { name: 'JPA / Hibernate', level: 85 },
    ],
  },
  {
    category: 'frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Next.js', level: 80 },
      { name: 'CSS / Tailwind', level: 85 },
    ],
  },
  {
    category: 'dados & infra',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 70 },
    ],
  },
]

function SkillBar({ name, level }: { name: string; level: number }) {
  const bars = Math.round(level / 5)
  const filled = '█'.repeat(bars)
  const empty = '░'.repeat(20 - bars)

  return (
    <div className="skill-row">
      <span className="skill-name">{name.padEnd(20)}</span>
      <span className="skill-bar">
        <span className="skill-filled">{filled}</span>
        <span className="skill-empty">{empty}</span>
      </span>
      <span className="skill-pct">{level}%</span>
    </div>
  )
}

export function SkillsWindow() {
  return (
    <div className="skills-window">
      <div className="skills-header">
        <span className="skills-brace">{'{'}</span>
        <span className="skills-key">"skills"</span>
        <span className="skills-colon">:</span>
        <span className="skills-brace">[</span>
      </div>

      {SKILL_GROUPS.map((group) => (
        <div key={group.category} className="skill-group">
          <div className="skill-group-header">
            <span className="skill-group-key">"{group.category}"</span>
            <span className="skill-colon">: [</span>
          </div>
          {group.skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
          <div className="skill-group-close">]</div>
        </div>
      ))}

      <div className="skills-footer">
        <span className="skills-brace">]</span>
        <span className="skills-brace">{'}'}</span>
      </div>
    </div>
  )
}
