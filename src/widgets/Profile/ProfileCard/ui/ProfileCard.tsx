import { getUser, useCurrentUser } from '@entities/user'
import { CalendarTodayOutlined, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { USER_QUERY_KEY, routes } from '@shared/config'
import { formatDate, useProfileId } from '@shared/lib'
import { UserAvatar } from '@shared/ui/UserAvatar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const ProfileCard = () => {
	const currentUser = useCurrentUser()
	const navigate = useNavigate()
	const profileId = useProfileId()
	const isMe = currentUser.id === profileId

	const { data: user } = useSuspenseQuery({
		queryKey: [USER_QUERY_KEY, profileId],
		queryFn: () => getUser(profileId),
		staleTime: 0,
		gcTime: 0
	})

	// TODO: add friends action buttons
	return (
		<Card variant="outlined">
			{/* Cover */}
			<Box
				sx={{
					height: { xs: 100, sm: 140 },
					bgcolor: 'primary.main',
					position: 'relative'
				}}
			>
				{/* Decorative accent */}
				<Box
					sx={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 4,
						bgcolor: 'secondary.main'
					}}
				/>
			</Box>

			<CardContent sx={{ pt: 0, px: { xs: 2.5, sm: 4 }, pb: 4 }}>
				{/* Avatar and actions row */}
				<Stack
					sx={{
						alignItems: { xs: 'center', sm: 'flex-end' },
						justifyContent: 'space-between',
						mb: 3,
						flexDirection: { xs: 'column', sm: 'row' },
						flexWrap: 'wrap',
						gap: 2
					}}
				>
					<Box sx={{ mt: -5 }}>
						<UserAvatar userName={user.username} isOnline={user.isOnline} variant="large" badgeSize={20} />
					</Box>
					{isMe && (
						<Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(routes.settings.path)}>
							Edit Profile
						</Button>
					)}
				</Stack>

				{/* Name */}
				<Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
					<Typography variant="h4" sx={{ fontSize: { xs: 28, sm: 34 } }}>
						{user.fullName}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						@{user.username}
					</Typography>
				</Box>

				{/* Bio */}
				<Typography
					variant="body1"
					sx={{
						my: 3,
						textAlign: { xs: 'center', sm: 'left' },
						color: user.bio ? 'text.primary' : 'text.secondary'
					}}
				>
					{user.bio || 'The user was too lazy to leave a biography'}
				</Typography>

				{/* Meta info */}
				<Stack
					sx={{
						alignItems: 'center',
						gap: 1,
						flexDirection: 'row',
						justifyContent: { xs: 'center', sm: 'flex-start' }
					}}
				>
					<CalendarTodayOutlined sx={{ color: 'text.secondary' }} fontSize="small" />
					<Typography variant="body2" sx={{ color: 'text.secondary' }}>
						Joined {formatDate(user.createdAt)}
					</Typography>
				</Stack>

				<Divider sx={{ my: 3 }} />

				{/* Stats */}
				<Box
					sx={{
						display: 'flex',
						gap: { xs: 3, sm: 5 },
						justifyContent: { xs: 'center', sm: 'flex-start' }
					}}
				>
					{[
						{ label: 'Posts', value: user.postsCount },
						{ label: 'Friends', value: user.friendsCount }
					].map(stat => (
						<Box key={stat.label}>
							<Typography variant="h5">{stat.value}</Typography>
							<Typography variant="caption" color="text.secondary">
								{stat.label}
							</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	)
}
