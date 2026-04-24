import '@shared/styles/index.css'

import { queryClient } from '@shared/reactQuery'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

import { SessionProvider } from './provider/SessionProvider.tsx'
import { ThemeProvider } from './provider/ThemeProvider.tsx'
import Router from './routes/Router.tsx'

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
						<Router />
					</SessionProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
