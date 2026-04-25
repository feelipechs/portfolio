export interface ExperienceItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  type: 'education' | 'work';
  current: boolean;
  description?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: 'graduacao',
    title: 'Graduação em Engenharia de Software',
    institution: 'Universidade do Oeste Paulista - Unoeste',
    period: '2023 - Cursando',
    type: 'education',
    current: true,
  },
  {
    id: 'ser-tech',
    title: 'Ser+ Tech',
    institution: 'Ada and Núclea Associação',
    period: '2026 - Cursando',
    type: 'education',
    current: true,
  },
  {
    id: 'one',
    title: 'Oracle Next Education',
    institution: 'Alura and Oracle',
    period: '2024 - 2025',
    type: 'education',
    current: false,
  },
  {
    id: 'codifica',
    title: 'Desenvolvedor Full-Stack Jr',
    institution: 'Codifica Edu and +praTi',
    period: '2024 - 2024',
    type: 'education',
    current: false,
  },
  {
    id: 'backend-java',
    title: 'Backend com Java',
    institution: 'DIO and Santander',
    period: '2024 - 2024',
    type: 'education',
    current: false,
  },
  {
    id: 'tecnico-admin',
    title: 'Curso Técnico em Administração',
    institution: 'ETEC Alberto Santos Dumont',
    period: '2021 - 2022',
    type: 'education',
    current: false,
  },
  {
    id: 'dev-fullstack',
    title: 'Desenvolvedor Full Stack',
    institution: 'n/a',
    period: '2024 - Atual',
    type: 'work',
    current: true,
    description:
      'Obtendo experiência com desenvolvimento através de cursos e projetos pessoais.',
  },
];