import type { User } from '@entities/user'
import { Box } from '@mui/material'
import { LinksList } from '@widgets/NavBar/ui/LinksList.tsx'

const NavBarMobile = ({ user }: { user: User }) => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				bgcolor: 'primary.main'
			}}
		>
			<LinksList userId={user.id} />
		</Box>
	)
}

export default NavBarMobile
