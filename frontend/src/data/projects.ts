export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string | null;
  status: 'completed' | 'in-progress';
  images?: string[];
}

export const projects: Project[] = [
  {
    id: 'educa-surf',
    name: 'Educa Surf',
    description: 'Site institucional pra ONG Educa Surf',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind', 'Typescript'],
    github: 'https://github.com/feelipechs/educa-surf',
    demo: null,
    status: 'in-progress',
    images: ['/images/educasurf.webp'],
  },
  {
    id: 'kotlintv',
    name: 'KotlinTV',
    description:
      'IPTV Player para Android TV desenvolvido em Kotlin com Jetpack Compose TV, arquitetura MVVM + Clean Architecture, suporte a Xtream Codes e playlists M3U, reprodução via Media3/ExoPlayer, cache offline com Room e gerenciamento de estado reativo com StateFlow. Focado em simplicidade e otimização.',
    tech: ['Kotlin', 'Jetpack Compose', 'Media3', 'Room', 'Retrofit', 'Hilt'],
    github: 'https://github.com/feelipechs/iptv-android-tv',
    demo: null,
    status: 'in-progress',
    images: ['/images/kotlintv.webp'],
  },
  {
    id: 'sfsys',
    name: 'SFSys',
    description:
      'O SFSys é uma aplicação de gestão completa e robusta desenvolvida para otimizar e centralizar as operações de ponta a ponta de uma ONG com foco em causas sociais, como a distribuição de alimentos.',
    tech: ['Javascript', 'React', 'Sequelize', 'Tailwind'],
    github: 'https://github.com/feelipechs/sfsys',
    demo: null,
    status: 'completed',
    images: ['/images/sfsys.webp'],
  },
  {
    id: 'techhub',
    name: 'TechHub',
    description:
      'E-commerce desenvolvido com React, Spring e H2 Database, com autenticação de usuários via JWT. O sistema inclui CRUD de produtos, carrinho de compras, painel administrativo para gerenciamento de itens, além de validação de dados em diversas áreas',
    tech: ['H2 Database', 'Java', 'Spring', 'React'],
    github: 'https://github.com/feelipechs/techhub',
    demo: null,
    status: 'completed',
    images: ['/images/techhub.webp'],
  },
];
