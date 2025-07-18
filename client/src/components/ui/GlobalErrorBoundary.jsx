// src/components/ui/GlobalErrorBoundary.jsx
import React from 'react';
import LoadingScreen from './LoadingScreen';

export default class GlobalErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Global Error:', error, info);
    // Send to error tracking service
  }

  render() {
    return this.state.hasError
      ? <LoadingScreen onRetry={() => window.location.reload()} />
      : this.props.children;
  }
}