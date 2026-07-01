import type { Components, Theme } from '@mui/material'

export const componentsOverrides: Components<Theme> = {
	MuiCssBaseline: {
		styleOverrides: {
			body: {
				scrollBehavior: 'smooth'
			}
		}
	},
	MuiButton: {
		styleOverrides: {
			root: ({ ownerState, theme }) => ({
				textTransform: 'none',
				fontWeight: 500,
				borderRadius: 8,
				padding: '12px 24px',
				transition: 'all 0.2s ease',
				fontSize: 16,
				gap: 8,
				'& .MuiButton-startIcon': {
					margin: 0
				},
				'& .MuiButton-colorInfo': {
					backgroundColor: theme.palette.success.main,
					color: theme.palette.text.primary
				},
				'& .MuiButton-colorError': {
					backgroundColor: theme.palette.error.main,
					color: theme.palette.text.primary
				},

				// disabled styles override
				...(ownerState.color === 'success' && {
					'&.Mui-disabled': {
						backgroundColor: theme.palette.success.light,
						color: theme.palette.primary.contrastText,
						opacity: 0.7
					}
				}),
				...(ownerState.color === 'error' && {
					'&.Mui-disabled': {
						backgroundColor: theme.palette.error.light,
						color: theme.palette.primary.contrastText
					}
				})
			}),
			contained: ({ theme }) => ({
				boxShadow: 'none',
				'&:hover': {
					boxShadow: `0 2px 8px ${theme.palette.background.lowShadow}`
				}
			}),
			containedPrimary: ({ theme }) => ({
				backgroundColor: theme.palette.button.main,
				'&:hover': {
					backgroundColor: theme.palette.button.hover
				}
			}),
			outlined: ({ theme }) => ({
				borderColor: theme.palette.primary.light,
				color: theme.palette.text.primary,
				borderWidth: '1.5px',
			}),
			text: {
				backgroundColor: 'transparent',
				justifyContent: 'flex-start',
				textAlign: 'left'
			},
			sizeSmall: {
				padding: '6px 24px',
				minHeight: 40
			}
		}
	},
	MuiCard: {
		styleOverrides: {
			root: ({ theme }) => ({
				borderRadius: 12,
				boxShadow: `0 1px 3px ${theme.palette.background.lowShadow}`,
				border: `1px solid ${theme.palette.divider}`,
				transition: 'all 0.25s ease',
				'& .MuiPaper-elevation': {
					'&:hover': {
						boxShadow: `0 4px 20px ${theme.palette.background.lowShadow}`
					}
				}
			})
		}
	},
	MuiPaper: {
		styleOverrides: {
			root: {
				backgroundImage: 'none'
			},
			elevation1: ({ theme }) => ({
				boxShadow: `0 1px 3px ${theme.palette.background.lowShadow}`
			}),
			elevation2: ({ theme }) => ({
				boxShadow: `0 2px 8px ${theme.palette.background.lowShadow}`
			}),
			elevation3: ({ theme }) => ({
				boxShadow: `0 4px 20px ${theme.palette.background.lowShadow}`
			})
		}
	},
	MuiMenuItem: {
		styleOverrides: {
			root: ({ theme }) => ({
				'&.Mui-selected': {
					backgroundColor: theme.palette.divider
				}
			})
		}
	},
	MuiTextField: {
		styleOverrides: {
			root: ({ theme }) => ({
				// Outlined
				'& .MuiInputLabel-root.Mui-focused': { color: theme.palette.text.primary },

				'& .MuiOutlinedInput-root': {
					borderRadius: 8,
					transition: 'all 0.2s ease',
					'& fieldset': {
						borderColor: theme.palette.divider,
						transition: 'all 0.2s ease'
					},
					'&:hover fieldset': {
						borderColor: theme.palette.text.secondary
					},
					'&.Mui-focused fieldset': {
						borderColor: theme.palette.text.primary,
						borderWidth: 1.5
					}
				},

				'& .MuiFormHelperText-root': {
					color: theme.palette.error.main,
					fontSize: 14
				},

				// Filled
				'& .MuiFilledInput-root': {
					padding: '16px 14px',
					borderRadius: 16,
					backgroundColor: theme.palette.action.hover,
					border: 'none',
					outline: 'none',
					'& fieldset': { border: 'none' },
					'&:hover': { backgroundColor: theme.palette.action.selected },
					'&:after': { content: 'none' },
					'&:before': { content: 'none' },
					'&::placeholder': {
						color: theme.palette.text.secondary,
						opacity: 1
					},
					'&.Mui-focused': { backgroundColor: theme.palette.action.selected, color: '#fff' }
				}
			})
		}
	},
	MuiChip: {
		styleOverrides: {
			root: {
				borderRadius: 6,
				fontWeight: 500
			},
			badge: {
				borderRadius: 100
			},
			sizeSmall: {}
		}
	},
	MuiAvatar: {
		styleOverrides: {
			root: ({ theme }) => ({
				background: theme.palette.background.userAvatar
			}),
			circular: ({ theme }) => ({
				color: theme.palette.text.primary,
				width: 44,
				height: 44,
				fontWeight: 500,
				fontSize: 16
			}),
			large: ({ theme }) => ({
				[theme.breakpoints.down('sm')]: {
					width: 88,
					height: 88
				},
				width: 100,
				height: 100,
				fontWeight: 500,
				fontSize: 32,
				border: `4px solid ${theme.palette.background.paper}`,
				boxShadow: `0 2px 12px ${theme.palette.background.lowShadow}`,
				color: theme.palette.text.primary
			}),
			medium: ({ theme }) => ({
				width: 64,
				height: 64,
				fontWeight: 500,
				fontSize: 24,
				color: theme.palette.text.primary
			})
		}
	},
	MuiTab: {
		styleOverrides: {
			root: ({ theme }) => ({
				textTransform: 'none',
				fontWeight: 500,
				letterSpacing: '0.01em',
				minHeight: 48,
				fontSize: 14,
				color: theme.palette.text.secondary,
				paddingTop: 0,
				paddingBottom: 0,

				'& .MuiTabs-indicator': {
					backgroundColor: theme.palette.primary.main,
					height: 2
				},

				'& .Mui-selected': {
					color: theme.palette.text.primary
				}
			})
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
			root: ({ theme }) => ({
				borderColor: theme.palette.divider
			})
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
	},
	MuiContainer: {
		styleOverrides: {
			root: ({ theme }) => ({
				padding: theme.spacing(2),

				[theme.breakpoints.up('sm')]: {
					padding: theme.spacing(3)
				}
			})
		}
	},
	MuiBadge: {
		styleOverrides: {
			root: ({ theme }) => ({
				'& .MuiBadge-badge': {
					backgroundColor: theme.palette.secondary.main,
					color: theme.palette.text.primary,
					fontWeight: 600,
					fontSize: 10
				}
			})
		}
	}
}
