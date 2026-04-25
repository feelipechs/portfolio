import { about } from '../../data/about';

export function AboutWindow() {
  return (
    <div className='about-window'>
      <div className='about-header'>
        <pre className='about-ascii'>{`
  ╔═══════════════════════════════╗
  ║   FELIPE — FULL-STACK DEV     ║
  ╚═══════════════════════════════╝`}</pre>
      </div>

      <div className='about-section'>
        <span className='about-key'>nome:</span>
        <span className='about-val'>{about.name}</span>
      </div>
      <div className='about-section'>
        <span className='about-key'>função:</span>
        <span className='about-val'>{about.role}</span>
      </div>
      <div className='about-section'>
        <span className='about-key'>localização:</span>
        <span className='about-val'>{about.location}</span>
      </div>
      <div className='about-section'>
        <span className='about-key'>experiência:</span>
        <span className='about-val'>{about.yearsOfExperience}</span>
      </div>

      <div className='about-divider'>─────────────────────────────────</div>

      <div className='about-bio'>
        {about.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className='about-divider'>─────────────────────────────────</div>

      <div className='about-section'>
        <span className='about-key'>status:</span>
        <span className='about-val about-val--green'>
          {about.status === 'available' ? '● disponível - open to work' : '● indisponível'}
        </span>
      </div>
    </div>
  );
}
