import type { PaletteOptions } from '@mui/material'

export const darkPallet: PaletteOptions = {
	mode: 'dark',
	primary: {
		main: '#1a1a1a',
		light: '#ffffff',
		dark: '#0a0a0a',
		contrastText: '#f5f3ef'
	},
	secondary: {
		main: '#c9a87c',
		light: '#d9c4a5',
		dark: '#a68a5b'
	},
	background: {
		default: '#121212',
		paper: '#1b1b1b',
		semiTransparent: 'rgba(255,255,255,0.05)',
		semiTransparentHover: 'rgba(255,255,255,0.08)',
		activeLink: 'rgba(201,168,124,0.18)',
		activeLinkHover: 'rgba(201,168,124,0.28)',
		lowShadow: 'rgba(0,0,0,0.35)',
		lightGrey: '#2a2a2a',
		chatRoom: 'rgba(201,168,124,0.15)',
		chatRoomHover: 'rgba(201,168,124,0.25)',
		userAvatar: 'linear-gradient(180deg, rgba(217,196,165,1) 0%, rgba(201,168,124,1) 100%)'
	},
	text: {
		primary: '#f5f3ef',
		secondary: '#b6b6b6',
		contrastText: 'rgba(245,243,239,0.7)'
	},
	divider: 'rgba(255,255,255,0.08)',
	error: {
		light: '#ef8f8f',
		main: '#e57373',
		hover: 'rgba(229,115,115,0.15)'
	},
	success: {
		light: '#81c995',
		main: '#5fa774'
	},
	button: {
		main: '#c9a87c',
		hover: '#d9c4a5'
	}
}
