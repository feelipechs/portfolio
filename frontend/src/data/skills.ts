export interface SkillItem {
  name: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export const skills: SkillGroup[] = [
  {
    category: 'backend',
    items: [{ name: 'Java' }, { name: 'Spring Boot' }, { name: 'NestJS' }, { name: 'API REST' }, { name: 'JWT' }],
  },
  {
    category: 'frontend',
    items: [
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind' },
      { name: 'Bootstrap' },
    ],
  },
  {
    category: 'dados & infra',
    items: [{ name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'Docker' }, { name: 'Podman' }],
  },
  {
    category: 'engenharia',
    items: [{ name: 'SOLID' }, { name: 'Design Patterns' }, { name: 'UML' }, { name: 'Scrum' }],
  },
  {
    category: 'ferramentas',
    items: [{ name: 'Figma' }, { name: 'Git' }, { name: 'Postman' }],
  },
];
