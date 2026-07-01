import type { Theme } from '@mui/material'

export const typographyOverrides = (theme: Theme) => ({
	h1: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 500
	},
	h2: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 500,
		fontSize: 52
	},
	h3: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 500,
		fontSize: 36
	},
	h4: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 500,
		fontSize: 32,
		[theme.breakpoints.down('sm')]: {
			fontSize: 28
		}
	},
	h5: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 600,
		fontSize: 28
	},
	h6: {
		fontFamily: theme.typography.secondFontFamily,
		fontWeight: 600,
		fontSize: 22
	},
	subtitle1: {
		fontSize: 16,
		color: theme.palette.text.secondary
	},
	subtitle2: {
		fontSize: 14,
		fontWeight: 600
	},
	body1: {
		fontSize: 16,
		fontWeight: 500
	},
	body2: {
		fontSize: 14,
		fontWeight: 400
	},
	body3: {
		fontSize: 15,
		fontWeight: 400
	},
	button: {
		fontWeight: 500,
		letterSpacing: '0.03em',
		textTransform: 'none'
	},
	caption: {
		fontSize: 12,
		fontWeight: 400
	},
	overline: {
		letterSpacing: '0.1em',
		fontWeight: 500,
		fontSize: 11
	},
	link: {
		fontWeight: 600,
		fontSize: 13
	}
})
