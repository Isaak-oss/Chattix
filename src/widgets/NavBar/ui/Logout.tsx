import { useAuthStore } from '@entities/auth'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Box, Button, Divider } from '@mui/material'

export const Logout = () => {
	const logout = useAuthStore(s => s.logout)

	return (
		<Box>
			<Divider sx={{ bgcolor: 'background.semiTransparent', mb: 2 }} />
			<Button
				variant="text"
				fullWidth
				onClick={() => {
					logout()
				}}
				sx={{
					color: 'text.contrastText',
					'&:hover': {
						bgcolor: 'rgba(199,80,80,0.1)',
						color: 'error.main'
					}
				}}
				startIcon={<LoginOutlinedIcon fontSize={'small'} />}
			>
				Log Out
			</Button>
		</Box>
	)
}
