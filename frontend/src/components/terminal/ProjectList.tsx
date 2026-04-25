import { projects } from '../../data/projects';
import { useTerminalStore } from '../../store/terminalStore';

export function ProjectList() {
  const typeCommand = useTerminalStore((s) => s.typeCommand);

  return (
    <div className='project-list'>
      {projects.map((p, i) => {
        const isLast = i === projects.length - 1;
        const prefix = isLast ? '└──' : '├──';
        const status = p.status === 'completed' ? '[✓]' : '[~]';

        return (
          <div key={p.id} className='project-list-item'>
            <button
              className='project-list-btn'
              onClick={() => typeCommand(`cd projetos/${p.id}`)}
            >
              <span className='project-list-prefix'>{prefix}</span>
              <span className='project-list-status'>{status}</span>
              <span className='project-list-name'>{p.name}/</span>
            </button>
            <div className='project-list-tech'>
              {isLast ? '      ' : '│     '}
              {p.tech.join(' · ')}
            </div>
          </div>
        );
      })}
    </div>
  );
}
