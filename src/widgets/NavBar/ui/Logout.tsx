import { useAuthStore } from '@entities/auth'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import SunnyIcon from '@mui/icons-material/Sunny'
import { Box, Button, Divider, IconButton, Stack, useColorScheme } from '@mui/material'

export const Logout = () => {
	const { mode, setMode } = useColorScheme()
	const logout = useAuthStore(s => s.logout)

	return (
		<Box>
			<Divider sx={{ bgcolor: 'background.semiTransparent', mb: 2 }} />
			<Stack flexDirection={'row'} alignItems={'center'} gap={2}>
				<Button
					variant="text"
					fullWidth
					onClick={() => {
						logout()
					}}
					sx={{
						color: 'text.contrastText',
						flex: 1,
						'&:hover': {
							bgcolor: 'error.hover',
							color: 'error.main'
						}
					}}
					startIcon={<LoginOutlinedIcon fontSize={'small'} />}
				>
					Log Out
				</Button>
				<IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
					{mode === 'dark' ? <SunnyIcon /> : <DarkModeIcon sx={{ color: '#fff' }} />}
				</IconButton>
			</Stack>
		</Box>
	)
}
