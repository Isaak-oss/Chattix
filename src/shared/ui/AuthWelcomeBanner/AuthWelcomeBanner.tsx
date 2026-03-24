import { Box, Typography } from '@mui/material'

export const AuthWelcomeBanner = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column',
				justifyContent: 'space-between',
				bgcolor: 'primary.main',
				p: 6,
				position: 'relative',
				overflow: 'hidden'
			}}
		>
			{/* Decorative element */}
			<Box
				sx={{
					position: 'absolute',
					top: -200,
					right: -200,
					width: 500,
					height: 500,
					borderRadius: '50%',
					border: '1px solid rgba(201,168,124,0.1)'
				}}
			/>
			<Box
				sx={{
					position: 'absolute',
					bottom: -100,
					left: -100,
					width: 300,
					height: 300,
					borderRadius: '50%',
					border: '1px solid rgba(201,168,124,0.08)'
				}}
			/>

			{/* Logo */}
			<Box>
				<Typography variant="h5" color="primary.contrastText">
					{'Chattix'}
				</Typography>
			</Box>

			{/* Main content */}
			<Box sx={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
				<Typography variant="overline" color="secondary.main">
					{'Welcome to'}
				</Typography>
				<Typography variant="h2" color="primary.contrastText" mb={3} mt={2}>
					{'Where Ideas'}{' '}
					<Box component="span" sx={{ fontStyle: 'italic' }}>
						{'Connect'}
					</Box>
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{
						maxWidth: 380,
						color: 'rgba(245,243,239,0.6)'
					}}
				>
					{
						'Join a thoughtful community of creators, thinkers, and innovators. Share perspectives, discover inspiration,'
					}
					{'and build meaningful connections.'}
				</Typography>
			</Box>

			{/* Stats */}
			<Box sx={{ display: 'flex', gap: 6 }}>
				{[
					{ num: '2M+', label: 'Members' },
					{ num: '50K+', label: 'Communities' },
					{ num: '10M+', label: 'Conversations' }
				].map(stat => (
					<Box key={stat.label}>
						<Typography variant="h4" color="secondary.main">
							{stat.num}
						</Typography>
						<Typography
							variant="overline"
							sx={{
								color: 'rgba(245,243,239,0.4)'
							}}
						>
							{stat.label}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	)
}
