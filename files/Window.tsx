import { type ReactNode } from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import type { WindowState } from '../../store/terminalStore'
import { useDraggable } from '../../hooks/useDraggable'
import { useTerminalStore } from '../../store/terminalStore'

interface WindowProps {
  window: WindowState
  children: ReactNode
}

export function Window({ window, children }: WindowProps) {
  const { closeWindow, minimizeWindow } = useTerminalStore()
  const { onDragStop, onResizeStop, onFocus } = useDraggable(window.id)

  if (window.isMinimized) return null

  return (
    <Rnd
      default={{
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
      }}
      position={window.position}
      size={window.size}
      onDragStop={onDragStop}
      onResizeStop={onResizeStop}
      onMouseDown={onFocus}
      dragHandleClassName="window-titlebar"
      minWidth={320}
      minHeight={240}
      style={{ zIndex: window.zIndex, position: 'absolute' }}
      bounds="parent"
    >
      <motion.div
        className="window"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ width: '100%', height: '100%' }}
      >
        <div className="window-titlebar">
          <div className="window-controls">
            <button
              className="window-control window-control--close"
              onClick={() => closeWindow(window.id)}
              title="fechar"
            />
            <button
              className="window-control window-control--minimize"
              onClick={() => minimizeWindow(window.id)}
              title="minimizar"
            />
            <button
              className="window-control window-control--expand"
              title="expandir"
            />
          </div>
          <span className="window-title">{window.title}</span>
          <div className="window-title-spacer" />
        </div>
        <div className="window-content">{children}</div>
      </motion.div>
    </Rnd>
  )
}
