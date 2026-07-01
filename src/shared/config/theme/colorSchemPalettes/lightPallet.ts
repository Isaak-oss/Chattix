import type { PaletteOptions } from '@mui/material'

export const lightPallet: PaletteOptions = {
	mode: 'light',
	primary: {
		main: '#1a1a1a',
		light: '#3d3d3d',
		dark: '#d6d2cb',
		contrastText: '#f5f3ef'
	},
	secondary: {
		main: '#c9a87c',
		light: '#d9c4a5',
		dark: '#a68a5b'
	},
	background: {
		default: '#f5f3ef',
		paper: '#fefefe',
		semiTransparent: 'rgba(255,255,255,0.05)',
		semiTransparentHover: 'rgba(255,255,255,0.08)',
		activeLink: 'rgba(201,168,124,0.15)',
		activeLinkHover: 'rgba(201,168,124,0.2)',
		lowShadow: 'rgba(26,26,26,0.1)',
		lightGrey: '#dadada',
		chatRoom: 'rgba(204,167,119,0.36)',
		chatRoomHover: 'rgba(204,167,119,0.1)',
		userAvatar: 'linear-gradient(180deg,rgba(217, 196, 165, 1) 27%, rgba(201, 168, 124, 1) 100%)'
	},
	text: {
		primary: '#1a1a1a',
		secondary: '#6b6b6b',
		contrastText: 'rgba(245,243,239,0.7)'
	},
	divider: 'rgba(26, 26, 26, 0.08)',
	error: {
		light: '#d16868',
		main: '#c75050',
		hover: 'rgba(199,80,80,0.1)'
	},
	success: {
		light: '#79b690',
		main: '#5a8a6c'
	},
	button: {
		main: '#1a1a1a',
		hover: '#2d2d2d'
	}
}
