import { getUser, useMe } from '@entities/user'
import { useProfileId } from '@features/profile'
import { CalendarTodayOutlined, Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { USER_QUERY_KEY, routes } from '@shared/config'
import { formatDate } from '@shared/lib/formatDate.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export const ProfileCard = () => {
	const { data: me } = useMe()
	const navigate = useNavigate()
	const profileId = useProfileId()
	const isMe = me!.data.id === profileId

	const { data: user } = useSuspenseQuery({
		queryKey: [USER_QUERY_KEY, profileId],
		queryFn: () => getUser(profileId),
		staleTime: 0,
		gcTime: 0
	})

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
						flexDirection: 'row',
						flexWrap: 'wrap',
						gap: 2
					}}
				>
					<Avatar variant="large" sx={{ mt: -5 }}>
						{user.name.charAt(0)}
					</Avatar>
					{isMe && (
						<Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(routes.settings.path)}>
							Edit Profile
						</Button>
					)}
				</Stack>

				{/* Name */}
				<Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
					<Typography variant="h4">{user.name}</Typography>
					<Typography variant="body2" color="text.secondary">
						@{user.name}
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
						gap: 5,
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
