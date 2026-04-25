export interface About {
  name: string;
  role: string;
  location: string;
  yearsOfExperience: string;
  status: 'available' | 'unavailable';
  bio: string[];
  contacts: {
    email: string;
    linkedin: string;
    github: string;
    website: string;
  };
}

export const about: About = {
  name: 'Felipe Chagas',
  role: 'Full-Stack Software Developer',
  location: 'Guarujá, São Paulo',
  yearsOfExperience: '+2 anos',
  status: 'available',
  bio: [
    'Olá! Tenho 22 anos, sou Desenvolvedor Full Stack com foco em desenvolver sistemas limpos, escaláveis e resilientes. Busco não apenas resolver problemas, mas criar soluções de software funcionais, aplicando as melhores práticas de Engenharia de Software. Estou em busca de novas oportunidades que me permitam colaborar com projetos de impacto real e expandir meu domínio na área.',
    'Nos momentos de pausa, gosto de praticar esportes e jogar, e na maioria das vezes estou acompanhando o meu time do coração (vulgo Santástico).',
  ],
  contacts: {
    email: 'flpchagas@outlook.com',
    linkedin: 'https://linkedin.com/in/feelipechs',
    github: 'https://github.com/feelipechs',
    website: '',
  },
};
