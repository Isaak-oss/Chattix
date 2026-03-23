import { ThemeProvider } from '@mui/material'
import { theme } from '@shared/config'
import Router from '@src/app/routes/Router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

function App() {
	const queryClient = new QueryClient()

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}

export default App
