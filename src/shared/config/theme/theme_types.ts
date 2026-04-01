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
		semiTransparent?: string
	}
	interface SimplePaletteColorOptions {
		hover?: string
		semiTransparent?: string
		semiTransparentHover?: string
	}
	interface TypeBackground {
		semiTransparent: string
		semiTransparentHover: string
		activeLink: string
		activeLinkHover: string
	}
	interface TypeText {
		contrastText: string
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
