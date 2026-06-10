import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import { Box, Typography } from '@mui/material'

export const ChatNotSelected = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: { xs: 'none', sm: 'flex' },
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column'
			}}
		>
			<Box
				sx={{
					width: 72,
					height: 72,
					borderRadius: 2,
					bgcolor: 'divider',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					mb: 2
				}}
			>
				<ModeCommentOutlinedIcon fontSize="small" />
			</Box>
			<Typography mb={0.5}>Your Messages</Typography>
			<Typography variant="body2" sx={{ color: 'text.secondary' }}>
				Select a conversation to start chatting
			</Typography>
		</Box>
	)
}
