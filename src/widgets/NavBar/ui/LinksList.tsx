import type { SvgIconComponent } from '@mui/icons-material'
import { Badge, Button, Stack, Typography } from '@mui/material'
import { routes } from '@shared/config'
import type { LinkItem } from '@widgets/NavBar'
import { links } from '@widgets/NavBar/config/links.ts'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

const MessageLinkIcon = ({ Icon }: { Icon: SvgIconComponent }) => {
	return (
		<Badge
			badgeContent={1}
			max={9}
			sx={{
				'& .MuiBadge-badge': {
					bgcolor: '#c9a87c',
					color: '#1a1a1a',
					fontWeight: 600,
					fontSize: 10
				}
			}}
		>
			<Icon fontSize={'small'} />
		</Badge>
	)
}

const Link = memo(({ link }: { link: LinkItem }) => {
	const isMessageLink = routes.messages.path.includes(link.page)

	return (
		<Button
			component={NavLink}
			to={link.page}
			fullWidth
			variant="text"
			sx={{
				flex: { xs: 1, sm: 0 },
				py: { xs: 1, sm: 2 },
				px: { xs: 0, sm: 2 },
				gap: { xs: 0, sm: 1 },
				borderRadius: { xs: 0, sm: 1 },
				flexDirection: { xs: 'column', sm: 'row' },
				justifyContent: { xs: 'center', sm: 'flex-start' },
				bgcolor: 'transparent',
				color: 'text.contrastText',
				'&:hover': {
					bgcolor: 'background.semiTransparent',
					color: 'primary.contrastText'
				},
				'&.active': {
					bgcolor: 'background.activeLink',
					color: 'secondary.main',

					'&:hover': {
						bgcolor: 'background.activeLinkHover',
						color: 'secondary.main'
					}
				}
			}}
			startIcon={isMessageLink ? <MessageLinkIcon Icon={link.icon} /> : <link.icon fontSize={'small'} />}
		>
			<Typography variant="body2">{link.label}</Typography>
		</Button>
	)
})

export const LinksList = ({ userId }: { userId: Id }) => {
	return (
		<Stack
			sx={{
				flex: 1,
				gap: { xs: 0, sm: 1 },
				flexDirection: { xs: 'row', sm: 'column' },
				justifyContent: { xs: 'flex-start', sm: 'flex-start' }
			}}
		>
			{links(userId).map(link => (
				<Link link={link} />
			))}
		</Stack>
	)
}
