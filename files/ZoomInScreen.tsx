import { useEffect } from 'react'

interface ZoomInScreenProps {
  onComplete: () => void
}

export function ZoomInScreen({ onComplete }: ZoomInScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="zoom-wrapper">
      <div className="zoom-monitor">
        <div className="zoom-screen">
          <div className="zoom-scanlines" />
          <div className="zoom-content">
            <span className="zoom-cursor">█</span>
          </div>
        </div>
        <div className="zoom-bezel" />
      </div>
    </div>
  )
}
