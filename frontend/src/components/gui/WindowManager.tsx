import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import { Window } from './Window';
import type { Project } from '../../data/projects';

const AboutWindow = lazy(() => import('../windows/AboutWindow').then((m) => ({ default: m.AboutWindow })));
const SkillsWindow = lazy(() => import('../windows/SkillsWindow').then((m) => ({ default: m.SkillsWindow })));
const ProjectWindow = lazy(() => import('../windows/ProjectWindow').then((m) => ({ default: m.ProjectWindow })));
const ExperienceWindow = lazy(() => import('../windows/ExperienceWindow').then((m) => ({ default: m.ExperienceWindow })));
const ContactWindow = lazy(() => import('../windows/ContactWindow').then((m) => ({ default: m.ContactWindow })));
const MusicPlayerWindow = lazy(() => import('../windows/MusicPlayerWindow').then((m) => ({ default: m.MusicPlayerWindow })));

function WindowFallback() {
  return (
    <div
      style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: '12px',
        letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.4,
      }}
    >
      carregando...
    </div>
  );
}

export function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <div className='window-manager'>
      <AnimatePresence>
        {windows.map((win) => (
          <Window key={win.id} window={win}>
            <Suspense fallback={<WindowFallback />}>
              {win.type === 'about' && <AboutWindow />}
              {win.type === 'skills' && <SkillsWindow />}
              {win.type === 'project' && (
                <ProjectWindow project={win.data as Project} />
              )}
              {win.type === 'experience' && <ExperienceWindow />}
              {win.type === 'contact' && <ContactWindow />}
              {win.type === 'radio' && <MusicPlayerWindow />}
            </Suspense>
          </Window>
        ))}
      </AnimatePresence>
    </div>
  );
}
