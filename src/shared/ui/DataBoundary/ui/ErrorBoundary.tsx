import { ErrorScreen } from '@shared/ui'
import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
	children: ReactNode
	fallback?: ReactNode
}

type State = {
	hasError: boolean
	error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			hasError: false,
			error: null
		}
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return <ErrorScreen />
		}

		return this.props.children
	}
}
