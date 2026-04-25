import { useState } from 'react';
import { about } from '../../data/about';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function ContactWindow() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', '5d06bba1-c685-4e3a-a0c8-27b9043018ae');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className='contact-window'>
      <div className='contact-links'>
        <a href={`mailto:${about.contacts.email}`} className='contact-link'>
          <span className='contact-link-icon'>📧</span>
          <span>{about.contacts.email}</span>
        </a>
        <a
          href={about.contacts.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className='contact-link'
        >
          <span className='contact-link-icon'>💼</span>
          <span>{about.contacts.linkedin.replace('https://', '')}</span>
        </a>
        <a
          href={about.contacts.github}
          target='_blank'
          rel='noopener noreferrer'
          className='contact-link'
        >
          <span className='contact-link-icon'>🐙</span>
          <span>{about.contacts.github.replace('https://github.com/', '')}</span>
        </a>
      </div>

      <div className='contact-divider'>
        ─────────────────────────────────────
      </div>

      <div className='contact-form-header'>
        <span className='contact-label'>$</span>
        <span className='contact-label-text'> enviar mensagem</span>
      </div>

      {status === 'success' && (
        <div className='contact-feedback contact-feedback--success'>
          ✓ mensagem enviada com sucesso
        </div>
      )}

      {status === 'error' && (
        <div className='contact-feedback contact-feedback--error'>
          ✕ erro ao enviar — tente novamente
        </div>
      )}

      <form className='contact-form' onSubmit={onSubmit}>
        <div className='contact-field'>
          <label className='contact-field-label' htmlFor='contact-name'>
            nome<span className='contact-required'>*</span>
          </label>
          <input
            id='contact-name'
            name='name'
            type='text'
            className='contact-input'
            autoComplete='off'
            spellCheck={false}
            required
            disabled={status === 'sending'}
          />
        </div>

        <div className='contact-field'>
          <label className='contact-field-label' htmlFor='contact-email'>
            email<span className='contact-required'>*</span>
          </label>
          <input
            id='contact-email'
            name='email'
            type='email'
            className='contact-input'
            autoComplete='off'
            required
            disabled={status === 'sending'}
          />
        </div>

        <div className='contact-field'>
          <label className='contact-field-label' htmlFor='contact-message'>
            mensagem<span className='contact-required'>*</span>
          </label>
          <textarea
            id='contact-message'
            name='message'
            rows={4}
            className='contact-input contact-textarea'
            required
            disabled={status === 'sending'}
          />
        </div>

        <div className='contact-actions'>
          <button
            type='reset'
            className='contact-btn contact-btn--ghost'
            disabled={status === 'sending'}
            onClick={() => setStatus('idle')}
          >
            [limpar]
          </button>
          <button
            type='submit'
            className='contact-btn contact-btn--primary'
            disabled={status === 'sending'}
          >
            {status === 'sending' ? '[enviando...]' : '[enviar →]'}
          </button>
        </div>
      </form>
    </div>
  );
}
