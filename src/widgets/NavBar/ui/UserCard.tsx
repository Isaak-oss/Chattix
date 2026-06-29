import { type User } from '@entities/user'
import { Box, Stack, Typography } from '@mui/material'
import { routes } from '@shared/config'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { Notifications } from '@widgets/NavBar/ui/Notifications/Notifications.tsx'
import { useNavigate } from 'react-router'

export const UserCard = ({ user }: { user: User }) => {
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				borderRadius: 1,
				bgcolor: 'background.semiTransparent',
				cursor: 'pointer',
				p: 2,
				'&:hover': {
					bgcolor: 'background.semiTransparentHover'
				}
			}}
			onClick={() => {
				navigate(routes.profile.build({ profileId: user.id }))
			}}
		>
			<Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
				<UserAvatar variant="circular" userName={user.username} />
				<Box sx={{ minWidth: 0 }}>
					<Typography variant="subtitle2" color="primary.contrastText">
						{user.fullName}
					</Typography>
					<Typography variant="caption" color="text.contrastText">
						@{user.username}
					</Typography>
				</Box>
				<Notifications />
			</Stack>
		</Box>
	)
}
