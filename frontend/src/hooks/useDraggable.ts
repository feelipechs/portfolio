import { useCallback } from 'react'
import { useWindowStore } from '../store/windowStore'

export function useDraggable(windowId: string) {
  const { updateWindowPosition, updateWindowSize, focusWindow } = useWindowStore()

  const onDragStop = useCallback(
    (_e: unknown, d: { x: number; y: number }) => {
      updateWindowPosition(windowId, { x: d.x, y: d.y })
    },
    [windowId, updateWindowPosition]
  )

  const onResizeStop = useCallback(
    (
      _e: unknown,
      _dir: unknown,
      ref: HTMLElement,
      _delta: unknown,
      pos: { x: number; y: number }
    ) => {
      updateWindowSize(windowId, {
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
      })
      updateWindowPosition(windowId, pos)
    },
    [windowId, updateWindowSize, updateWindowPosition]
  )

  const onFocus = useCallback(() => {
    focusWindow(windowId)
  }, [windowId, focusWindow])

  return { onDragStop, onResizeStop, onFocus }
}