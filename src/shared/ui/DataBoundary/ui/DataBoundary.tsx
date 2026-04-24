import { ErrorBoundary, Loader } from '@shared/ui'
import { type ReactNode, Suspense } from 'react'

export const DataBoundary = ({ fallback, children }: { fallback?: ReactNode; children: ReactNode }) => {
	return (
		<ErrorBoundary>
			<Suspense fallback={fallback || <Loader />}>{children}</Suspense>
		</ErrorBoundary>
	)
}
