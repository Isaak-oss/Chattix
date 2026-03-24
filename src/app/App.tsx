import Router from '@src/app/routes/Router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import '@shared/styles/index.css'
import { ThemeProvider } from '@app/provider/ThemeProvider.tsx'

function App() {
	const queryClient = new QueryClient()

	return (
		<ThemeProvider>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<Router />
				</QueryClientProvider>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
