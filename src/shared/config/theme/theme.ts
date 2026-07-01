import { createTheme } from '@mui/material'
import { darkPallet } from '@shared/config/theme/colorSchemPalettes/darkPallete.ts'
import { lightPallet } from '@shared/config/theme/colorSchemPalettes/lightPallet.ts'
import { typographyOverrides } from '@shared/config/theme/typographyOverrides.ts'

import { componentsOverrides } from './componentsOverrides.ts'

export let theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1100,
			xl: 1536
		}
	},
	colorSchemes: {
		light: {
			palette: lightPallet
		},
		dark: {
			palette: darkPallet
		}
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
		secondFontFamily: 'Playfair Display, serif'
	}
})

theme = createTheme(theme, {
	components: componentsOverrides,
	typography: typographyOverrides(theme),
	shape: {
		borderRadius: 8
	}
})
