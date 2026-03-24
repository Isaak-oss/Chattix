import '@mui/material/styles'

declare module '@mui/material/styles' {
	// Pallets
	interface Palette {
		button: Palette['primary']
	}
	interface PaletteOptions {
		button?: PaletteOptions['primary']
	}
	interface PaletteColor {
		hover?: string
	}
	interface SimplePaletteColorOptions {
		hover?: string
	}

	// Typography
	interface TypographyVariants {
		secondFontFamily: string
	}
	interface TypographyVariantsOptions {
		secondFontFamily?: string
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		secondFontFamily: true
		link: true
	}
}
