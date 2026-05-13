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
    <div className='music-player'>
      <div className='music-player__now-playing'>
        <div className='music-player__label'>tocando agora</div>
        <div className='music-player__track-name'>
          {tracks[currentTrack]?.name ?? '---'}
        </div>
      </div>

      <div className='music-player__controls'>
        <button onClick={prev} className='music-player__btn' title='anterior'>
          ⏮
        </button>
        <button
          onClick={toggle}
          className='music-player__btn music-player__btn--play'
          title={isPlaying ? 'pausar' : 'tocar'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button onClick={next} className='music-player__btn' title='próxima'>
          ⏭
        </button>
      </div>

      <div className='music-player__volume'>
        <span className='music-player__volume-label'>vol</span>
        <input
          type='range'
          min='0'
          max='1'
          step='0.05'
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className='music-player__slider'
        />
        <span className='music-player__volume-value'>{Math.round(volume * 100)}</span>
      </div>

      <div className='music-player__divider' />

      <div className='music-player__playlist'>
        {tracks.map((t, i) => (
          <button
            key={t.file}
            onClick={() => setTrack(i)}
            className={`music-player__track-item${i === currentTrack ? ' music-player__track-item--active' : ''}`}
          >
            {i + 1}. {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
