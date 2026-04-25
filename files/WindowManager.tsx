import { AnimatePresence } from 'framer-motion'
import { useTerminalStore } from '../../store/terminalStore'
import { Window } from './Window'
import { Taskbar } from './Taskbar'
import { AboutWindow } from '../windows/AboutWindow'
import { SkillsWindow } from '../windows/SkillsWindow'
import { ProjectWindow } from '../windows/ProjectWindow'
import type { Project } from '../../data/projects'

export function WindowManager() {
  const { windows } = useTerminalStore()

  return (
    <div className="window-manager">
      <AnimatePresence>
        {windows.map((win) => (
          <Window key={win.id} window={win}>
            {win.type === 'about' && <AboutWindow />}
            {win.type === 'skills' && <SkillsWindow />}
            {win.type === 'project' && <ProjectWindow project={win.data as Project} />}
          </Window>
        ))}
      </AnimatePresence>
      <Taskbar />
    </div>
  )
}
