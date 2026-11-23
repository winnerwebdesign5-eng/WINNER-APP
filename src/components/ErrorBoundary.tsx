import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-sm border border-[#FF4B4B]/40 bg-[#151515] p-8 text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#FF4B4B] uppercase">
              Something Went Wrong
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold">
              Unable to load this section right now.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A3A3A3]">
              Please refresh the page or return to the homepage.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, errorMessage: '' });
                window.location.href = '/';
              }}
              className="mt-6 inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-sm bg-white px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-[#0A0A0A] uppercase"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
