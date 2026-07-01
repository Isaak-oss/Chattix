import '@shared/styles/index.css'

import { queryClient } from '@shared/reactQuery'
import { DataBoundary } from '@shared/ui'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './provider/ThemeProvider.tsx'
import Router from './routes/Router.tsx'

function App() {
	return (
		<DataBoundary>
			<ThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<Router />
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</BrowserRouter>
			</ThemeProvider>
		</DataBoundary>
	)
}

export default App
