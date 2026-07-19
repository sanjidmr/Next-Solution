"use client";

import { Component, type ReactNode } from "react";
import { normalizeError } from "@/lib/error-utils";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error: normalizeError(error) };
  }

  componentDidCatch(error: unknown, info: { componentStack?: string }) {
    console.error("ErrorBoundary caught:", normalizeError(error), info.componentStack);
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    return this.props.children;
  }
}
