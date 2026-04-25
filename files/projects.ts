export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  github: string
  demo: string | null
  status: 'completed' | 'in-progress'
}

export const projects: Project[] = [
  {
    id: 'ecommerce-api',
    name: 'ecommerce-api',
    description: 'API REST completa para e-commerce com autenticação JWT e integração de pagamentos.',
    tech: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Redis', 'Stripe'],
    github: 'https://github.com/placeholder',
    demo: null,
    status: 'completed',
  },
  {
    id: 'dashboard-saas',
    name: 'dashboard-saas',
    description: 'Dashboard analítico com gráficos em tempo real e sistema de permissões por role.',
    tech: ['React', 'TypeScript', 'Recharts', 'Spring Security'],
    github: 'https://github.com/placeholder',
    demo: 'https://demo.placeholder.com',
    status: 'completed',
  },
  {
    id: 'microservice-auth',
    name: 'microservice-auth',
    description: 'Serviço de autenticação distribuído com OAuth2 e refresh token rotation.',
    tech: ['Java 17', 'Spring Security', 'JWT', 'Docker'],
    github: 'https://github.com/placeholder',
    demo: null,
    status: 'in-progress',
  },
]
