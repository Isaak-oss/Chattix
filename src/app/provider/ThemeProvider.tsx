import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { theme } from '@shared/config'
import type { ReactNode } from 'react'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	)
}
