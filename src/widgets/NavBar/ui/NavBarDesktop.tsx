import type { User } from '@entities/user'
import { Box, Divider } from '@mui/material'
import { Logo } from '@shared/ui'
import { LinksList } from '@widgets/NavBar/ui/LinksList.tsx'
import { Logout } from '@widgets/NavBar/ui/Logout.tsx'
import { UserCard } from '@widgets/NavBar/ui/UserCard.tsx'

export const NavBarDesktop = ({ user }: { user: User }) => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				bgcolor: 'primary.main',
				width: 260,
				p: 2,
				overflowY: 'auto'
			}}
		>
			<Logo />

			<UserCard user={user} />

			<Divider sx={{ bgcolor: 'background.semiTransparent' }} />

			<LinksList userId={user.id} />

			<Logout />
		</Box>
	)
}
