import { useRadioStore } from '../../store/radioStore';

export function MusicPlayerWindow() {
  const {
    isPlaying,
    currentTrack,
    volume,
    tracks,
    toggle,
    next,
    prev,
    setVolume,
    setTrack,
  } = useRadioStore();

  return (
    <div
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '13px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
      }}
    >
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div
          style={{
            color: '#b06ef3',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          tocando agora
        </div>
        <div
          style={{
            color: '#f3f4f6',
            fontSize: '16px',
            letterSpacing: '2px',
          }}
        >
          {tracks[currentTrack]?.name ?? '---'}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <button
          onClick={prev}
          style={btnStyle}
          title='anterior'
        >
          ⏮
        </button>
        <button
          onClick={toggle}
          style={{ ...btnStyle, fontSize: '20px', padding: '6px 18px' }}
          title={isPlaying ? 'pausar' : 'tocar'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={next}
          style={btnStyle}
          title='próxima'
        >
          ⏭
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 8px',
        }}
      >
        <span style={{ color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
          vol
        </span>
        <input
          type='range'
          min='0'
          max='1'
          step='0.05'
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{
            flex: 1,
            accentColor: '#b06ef3',
            height: '4px',
            cursor: 'pointer',
          }}
        />
        <span style={{ color: '#888', fontSize: '11px', minWidth: '28px', textAlign: 'right' }}>
          {Math.round(volume * 100)}
        </span>
      </div>

      <div style={{ borderTop: '1px solid #2e303a', margin: '4px 0' }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          overflow: 'auto',
          flex: 1,
        }}
      >
        {tracks.map((t, i) => (
          <button
            key={t.file}
            onClick={() => setTrack(i)}
            style={{
              background: i === currentTrack ? 'rgba(176, 110, 243, 0.12)' : 'transparent',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 10px',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '13px',
              color: i === currentTrack ? '#b06ef3' : '#9ca3af',
              cursor: 'pointer',
              textAlign: 'left',
              letterSpacing: '1px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => {
              if (i !== currentTrack) e.currentTarget.style.background = 'rgba(176, 110, 243, 0.06)';
            }}
            onMouseLeave={(e) => {
              if (i !== currentTrack) e.currentTarget.style.background = 'transparent';
            }}
          >
            {i + 1}. {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(176, 110, 243, 0.3)',
  borderRadius: '4px',
  color: '#b06ef3',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '4px 12px',
  fontFamily: "'Share Tech Mono', monospace",
  transition: 'all 0.15s',
  lineHeight: 1,
};
