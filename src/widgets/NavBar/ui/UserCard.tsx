import { type User } from '@entities/user'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { routes } from '@shared/config'
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
				<Avatar
					sx={{
						bgcolor: 'secondary.main'
					}}
				>
					<Typography variant="body1" color={'text.primary'}>
						{user.name.charAt(0)}
					</Typography>
				</Avatar>
				<Box sx={{ minWidth: 0 }}>
					<Typography variant="subtitle2" color="primary.contrastText">
						{user.name}
					</Typography>
					<Typography variant="caption" color="text.contrastText">
						@{user.name}
					</Typography>
				</Box>
			</Stack>
		</Box>
	)
}
