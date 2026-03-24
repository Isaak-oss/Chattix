import { createTheme } from '@mui/material'

export let theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1a1a1a',
			light: '#3d3d3d',
			dark: '#0a0a0a',
			contrastText: '#f5f3ef'
		},
		secondary: {
			main: '#c9a87c',
			light: '#d9c4a5',
			dark: '#a68a5b',
			contrastText: '#1a1a1a'
		},
		background: {
			default: '#f5f3ef',
			paper: '#fefefe'
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#6b6b6b'
		},
		divider: 'rgba(26, 26, 26, 0.08)',
		error: {
			main: '#ff0000'
		},
		success: {
			main: '#5a8a6c'
		},
		button: {
			main: '#1a1a1a',
			hover: '#2d2d2d'
		}
	},
	typography: {
		fontFamily: 'Inter, sans-serif',
		secondFontFamily: 'Playfair Display, serif'
	}
})

theme = createTheme(theme, {
	typography: {
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
			fontSize: 32
		},
		h5: {
			fontFamily: theme.typography.secondFontFamily,
			fontWeight: 600,
			fontSize: 28
		},
		h6: {
			fontWeight: 600,
			fontSize: 22
		},
		subtitle1: {
			fontSize: 16,
			color: theme.palette.text.secondary
		},
		subtitle2: {
			fontWeight: 500,
			letterSpacing: '0.01em'
		},
		body1: {
			letterSpacing: '0.01em',
			lineHeight: 1.7
		},
		body2: {
			letterSpacing: '0.01em',
			lineHeight: 1.6
		},
		button: {
			fontWeight: 500,
			letterSpacing: '0.03em',
			textTransform: 'none'
		},
		caption: {
			letterSpacing: '0.02em'
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
	},
	shape: {
		borderRadius: 8
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollBehavior: 'smooth'
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
					borderRadius: 6,
					padding: '12px 24px',
					transition: 'all 0.2s ease',
					fontSize: 15
				},
				contained: {
					backgroundColor: theme.palette.button.main,
					boxShadow: 'none',
					'&:hover': {
						boxShadow: '0 2px 8px rgba(26, 26, 26, 0.15)',
						backgroundColor: theme.palette.button.hover
					}
				},
				outlined: {
					borderWidth: '1.5px',
					'&:hover': {
						borderWidth: '1.5px'
					}
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 1px 3px rgba(26, 26, 26, 0.04)',
					border: '1px solid rgba(26, 26, 26, 0.06)',
					transition: 'all 0.25s ease',
					'&:hover': {
						boxShadow: '0 4px 20px rgba(26, 26, 26, 0.08)'
					}
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none'
				},
				elevation1: {
					boxShadow: '0 1px 3px rgba(26, 26, 26, 0.04)'
				},
				elevation2: {
					boxShadow: '0 2px 8px rgba(26, 26, 26, 0.06)'
				},
				elevation3: {
					boxShadow: '0 4px 20px rgba(26, 26, 26, 0.08)'
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						borderRadius: 8,
						transition: 'all 0.2s ease',
						'& fieldset': {
							borderColor: 'rgba(26, 26, 26, 0.12)',
							transition: 'all 0.2s ease'
						},
						'&:hover fieldset': {
							borderColor: 'rgba(26, 26, 26, 0.25)'
						},
						'&.Mui-focused fieldset': {
							borderColor: '#1a1a1a',
							borderWidth: '1.5px'
						}
					},
					'& .MuiFormHelperText-root': {
						color: theme.palette.error.main,
						fontSize: 14
					}
				}
			}
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					fontWeight: 500
				}
			}
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					fontWeight: 500,
					letterSpacing: '0.02em'
				}
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
					letterSpacing: '0.01em',
					minHeight: 48
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				indicator: {
					height: 2,
					borderRadius: 1
				}
			}
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: 'rgba(26, 26, 26, 0.06)'
				}
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					transition: 'all 0.15s ease'
				}
			}
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					transition: 'all 0.15s ease'
				}
			}
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					borderRight: 'none'
				}
			}
		}
	}
})
