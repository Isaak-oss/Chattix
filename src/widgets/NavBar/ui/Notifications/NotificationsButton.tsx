import { getNotificationsCount } from '@entities/notifications'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { Badge, IconButton } from '@mui/material'
import { NOTIFICATIONS_COUNT_QUERY_KEY } from '@shared/config'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type NotificationsButtonProps = {
	handleToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
	isOpen: boolean
}

export const NotificationsButton = ({ handleToggle, isOpen }: NotificationsButtonProps) => {
	const { data: count } = useQuery({ queryKey: [NOTIFICATIONS_COUNT_QUERY_KEY], queryFn: getNotificationsCount })

	return (
		<IconButton onClick={handleToggle} size={'small'}>
			<Badge badgeContent={count?.unread} max={9}>
				{isOpen ? (
					<NotificationsIcon fontSize="medium" sx={{ color: 'secondary.main' }} />
				) : (
					<NotificationsOutlinedIcon fontSize="medium" sx={{ color: 'secondary.main' }} />
				)}
			</Badge>
		</IconButton>
	)
}
