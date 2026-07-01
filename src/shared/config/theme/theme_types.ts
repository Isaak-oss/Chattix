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
		lowShadow: string
		lightGrey: string
		chatRoom: string
		chatRoomHover: string
		userAvatar: string
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
		body3: true
	}
}

// Update the Avatar variant prop options
declare module '@mui/material/Avatar' {
	interface AvatarPropsVariantOverrides {
		large: true
		medium: true
	}
	interface AvatarClasses {
		large: string
		medium: string
	}
}

// Update the Button variant prop options
declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		success: true
		error: true
	}
	interface ButtonClasses {
		success: string
		error: string
	}
}

// Update the Badge variant prop options
declare module '@mui/material/Badge' {
	interface BadgePropsVariantOverrides {
		onlineStatus: true
	}
	interface BadgeClasses {
		onlineStatus: string
	}
}

// Update the Badge variant prop options
declare module '@mui/material/Chip' {
	interface ChipPropsVariantOverrides {
		badge: true
	}
	interface ChipClasses {
		badge: string
	}
}
