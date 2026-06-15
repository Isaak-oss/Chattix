import { getUnreadMessagesCount } from '@entities/chat'
import type { SvgIconComponent } from '@mui/icons-material'
import { Badge, Button, Stack, Typography } from '@mui/material'
import { UNREAD_MESSAGES_COUNT_QUERY_KEY, routes } from '@shared/config'
import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { links } from '../config/links.ts'
import type { LinkItem } from '../model/types.ts'

const LinkIcon = ({ Icon, badgeContent = 0 }: { Icon: SvgIconComponent; badgeContent?: number }) => {
	return (
		<Badge badgeContent={badgeContent} max={9}>
			<Icon fontSize={'small'} />
		</Badge>
	)
}

const Link = memo(({ link, count }: { link: LinkItem; count?: number }) => {
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
			startIcon={<LinkIcon Icon={link.icon} badgeContent={count || 0} />}
		>
			<Typography variant="body2">{link.label}</Typography>
		</Button>
	)
})

export const LinksList = ({ userId }: { userId: Id }) => {
	const { data: messagesCount } = useQuery({
		queryKey: [UNREAD_MESSAGES_COUNT_QUERY_KEY],
		queryFn: getUnreadMessagesCount
	})

	const handleLinkCount = (link: LinkItem) => {
		switch (link.page) {
			case routes.messages.path:
				return <Link link={link} count={messagesCount?.unreadMessagesCount} key={link.page} />
			default:
				return <Link link={link} key={link.page} />
		}
	}

	return (
		<Stack
			sx={{
				flex: 1,
				gap: { xs: 0, sm: 1 },
				flexDirection: { xs: 'row', sm: 'column' },
				justifyContent: { xs: 'flex-start', sm: 'flex-start' }
			}}
		>
			{links(userId).map(handleLinkCount)}
		</Stack>
	)
}
