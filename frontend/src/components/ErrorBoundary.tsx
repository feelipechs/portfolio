import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <p>Erro inesperado. Recarregue a página.</p>
          {import.meta.env.DEV && (
            <pre>{this.state.error?.message}</pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
